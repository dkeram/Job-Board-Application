# Generated by Django 4.2.6 on 2023-12-19 22:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='role',
            field=models.CharField(choices=[('Employer', 'Employer'), ('Job Seeker', 'Job Seeker')], max_length=10),
        ),
    ]