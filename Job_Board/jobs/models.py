from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class CustomUser(AbstractUser):
    EMPLOYER = 'employer'
    JOB_SEEKER = 'job_seeker'

    ROLE_CHOICES = [
        (EMPLOYER, 'Employer'),
        (JOB_SEEKER, 'Job Seeker'),
    ]

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default=JOB_SEEKER,
    )

    def __str__(self):
        return self.username


class JobListing(models.Model):
    title = models.CharField(max_length=80)
    description = models.TextField()
    salary = models.IntegerField()
    location = models.CharField(max_length=80)
    employer = models.ForeignKey(CustomUser, blank=True, on_delete=models.CASCADE)
    date_posted = models.DateField()

    def __str__(self):
        return self.title


class Application(models.Model):
    applicant = models.ForeignKey(CustomUser, blank=True, on_delete=models.CASCADE)
    job_listing = models.ForeignKey(JobListing, blank=True, null=True, on_delete=models.CASCADE)
    cover_letter = models.TextField()
    date_applied = models.DateField()

    def __str__(self):
        return self.applicant
