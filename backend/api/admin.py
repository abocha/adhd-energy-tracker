 # backend/api/admin.py
from django.contrib import admin
from .models import EnergyLog

@admin.register(EnergyLog)
class EnergyLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'energy_level', 'focus_level') # Field names as strings
    list_filter = ('energy_level', 'focus_level', 'date') # Field names as strings
    search_fields = ('user__username', 'notes')
    date_hierarchy = 'date' # Field name as string