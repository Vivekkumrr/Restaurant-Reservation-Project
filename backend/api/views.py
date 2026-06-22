from rest_framework import generics, mixins, viewsets
from rest_framework.permissions import AllowAny, BasePermission, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.contrib.auth import login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator

from .models import Menu, Reservation, Table
from .serializers import (
    LoginSerializer,
    MenuSerializer,
    RegisterSerializer,
    ReservationSerializer,
    TableSerializer,
    UserSerializer,
)


class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in ("GET", "HEAD", "OPTIONS"):
            return True
        user = request.user
        return (
            getattr(user, "is_authenticated", False)
            and (
                getattr(user, "role", None) in {"staff", "admin"}
                or getattr(user, "is_staff", False)
                or getattr(user, "is_superuser", False)
            )
        )


class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    permission_classes = [IsAdminOrReadOnly]


class StaffOnlyDeletePermission(BasePermission):
    def has_permission(self, request, view):
        if getattr(view, "action", None) != "destroy":
            return True

        user = request.user
        if not getattr(user, "is_authenticated", False):
            return False

        return (
            getattr(user, "role", None) in {"staff", "admin"}
            or getattr(user, "is_staff", False)
            or getattr(user, "is_superuser", False)
        )

class StaffOnlyReadAuthenticatedCreate(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if request.method in {"GET", "HEAD", "OPTIONS"}:
            if not getattr(user, "is_authenticated", False):
                return False
            return (
                getattr(user, "role", None) in {"staff", "admin"}
                or getattr(user, "is_staff", False)
                or getattr(user, "is_superuser", False)
            )
        if request.method == "POST":
            return getattr(user, "is_authenticated", False)
        if not getattr(user, "is_authenticated", False):
            return False
        return (
            getattr(user, "role", None) in {"staff", "admin"}
            or getattr(user, "is_staff", False)
            or getattr(user, "is_superuser", False)
        )


class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all().order_by("-created_at")
    serializer_class = ReservationSerializer
    permission_classes = [StaffOnlyDeletePermission, StaffOnlyReadAuthenticatedCreate]

    def get_queryset(self):
        qs = super().get_queryset()
        user_id = self.request.query_params.get("user_id")
        status_value = self.request.query_params.get("status")

        if user_id:
            try:
                qs = qs.filter(user_id=int(user_id))
            except (TypeError, ValueError):
                return qs.none()

        if status_value:
            qs = qs.filter(status=status_value)

        return qs

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ReservationListCreateView(generics.ListCreateAPIView):
    queryset = Reservation.objects.all().order_by("-created_at")
    serializer_class = ReservationSerializer
    permission_classes = [StaffOnlyReadAuthenticatedCreate]

    def get_queryset(self):
        qs = super().get_queryset()
        user_id = self.request.query_params.get("user_id")
        status_value = self.request.query_params.get("status")

        if user_id:
            try:
                qs = qs.filter(user_id=int(user_id))
            except (TypeError, ValueError):
                return qs.none()

        if status_value:
            qs = qs.filter(status=status_value)

        return qs

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MyReservationListView(generics.ListAPIView):
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qs = Reservation.objects.filter(user=self.request.user).order_by("-created_at")
        status_value = self.request.query_params.get("status")
        if status_value:
            qs = qs.filter(status=status_value)
        return qs


class MyReservationCancelView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        reservation = get_object_or_404(Reservation, pk=pk, user=request.user)
        if reservation.status != Reservation.Status.PENDING:
            return Response({"success": False, "message": "Only pending reservations can be cancelled."}, status=400)

        reservation.status = Reservation.Status.CANCELLED
        reservation.save(update_fields=["status"])
        return Response({"success": True, "data": ReservationSerializer(reservation).data})


class RegisterView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):
        return Response(
            {
                "success": True,
                "message": "Register endpoint is working. Send a POST request with name, email, and password to create an account.",
                "data": {"required": ["name", "email", "password"]},
            }
        )

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({"success": False, "message": "Invalid data", "data": serializer.errors}, status=400)

        user = serializer.save()
        return Response(
            {"success": True, "message": "Registration successful", "user": UserSerializer(user).data},
            status=201,
        )


class LoginView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):
        return Response(
            {
                "success": True,
                "message": "Login endpoint is working. Send a POST request with username/email and password to create a session.",
                "data": {"required": ["password"], "optional": ["username", "email"]},
            }
        )

    def post(self, request):
        serializer = LoginSerializer(data=request.data, context={"request": request})
        if not serializer.is_valid():
            return Response(
                {"success": False, "message": "Invalid credentials", "data": serializer.errors},
                status=400,
            )

        user = serializer.validated_data["user"]
        login(request, user)

        return Response(
            {
                "success": True,
                "message": "Login successful",
                "user": UserSerializer(user).data,
            }
        )


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({"success": True, "message": "Logged out"})


class CSRFView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        return Response({"success": True, "message": "CSRF cookie set"})


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(
            {
                "success": True,
                "user": UserSerializer(request.user).data,
            }
        )


class TableViewSet(viewsets.ModelViewSet):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    permission_classes = [StaffOnlyDeletePermission]
