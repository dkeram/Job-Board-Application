import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';
import useDebounce from '../hooks/useDebounce';

const JobList = (props) =>{
    const [selectedJob, setSelectedJob] = useState(null);
    const {role} = useAuth();
    const [jobs, setJobs] = useState([]);
    const [message, setMessage] = useState('');
    const {username, isAuth} = useAuth();
    const [searchTxt, setSearchTxt] = useState('');
    const debounce = useDebounce(searchTxt, 500);

    useEffect(() => {
        if(!isAuth){
            setMessage("You are not logged-in!")
        }else{
            setMessage(`Welcome back ${username}`);
            };
    },[isAuth, username]);

    const fetchJobs = async()=> {
        try{
            const response = await axios.get(`http://localhost:8000/jobs/?title=${searchTxt}`);
            setJobs(response.data);
        }catch(error){
        console.error('Error fetching jobs', error);
        }
    };

    useEffect(()=>{
        fetchJobs();
    },[debounce]);

    const handleJobClick = (jobId) =>{
        if(selectedJob === jobId){
            setSelectedJob(null);
        }else{
            setSelectedJob(jobId);
            
        }
    };

    return(
        <>
        <div className="form-signin mt-5 text-center">
          <h6>{message}</h6>
        </div>
        <div className="container mt-5">
            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search for a job..." aria-label="Search" value={searchTxt} onChange={e=> setSearchTxt(e.target.value)} />
            </form>
        </div>    
        <div className="container mt-5">
            <h2 className="mb-4">Available Jobs</h2>
            <ul className="list-group">
                {jobs.map(job => (
                    <li key = {job.id} className='list-group-item'>
                        <div className="d-flex justify-content-between align-items-center">
                            <span onClick = {()=> {handleJobClick(job.id)}} style = {{cursor: "pointer" }}>
                                <b>{job.title}</b>
                            </span>
                        </div>
                        {selectedJob === job.id && (
                            <div className="mt-3">
                                <strong>Description:</strong>
                                <p dangerouslySetInnerHTML={{ __html: job.description.replace(/\n/g, '<br />') }}></p>
                                <strong>Salary:</strong>
                                <p dangerouslySetInnerHTML={{ __html: job.salary.toString().replace(/\n/g, '<br />') }}></p>
                                <strong>Location:</strong>
                                <p dangerouslySetInnerHTML={{ __html: job.location.replace(/\n/g, '<br />') }}></p>
                                <strong>Date Posted:</strong>
                                <p dangerouslySetInnerHTML={{ __html: job.date_posted.replace(/\n/g, '<br />') }}></p>
                                {role === "Job Seeker" ? 
                                 <Link to="/application-form" state={{job:job.id}}><button class="btn btn-primary">Apply</button></Link>
                                : null
                                }
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    </>
    );
};


export default JobList;