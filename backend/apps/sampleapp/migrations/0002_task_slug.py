# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models, migrations
from django.utils.text import slugify


def slugifyTasks(apps, schema_editor):
    # We can't import the Person model directly as it may be a newer
    # version than this migration expects. We use the historical version.
    Task = apps.get_model("sampleapp", "Task")
    for task in Task.objects.all():
        base_slug = slug = slugify(task.text)
        i = 1
        while (Task.objects.filter(slug=slug).exists()):
            slug = '%s%s' % (base_slug, i)
            i += 1
        task.slug = slug
        task.save()


class Migration(migrations.Migration):

    dependencies = [
        ('sampleapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='slug',
            field=models.SlugField(default='slug'),
            preserve_default=False,
        ),
        migrations.RunPython(slugifyTasks)
    ]
