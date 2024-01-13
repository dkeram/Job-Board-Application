from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Users, JobListing, Application, Message
from .serializers import (MyApplicationSerializer, UsersSerializer, JobListingSerializer, ApplicationSerializer,
                          EmployerApplicationSerializer, MessageSerializer, InboxMessagesSerializer, OutboxMessagesSerializer)


# Create your views here

class UsersListCreateView(generics.ListCreateAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer


class UsersRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Users.objects.all()
    serializer_class = UsersSerializer


class JobsListingsListCreateView(generics.ListCreateAPIView):
    queryset = JobListing.objects.all()
    serializer_class = JobListingSerializer

    def get_queryset(self):
        qs = JobListing.objects.all()
        title = self.request.query_params.get('title')
        if title is not None:
            qs = qs.filter(title__icontains=title)
        return qs


class JobListingsRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = JobListing.objects.all()
    serializer_class = JobListingSerializer


class MyJobs(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = JobListingSerializer

    def get_queryset(self):
        employer_id = self.kwargs['employer_id']
        employer = Users.objects.get(pk=employer_id)
        return JobListing.objects.filter(employer=employer)


class ApplicationListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
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
    permission_classes = [IsAuthenticated]
    serializer_class = EmployerApplicationSerializer

    def get_queryset(self):
        job_id = self.kwargs['job_id']
        job = JobListing.objects.get(pk=job_id)
        return Application.objects.filter(job_listing=job)


class StatusApplication(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer


class Messages(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class MessagesDelete(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class InboxMessages(generics.ListAPIView):
    serializer_class = InboxMessagesSerializer

    def get_queryset(self):
        receiver_id = self.kwargs['receiver_id']
        receiver = Users.objects.get(pk=receiver_id)
        return Message.objects.filter(receiver=receiver)


class OutboxMessages(generics.ListAPIView):
    serializer_class = OutboxMessagesSerializer

    def get_queryset(self):
        sender_id = self.kwargs['sender_id']
        sender = Users.objects.get(pk=sender_id)
        return Message.objects.filter(sender=sender)


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
