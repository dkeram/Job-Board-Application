import axios from 'axios';
import React,{useEffect,useState} from 'react';
import JobListing from './JobListingPage';
import { useAuth } from './AuthContext';

function HomePage(){
    const [jobs, setJobs] = useState([]);
    const [message, setMessage] = useState('');
    const {username, isAuth} = useAuth();

    useEffect(() => {
        if(!isAuth){
            setMessage("You are not logged-in!")
        }else{
            setMessage(`Welcome back ${username}`);
            };
    },[isAuth, username]);

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
        <div className="form-signin mt-5 text-center">
          <h6>{message}</h6>
        </div>
        <JobListing jobs = {jobs} refreshJobs = {fetchJobs} />
        </header>
    </div> 
    );
}

export default HomePage;
