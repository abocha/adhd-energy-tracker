# backend/api/views.py
from django.utils import timezone  # Add this import!
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from django.db.models import Count
from .models import EnergyLog, FocusSession, BreakLog # Import new models
from .serializers import EnergyLogSerializer, FocusSessionSerializer, BreakLogSerializer # Import new serializers

class EnergyLogViewSet(viewsets.ModelViewSet):
    serializer_class = EnergyLogSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return EnergyLog.objects.filter(user=self.request.user)

class FocusSessionViewSet(viewsets.ModelViewSet):
    serializer_class = FocusSessionSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = FocusSession.objects.all() # Adjust queryset for user-specific sessions later if needed

    def get_queryset(self): # Ensure only user's sessions are retrieved
        return FocusSession.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'])
    def start(self, request):
        serializer = self.get_serializer(data={}) # No data needed for start
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def end(self, request, pk=None):
        session = self.get_object()
        if session.end_time: # Prevent double ending
            return Response({"detail": "Focus session already ended."}, status=status.HTTP_400_BAD_REQUEST)
        session.end_time = timezone.now() # Import timezone from django.utils if needed
        session.save()
        serializer = self.get_serializer(session)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def breaks(self, request, pk=None): # pk is session ID
        session = self.get_object()
        break_serializer = BreakLogSerializer(data={'focus_session': session.id}, context={'request': request}) # Pass session ID
        if break_serializer.is_valid():
            break_serializer.save(focus_session=session) # Save with session instance
            session.break_count = session.breaks.count() # Update break_count
            session.save()
            return Response(break_serializer.data, status=status.HTTP_201_CREATED)
        return Response(break_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BreakLogViewSet(viewsets.ModelViewSet): # Basic ViewSet - might not need full CRUD, adjust as needed
    serializer_class = BreakLogSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = BreakLog.objects.all() # Adjust queryset for user-specific breaks later if needed

    def get_queryset(self): # Ensure only user's breaks are retrieved
        return BreakLog.objects.filter(focus_session__user=self.request.user) # Filter breaks by session user

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