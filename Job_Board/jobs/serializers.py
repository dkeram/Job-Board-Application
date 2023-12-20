from rest_framework import serializers
from .models import Users, Application, JobListing, Status, Message


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'username', 'password', 'email', 'role']

    def create(self, validated_data):
        return Users.objects.create_user(**validated_data)


class JobListingSerializer(serializers.ModelSerializer):
    employer = serializers.SlugRelatedField(read_only=True, slug_field='username')

    class Meta:
        model = JobListing
        fields = ['id', 'title', 'description', 'salary', 'employer', 'location', 'date_posted']


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'applicant', 'job_listing', 'cover_letter', 'date_applied']


class StatusSerializer(serializers.ModelSerializer):
    application = serializers.SlugRelatedField(read_only=True, slug_field='applicant')

    class Meta:
        model = Status
        fields = ['id', 'application', 'status']


class MessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = ['id', 'sender', 'receiver', 'content', 'timestamp']