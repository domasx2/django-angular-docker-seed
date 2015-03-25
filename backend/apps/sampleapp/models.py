from django.db import models
from django.utils.text import slugify

# Create your models here.

class Task(models.Model):
    text = models.TextField()
    slug =  models.SlugField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slug = slugify(self.text)
            i = 1
            while (Task.objects.filter(slug=slug).exists()):
                slug = '%s%s' % (base_slug, i)
                i += 1
            self.slug = slug
        super(Task, self).save(*args, **kwargs)