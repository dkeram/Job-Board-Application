from django.contrib import admin
from django.urls import path
from ..jobs import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', views.UserListCreateView(), name='user-list-create'),
    path('user/<int:pk>/', views.UserRetrieveUpdateDestroyView(), name='user-detail'),
    path('jobs/', views.JobsListingsListCreateView, name='jobs-list-create'),
    path('jobs/<int:pk>/', views.JobListingsRetrieveUpdateDestroyView, name='jobs-detail'),
    path('application/', views.ApplicationListCreateView, name='application-list-create'),
    path('application/<int:pk>/', views.ApplicationRetrieveUpdateDestroyView, name='application-detail'),
]
