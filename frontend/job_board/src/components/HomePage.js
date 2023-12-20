import axios from 'axios';
import React,{useEffect,useState} from 'react';
import JobListing from './JobListingPage';

function HomePage(){
    const [jobs, setJobs] = useState([]);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const JWT_token = localStorage.getItem('access_token');

    useEffect(() => {
        if(localStorage.getItem('access_token')===null){
            setMessage("You are not logged-in!")
        }else{
            (async () => {
                try{
                    const response = await axios.get(`http://localhost:8000/get-details/`, {headers: {Authorization :`Bearer ${JWT_token}`},});
                    setUsername(response.data.username);
                    setMessage(`Welcome back ${username}`);
                }catch (e) {
                    console.log('not auth');
                }
            })
        ()};
    },[JWT_token, username]);

    const fetchJobs = async()=> {
        try{
            const response = await axios.get(`http://localhost:8000/jobs/`, {headers: {Authorization :`Bearer ${JWT_token}`},});
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
