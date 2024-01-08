from rest_framework import serializers
from .models import Users, Application, JobListing, Status, Message
from drf_writable_nested import WritableNestedModelSerializer


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'username', 'password', 'email', 'role']

    def create(self, validated_data):
        return Users.objects.create_user(**validated_data)


class JobListingSerializer(serializers.ModelSerializer):
    # employer = UsersSerializer(read_only=True)

    class Meta:
        model = JobListing
        fields = ['id', 'title', 'description', 'salary', 'employer', 'location', 'date_posted']


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ['id', 'status']


class ApplicationSerializer(WritableNestedModelSerializer, serializers.ModelSerializer):
    status = StatusSerializer(read_only=False)

    class Meta:
        model = Application
        fields = ['id', 'applicant', 'job_listing', 'cover_letter', 'date_applied', 'status']


class MyApplicationSerializer(serializers.ModelSerializer):
    applicant = UsersSerializer(read_only=True)
    job_listing = JobListingSerializer(read_only=True)
    status = StatusSerializer(read_only=True)

    class Meta:
        model = Application
        fields = ['id', 'applicant', 'job_listing', 'cover_letter', 'date_applied', 'status']

        def get_name(self, obj):
            return obj.user.username, obj.job_listing.title, obj.status.id


class EmployerApplicationSerializer(serializers.ModelSerializer):
    applicant = UsersSerializer(read_only=True)
    status = StatusSerializer(read_only=True)

    class Meta:
        model = Application
        fields = ['id', 'applicant', 'job_listing', 'cover_letter', 'date_applied', 'status']

        def get_name(self, obj):
            return obj.user.username, obj.status.status, odj.status.status


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'sender', 'receiver', 'content', 'timestamp']


class InboxMessagesSerializer(serializers.ModelSerializer):
    sender = UsersSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'sender', 'receiver', 'content', 'timestamp']


class OutboxMessagesSerializer(serializers.ModelSerializer):
    receiver = UsersSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'sender', 'receiver', 'content', 'timestamp']
