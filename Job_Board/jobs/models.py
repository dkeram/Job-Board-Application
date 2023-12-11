from django.db import models


# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=80)
    password = models.CharField(max_length=80)
    email = models.CharField(max_length=80)
    role = [('employer', 'employer'), ('job_seeker', 'job seeker')]

    def __str__(self):
        return self.username


class JobListing(models.Model):
    title = models.CharField(max_length=80)
    description = models.TextField()
    salary = models.IntegerField(max_length=10)
    location = models.CharField(max_length=80)
    employer = models.ForeignKey(User, blank=True, on_delete=models.CASCADE)
    date_posted = models.DateField()

    def __str__(self):
        return self.title


class Application(models.Model):
    applicant = models.CharField(max_length=80)
    job_listing = models.ForeignKey(JobListing, blank=True, null=True, on_delete=models.CASCADE)
    cover_letter = models.TextField()
    date_applied = models.DateField()

    def __str__(self):
        return self.applicant
