from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Users, JobListing, Application
from .serializers import MyApplicationSerializer, UsersSerializer, JobListingSerializer, ApplicationSerializer, EmployerApplicationSerializer


# Create your views here

class UsersListCreateView(generics.ListCreateAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer


class UsersRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Users.objects.all()
    serializer_class = UsersSerializer


class GetUsersDetails(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'id': request.user.id, 'username': request.user.username, 'role': request.user.role})


class JobsListingsListCreateView(generics.ListCreateAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = JobListing.objects.all()
    serializer_class = JobListingSerializer


class JobListingsRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = JobListing.objects.all()
    serializer_class = JobListingSerializer


class MyJobs(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = JobListingSerializer

    def get_queryset(self):
        employer_id = self.kwargs['employer_id']
        employer = Users.objects.get(pk=employer_id)
        return JobListing.objects.filter(employer=employer)


class ApplicationListCreateView(generics.ListCreateAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer


class MyApplicationsSerializer(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MyApplicationSerializer

    def get_queryset(self):
        applicant_id = self.kwargs['applicant_id']
        applicant = Users.objects.get(pk=applicant_id)
        return Application.objects.filter(applicant=applicant)


class ApplicationList(generics.ListCreateAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = EmployerApplicationSerializer

    def get_queryset(self):
        job_id = self.kwargs['job_id']
        job = JobListing.objects.get(pk=job_id)
        return Application.objects.filter(job_listing=job)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
