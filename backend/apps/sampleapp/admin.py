from django.contrib import admin
from .models import Upload
# Register your models here.
@admin.register(Upload)
class UploadAdmin(admin.ModelAdmin):
    pass