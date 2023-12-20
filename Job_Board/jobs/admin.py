from django.contrib import admin
from .models import Users, JobListing, Application, Status, Message

# Register your models here.
admin.site.register(Users)
admin.site.register(JobListing)
admin.site.register(Application)
admin.site.register(Status)
admin.site.register(Message)