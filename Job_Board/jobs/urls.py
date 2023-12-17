from django.urls import path
from . import views
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', views.UserListCreateView.as_view(), name='user-list-create'),
    path('user/<int:pk>/', views.UserRetrieveUpdateDestroyView.as_view(), name='user-detail'),
    path('jobs/', views.JobsListingsListCreateView.as_view(), name='jobs-list-create'),
    path('jobs/<int:pk>/', views.JobListingsRetrieveUpdateDestroyView.as_view(), name='jobs-detail'),
    path('application/', views.ApplicationListCreateView.as_view(), name='application-list-create'),
    path('application/<int:pk>/', views.ApplicationRetrieveUpdateDestroyView.as_view(), name='application-detail'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
]
