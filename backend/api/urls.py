# backend/api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EnergyLogViewSet, get_stats, FocusSessionViewSet, BreakLogViewSet # Import new ViewSets

router = DefaultRouter()
router.register(r'logs', EnergyLogViewSet, basename='energylog')
router.register(r'focus-sessions', FocusSessionViewSet, basename='focus-session') # Register FocusSessionViewSet
router.register(r'break-logs', BreakLogViewSet, basename='break-log') # Register BreakLogViewSet


urlpatterns = [
    path('', include(router.urls)),
    path('stats/', get_stats, name='get_stats'),
]