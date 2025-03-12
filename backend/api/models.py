# backend/api/models.py
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone  # Make sure to include this import

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

    OVERALL_ENERGY_CHOICES = [
        ('🟢 High', '🟢 High (wired, hyper)'),
        ('🟡 Medium', '🟡 Medium (engaged, fine)'),
        ('🔴 Low', '🔴 Low (sluggish, drained)'),
    ]

    MENTAL_CLARITY_CHOICES = [
        ('✨ Sharp', '✨ Sharp (focused, clear)'),
        ('😵 Foggy', '😵 Foggy (zoning out)'),
        ('🤯 Overwhelmed', '🤯 Overwhelmed (too much input)'),
    ]

    PHYSICAL_RESTLESSNESS_CHOICES = [
        ('🏃‍♂️ High', '🏃‍♂️ High (pacing, fidgeting)'),
        ('🛋️ Normal', '🛋️ Normal (balanced)'),
        ('🪫 Low', '🪫 Low (lethargic, still)'),
    ]

    TASK_INITIATION_CHOICES = [
        ('🚀 Easy', '🚀 Easy (jumped in)'),
        ('⏳ Delayed', '⏳ Delayed (hesitated)'),
        ('🛑 Stuck', '🛑 Stuck (couldn’t start)'),
    ]

    TASK_COMPLETION_CHOICES = [
        ('✅ Finished', '✅ Finished'),
        ('🔄 Switched tasks', '🔄 Switched tasks a lot'),
        ('❌ Unfinished', '❌ Left unfinished'),
    ]

    TIME_PERCEPTION_CHOICES = [
        ('⏳ Normal', '⏳ Normal'),
        ('🕳️ Lost track', '🕳️ Lost track'),
        ('⚡ Time sped up', '⚡ Time sped up'),
    ]

    FOCUS_TYPE_CHOICES = [
        ('🎯 Hyperfocused', '🎯 Hyperfocused'),
        ('🔄 Scattered', '🔄 Scattered'),
        ('🛑 No focus', '🛑 No focus'),
    ]

    IMPULSIVITY_LEVEL_CHOICES = [
        ('🚦 Controlled', '🚦 Controlled'),
        ('🌀 Mildly impulsive', '🌀 Mildly impulsive'),
        ('💥 Strong', '💥 Strong (random actions, overspending, etc.)'),
    ]

    PROCRASTINATION_CHOICES = [
        ('🚀 No', '🚀 No'),
        ('🔄 Some', '🔄 Some'),
        ('⏳ Heavy', '⏳ Heavy'),
    ]

    DOOMSCROLLING_CHOICES = [
        ('❌ None', '❌ None'),
        ('📱 Some', '📱 Some (mild distraction)'),
        ('⚠️ A lot', '⚠️ A lot (stuck in loop)'),
    ]

    EMOTIONAL_REGULATION_CHOICES = [
        ('😊 Stable', '😊 Stable'),
        ('🌊 Rollercoaster', '🌊 Rollercoaster'),
        ('🔥 Agitated', '🔥 Agitated'),
    ]

    PHYSICAL_SENSORY_STATE_CHOICES = [
        ('🔊 Overstimulated', '🔊 Overstimulated'),
        ('📉 Understimulated', '📉 Understimulated'),
        ('⚖️ Balanced', '⚖️ Balanced'),
    ]

    ENERGY_SHIFTS_CHOICES = [
        ('↗️ Increased', '↗️ Increased suddenly'),
        ('↘️ Dropped', '↘️ Dropped suddenly'),
        ('🔄 Stable', '🔄 Stable'),
    ]

    START_PROMPT_CHOICES = [
        ('⏰ Scheduled Reminder', '⏰ Scheduled Reminder'),
        ('🔥 Urgency/Pressure', '🔥 Urgency/Pressure'),
        ('🤝 External Accountability', '🤝 External Accountability'),
        ('✨ Sudden Interest/Hyperfocus', '✨ Sudden Interest/Hyperfocus'),
        ('✅ Just Did It', '✅ Just Did It'),
        ('Other', 'Other'), # For custom prompts
    ]


    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='energy_logs')
    date = models.DateField()
    energy_level = models.CharField(max_length=20, choices=ENERGY_CHOICES)
    focus_level = models.CharField(max_length=20, choices=FOCUS_CHOICES)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # New Metrics Fields - Added here:
    overall_energy = models.CharField(max_length=20, choices=OVERALL_ENERGY_CHOICES, null=True, blank=True)
    mental_clarity = models.CharField(max_length=20, choices=MENTAL_CLARITY_CHOICES, null=True, blank=True)
    physical_restlessness = models.CharField(max_length=20, choices=PHYSICAL_RESTLESSNESS_CHOICES, null=True, blank=True)
    task_initiation = models.CharField(max_length=20, choices=TASK_INITIATION_CHOICES, null=True, blank=True)
    task_completion = models.CharField(max_length=20, choices=TASK_COMPLETION_CHOICES, null=True, blank=True)
    time_perception = models.CharField(max_length=20, choices=TIME_PERCEPTION_CHOICES, null=True, blank=True)
    focus_type = models.CharField(max_length=20, choices=FOCUS_TYPE_CHOICES, null=True, blank=True)
    impulsivity_level = models.CharField(max_length=20, choices=IMPULSIVITY_LEVEL_CHOICES, null=True, blank=True)
    procrastination = models.CharField(max_length=20, choices=PROCRASTINATION_CHOICES, null=True, blank=True)
    doomscrolling_overconsumption = models.CharField(max_length=20, choices=DOOMSCROLLING_CHOICES, null=True, blank=True)
    emotional_regulation = models.CharField(max_length=20, choices=EMOTIONAL_REGULATION_CHOICES, null=True, blank=True)
    physical_sensory_state = models.CharField(max_length=20, choices=PHYSICAL_SENSORY_STATE_CHOICES, null=True, blank=True)
    energy_shifts_today = models.CharField(max_length=20, choices=ENERGY_SHIFTS_CHOICES, null=True, blank=True)
    start_prompt_type = models.CharField(max_length=50, choices=START_PROMPT_CHOICES, null=True, blank=True)
    start_prompt_other = models.CharField(max_length=100, blank=True, null=True)
    flow_state = models.BooleanField(default=False)
    movement_breaks_taken = models.BooleanField(default=False)


    class Meta:
        ordering = ['-date']
        unique_together = ['user', 'date']

    def __str__(self):
        return f"{self.user.username} - {self.date} - {self.energy_level}"


class FocusSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='focus_sessions')
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)
    duration = models.DurationField(null=True, blank=True)
    break_count = models.IntegerField(default=0) # Count of breaks taken during session

    def save(self, *args, **kwargs):
        if self.end_time and self.start_time:
            self.duration = self.end_time - self.start_time
        super().save(*args, **kwargs)


class BreakLog(models.Model):
    focus_session = models.ForeignKey(FocusSession, on_delete=models.CASCADE, related_name='breaks')
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)
    duration = models.DurationField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.end_time and self.start_time:
            self.duration = self.end_time - self.start_time
        super().save(*args, **kwargs)

    class Meta:
        # Removed ordering and unique_together to fix migration errors
        pass # Or you can completely remove the Meta class if you don't need it empty