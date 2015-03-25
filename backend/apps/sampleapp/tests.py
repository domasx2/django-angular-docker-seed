from django.test import TestCase
from apps.sampleapp.models import Task

# Create your tests here.
class TasktestCase(TestCase):

    def test_task_is_slugified(self):
        """Slug fileld is flled when task is saved"""
        task = Task()
        task.text = 'this is some nice text'
        task.save()
        self.assertEqual(task.slug, 'this-is-some-nice-text')

    def test_different_slugs_for_same_text(self):
        """Tasks with same text get unique slugs"""
        task1 = Task()
        task1.text = 'sometext'
        task1.save()

        task2 = Task()
        task2.text = 'sometext'
        task2.save()
        self.assertEqual(task1.slug, 'sometext')
        self.assertEqual(task2.slug, 'sometext1')
