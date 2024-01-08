from django.urls import path
from . import views
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/', views.UsersListCreateView.as_view(), name='user-list-create'),
    path('user/<int:pk>/', views.UsersRetrieveUpdateDestroyView.as_view(), name='user-detail'),
    path('get-details/', views.GetUsersDetails.as_view(), name='get-user-details'),
    path('jobs/', views.JobsListingsListCreateView.as_view(), name='jobs-list-create'),
    path('jobs/<int:pk>', views.JobListingsRetrieveUpdateDestroyView.as_view(), name='job-delete'),
    path('my_jobs/<int:employer_id>', views.MyJobs.as_view(), name='profile-jobs'),
    path('application/', views.ApplicationListCreateView.as_view(), name='application-list-create'),
    path('view_applications/<int:job_id>', views.ApplicationList.as_view(), name='application-list-view'),
    path('update_applications/<int:pk>', views.StatusApplication.as_view(), name='update-application'),
    path('my_applications/<int:applicant_id>', views.MyApplicationsSerializer.as_view(), name='profile-application'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('message/', views.Messages.as_view(), name='message'),
    path('message/<int:pk>', views.MessagesDelete.as_view(), name='message'),
    path('inbox_messages/<int:receiver_id>', views.InboxMessages.as_view(), name='inbox-messages'),
    path('outbox_messages/<int:sender_id>', views.OutboxMessages.as_view(), name='outbox-messages'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
]
