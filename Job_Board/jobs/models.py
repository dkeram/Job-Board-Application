from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.


class Users(AbstractUser):
    username = models.CharField(max_length=80, unique=True)
    password = models.CharField(max_length=80)
    email = models.EmailField(unique=True)
    ROLES = (
        ('Employer', 'Employer'),
        ('Job Seeker', 'Job Seeker'),
    )
    role = models.CharField(max_length=10, choices=ROLES)

    def __str__(self):
        return self.username


class JobListing(models.Model):
    title = models.CharField(max_length=80)
    description = models.TextField()
    salary = models.IntegerField()
    location = models.CharField(max_length=80)
    employer = models.ForeignKey(Users, on_delete=models.CASCADE)
    date_posted = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title


class Status(models.Model):
    STATUS = (
        ('Pending', 'Pending'),
        ('Rejected', 'Rejected'),
        ('Accepted', 'Accepted'),
    )

    status = models.CharField(max_length=10, choices=STATUS, default='Pending')

    def __str__(self):
        return self.status


class Application(models.Model):
    applicant = models.ForeignKey(Users, blank=True, on_delete=models.CASCADE)
    job_listing = models.ForeignKey(JobListing, blank=True, null=True, on_delete=models.CASCADE)
    cover_letter = models.TextField()
    date_applied = models.DateField(auto_now_add=True)
    status = models.ForeignKey(Status, on_delete=models.CASCADE)

    def __str__(self):
        return self.applicant.username


class Message(models.Model):
    sender = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='received_messages')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.sender} to {self.receiver}'
