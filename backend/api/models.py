# backend/api/models.py
from django.db import models
from django.contrib.auth.models import User

class EnergyLog(models.Model):
    ENERGY_CHOICES = [
        ('🔥 High', '🔥 High'),
        ('⚖️ Medium', '⚖️ Medium'),
        ('🪫 Low', '🪫 Low'),
    ]
    
    FOCUS_CHOICES = [
        ('🎯 Focused', '🎯 Focused'),
        ('🔄 Scattered', '🔄 Scattered'),
        ('🛑 Unfocused', '🛑 Unfocused'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='energy_logs')
    date = models.DateField()
    energy_level = models.CharField(max_length=20, choices=ENERGY_CHOICES)
    focus_level = models.CharField(max_length=20, choices=FOCUS_CHOICES)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-date']
        unique_together = ['user', 'date']
    
    def __str__(self):
        return f"{self.user.username} - {self.date} - {self.energy_level}"