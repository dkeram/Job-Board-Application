from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Users, JobListing, Application
from .serializers import UsersSerializer, JobListingSerializer, ApplicationSerializer


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
        return Response({'username': request.user.username, 'role': request.user.role})


class JobsListingsListCreateView(generics.ListCreateAPIView):
    
    queryset = JobListing.objects.all()
    serializer_class = JobListingSerializer


class JobListingsRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = JobListing.objects.all()
    serializer_class = JobListingSerializer


class ApplicationListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer


class ApplicationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer


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
