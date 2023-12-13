from django.contrib import admin
from .models import User ,JobListing, Application

# Register your models here.
admin.site.register(User)
admin.site.register(JobListing)
admin.site.register(Application)
