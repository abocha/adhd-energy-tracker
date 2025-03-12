# backend/api/tests.py
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from .models import FocusSession, BreakLog
from datetime import timedelta
from django.utils import timezone

class FocusSessionViewSetTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)

    def test_start_focus_session(self):
        url = reverse('focus-session-start') # Assuming basename='focus-session' in urls.py
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(FocusSession.objects.count(), 1)
        session = FocusSession.objects.first()
        self.assertEqual(session.user, self.user)
        self.assertIsNotNone(session.start_time)
        self.assertIsNone(session.end_time)
        self.assertIsNone(session.duration)

    def test_end_focus_session(self):
        session = FocusSession.objects.create(user=self.user)
        url = reverse('focus-session-end', args=[session.id]) # Assuming basename='focus-session' in urls.py
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        session.refresh_from_db()
        self.assertIsNotNone(session.end_time)
        self.assertIsNotNone(session.duration)
        self.assertGreater(session.duration, timedelta(seconds=0))

    def test_log_break_in_focus_session(self):
        session = FocusSession.objects.create(user=self.user)
        url = reverse('focus-session-breaks', args=[session.id]) # Assuming basename='focus-session' in urls.py
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(BreakLog.objects.count(), 1)
        break_log = BreakLog.objects.first()
        self.assertEqual(break_log.focus_session, session)
        session.refresh_from_db()
        self.assertEqual(session.break_count, 1)


class BreakLogViewSetTests(TestCase): # Basic tests for BreakLogViewSet
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.focus_session = FocusSession.objects.create(user=self.user)

    def test_create_break_log(self):
        url = reverse('break-log-list') # Assuming basename='break-log'
        data = {'focus_session': self.focus_session.id}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(BreakLog.objects.count(), 1)
        break_log = BreakLog.objects.first()
        self.assertEqual(break_log.focus_session, self.focus_session)

    def test_get_break_log_list(self):
        BreakLog.objects.create(focus_session=self.focus_session)
        url = reverse('break-log-list') # Assuming basename='break-log'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
