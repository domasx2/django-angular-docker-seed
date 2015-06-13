from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'apps.sampleapp.views.index', name='index'),
    url(r'^api/', include('apps.sampleapp.urls')),
    url(r'^.*', 'apps.sampleapp.views.index') #catch-all
)