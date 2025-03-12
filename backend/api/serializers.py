# backend/api/serializers.py
from rest_framework import serializers
from .models import EnergyLog, FocusSession, BreakLog # Import new models if not already imported

class EnergyLogSerializer(serializers.ModelSerializer): # No leading whitespace
    class Meta:
        model = EnergyLog
        fields = [
            'id', 'date', 'energy_level', 'focus_level', 'notes', 'created_at', 'updated_at', # Existing fields
            'overall_energy', 'mental_clarity', 'physical_restlessness', # New metric fields
            'task_initiation', 'task_completion', 'time_perception',
            'focus_type', 'impulsivity_level', 'procrastination',
            'doomscrolling_overconsumption', 'emotional_regulation',
            'physical_sensory_state', 'energy_shifts_today',
            'start_prompt_type', 'start_prompt_other', 'flow_state', 'movement_breaks_taken'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        # Set the user to the current authenticated user
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class FocusSessionSerializer(serializers.ModelSerializer): # No leading whitespace - aligned with EnergyLogSerializer
    class Meta:
        model = FocusSession
        fields = ['id', 'start_time', 'end_time', 'duration', 'break_count']
        read_only_fields = ['id', 'start_time', 'duration', 'break_count'] # break_count auto-updated in viewset

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class BreakLogSerializer(serializers.ModelSerializer): # No leading whitespace - aligned with other serializers
    class Meta:
        model = BreakLog
        fields = ['id', 'start_time', 'end_time', 'duration', 'focus_session']
        read_only_fields = ['id', 'start_time', 'duration']