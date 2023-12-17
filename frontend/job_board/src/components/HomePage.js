import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './NavBar'
import axios from 'axios';
import React,{useEffect,useState} from 'react';
import JobListing from './JobListingPage';
import AddJob from './JobPostingForm';
import LoginPage from './LoginPage';
import UserProfile from './UserProfilePage';
import LogoutPage from './LogoutPage';
import {Route, Routes} from "react-router-dom";
import UserRegistrationPage from './UserRegistrationPage';

function HomePage(){
    const [jobs, setJobs] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if(localStorage.getItem('access_token')===null){
            setMessage("You are not logged-in!")
        }else{
            (async () => {
                try{
                    await axios.get(`http://localhost:8000/token/`, {headers: {'Content-Type':'application/json'}});
                    setMessage("Hi");
                }catch (e) {
                    console.log('not auth');
                }
            })
        ()};
    },[]);

    const fetchJobs = async()=> {
        try{
            const response = await axios.get(`http://localhost:8000/jobs/`);
            setJobs(response.data);
        }catch(error){
        console.error('Error fetching jobs', error);
        }
    };

    useEffect(()=>{
        fetchJobs();
    },[]);


    return (
    <div className="App">
        <header className="App-Header">
        <h1>Job Board</h1>
        <div className="form-signin mt-5 text-center">
          <h5>{message}</h5>
        </div>
        <NavBar />
        <div className="container">
            <Routes>
                <Route path="/postjob" element={<AddJob />} />
                <Route path="/singup" element={<UserRegistrationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/logout" element={<LogoutPage />} />
            </Routes>
        </div>
        <JobListing jobs = {jobs} refreshJobs = {fetchJobs} />
        </header>
    </div> 
    );
}

export default HomePage;
