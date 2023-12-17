from rest_framework import serializers
from .models import CustomUser, Application, JobListing


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password', 'email', 'role']


class JobListingSerializer(serializers.ModelSerializer):

    class Meta:
        model = JobListing
        fields = ['id', 'title', 'description', 'salary', 'employer', 'location', 'date_posted']


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'applicant', 'job_listing', 'cover_letter', 'date_applied']
