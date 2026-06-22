from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CSRFView,
    LoginView,
    LogoutView,
    MeView,
    MenuViewSet,
    MyReservationCancelView,
    MyReservationListView,
    RegisterView,
    ReservationListCreateView,
    ReservationViewSet,
    TableViewSet,
)
router = DefaultRouter()
router.register("menu", MenuViewSet, basename="menu")
router.register("reservations", ReservationViewSet, basename="reservation")
router.register("tables", TableViewSet, basename="table")

urlpatterns = [
    path("", include(router.urls)),
    path("csrf", CSRFView.as_view(), name="csrf"),
    path("login", LoginView.as_view(), name="login"),
    path("logout",LogoutView.as_view(), name="logout"),
    path("register",RegisterView.as_view(), name="register"),
    path("me",MeView.as_view(), name="me"),
    path("reservations-list", ReservationListCreateView.as_view(), name="reservations-list"),
    path("my-reservations", MyReservationListView.as_view(), name="my-reservations"),
    path("my-reservations/<int:pk>/cancel", MyReservationCancelView.as_view(), name="my-reservation-cancel"),
]