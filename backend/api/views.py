# backend/api/views.py
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Count
from .models import EnergyLog
from .serializers import EnergyLogSerializer

class EnergyLogViewSet(viewsets.ModelViewSet):
    serializer_class = EnergyLogSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return EnergyLog.objects.filter(user=self.request.user)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_stats(request):
    user = request.user
    
    # Get overall energy level stats
    energy_stats = EnergyLog.objects.filter(user=user).values('energy_level').annotate(
        count=Count('energy_level')
    ).order_by('-count')
    
    # Get overall focus level stats
    focus_stats = EnergyLog.objects.filter(user=user).values('focus_level').annotate(
        count=Count('focus_level')
    ).order_by('-count')
    
    # Get recent entries
    recent_entries = EnergyLogSerializer(
        EnergyLog.objects.filter(user=user).order_by('-date')[:7],
        many=True
    ).data
    
    # Get most common energy-focus combination
    combinations = EnergyLog.objects.filter(user=user).values(
        'energy_level', 'focus_level'
    ).annotate(
        count=Count('id')
    ).order_by('-count')
    
    most_common_combo = None
    if combinations:
        most_common_combo = combinations[0]
    
    return Response({
        'energy_stats': energy_stats,
        'focus_stats': focus_stats,
        'recent_entries': recent_entries,
        'most_common_combo': most_common_combo,
        'total_entries': EnergyLog.objects.filter(user=user).count()
    })