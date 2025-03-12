# backend/api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EnergyLogViewSet, get_stats

router = DefaultRouter()
router.register(r'logs', EnergyLogViewSet, basename='energylog')

urlpatterns = [
    path('', include(router.urls)),
    path('stats/', get_stats, name='get_stats'),
]