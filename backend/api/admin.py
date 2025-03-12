# backend/api/admin.py
from django.contrib import admin
from .models import EnergyLog

@admin.register(EnergyLog)
class EnergyLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'energy_level', 'focus_level')
    list_filter = ('energy_level', 'focus_level', 'date')
    search_fields = ('user__username', 'notes')
    date_hierarchy = 'date'