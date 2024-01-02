Project Name: Job Board Application
Technologies: Django, Django REST Framework, React

Introduction
Overall Objective: To create an interactive job board application that allows users to post jobs, view jobs, and apply for them.

Technologies Used: Backend built with Django and Django REST Framework, Frontend with React.js

Key Features: User authentication, job posting, job listing, applying to jobs, user profiles.

Backend - Django:
Objective: Create a scalable and secure backend for our job board application.

Main Components:

User model: Contains information such as username, email, password, and role.
JobListing model: Contains details such as title, description, salary, location, employer, and date_posted.
Application model: Stores details like applicant, job_listing, cover_letter, and date_applied.
Backend - Django API Endpoints
Objective: Expose the data of our Django app to our React frontend through RESTful API endpoints.

Main Endpoints:

User Registration/Login
Job Posting
Job Listing
Job Application
Backend - Authentication:
Objective: Ensure that only authenticated users can access certain endpoints.

Method: Token-based authentication. Upon login, users receive a token that they must include in their subsequent requests.

Frontend - React:
Objective: Create a dynamic and user-friendly interface for our application.

Main Components:

Home Page: Shows a list of job listings.
Job Listing Page: Displays detailed information about a job.
User Registration/Login: Forms for user registration and login.
Job Posting Form: A form for employers to post new jobs.
Application Form: A form for job seekers to apply to jobs.
User Profile Page: Allows users to see the jobs they've posted or applied to.
Home Page and Job Listing Page:
Display of job listings with an option to filter and search.
Clicking on a job takes the user to a detailed view with an "Apply" button.
User Registration/Login:
Forms to handle user registration and login.
Users receive a token upon login, which is stored in the local storage.
Job Posting Form:
Only visible to employers.
Employers can enter job details and post a new job.
Application Form:
Only visible to job seekers.
Job seekers can enter their cover letter and apply for a job.
User Profile Page:
Displays jobs posted or applied to, based on user's role.
Users can view the status of their posted jobs or applications.
Future Optional Enhancements:
Advanced search and filters for job listings.
User messaging for employers and applicants to communicate.
Application status tracking (pending, rejected, accepted).
