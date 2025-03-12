# backend/api/serializers.py
from rest_framework import serializers
from .models import EnergyLog

class EnergyLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnergyLog
        fields = ['id', 'date', 'energy_level', 'focus_level', 'notes', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        # Set the user to the current authenticated user
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)