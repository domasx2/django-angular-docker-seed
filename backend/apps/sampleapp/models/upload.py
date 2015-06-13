from django.db import models

class Upload(models.Model):
    upload = models.FileField()

    def __str__(self):
        return self.upload.name