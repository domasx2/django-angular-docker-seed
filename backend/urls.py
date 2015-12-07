from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from apps.sampleapp.views import index as index_view

urlpatterns = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', index_view, name='index'),
    url(r'^api/', include('apps.sampleapp.urls')),
    url(r'^.*', index_view) #catch-all
]