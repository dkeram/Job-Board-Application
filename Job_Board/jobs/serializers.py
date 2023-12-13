from rest_framework import serializers
from .models import User, Application, JobListing


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'role']


class JobListingSerializer(serializers.ModelSerializer):

    class Meta:
        model = JobListing
        fields = ['id', 'title', 'description', 'salary', 'location', 'employer', 'date_posted']


class ApplicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Application
        fields = ['id', 'applicant', 'job_listing', 'cover_letter', 'date_applied']

