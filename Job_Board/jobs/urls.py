from django.contrib import admin
from django.urls import path
from jobs import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', views.UserListCreateView.as_view(), name='user-list-create'),
    path('user/<int:pk>/', views.UserRetrieveUpdateDestroyView.as_view(), name='user-detail'),
    path('jobs/', views.JobsListingsListCreateView.as_view(), name='jobs-list-create'),
    path('jobs/<int:pk>/', views.JobListingsRetrieveUpdateDestroyView.as_view(), name='jobs-detail'),
    path('application/', views.ApplicationListCreateView.as_view(), name='application-list-create'),
    path('application/<int:pk>/', views.ApplicationRetrieveUpdateDestroyView.as_view(), name='application-detail'),
]
