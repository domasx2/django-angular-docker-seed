from django.conf.urls import patterns, include, url
from . import views

urlpatterns = patterns('',
    url(r'^tasks/$', views.TaskList.as_view(), name='task-list'),
    url(r'^tasks/(?P<slug>[a-zA-Z\-0-9]+)/?$', views.TaskDetail.as_view(), name='task-detail'),
)