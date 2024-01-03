import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {useAuth} from './AuthContext';


function UserProfile(props){
    const {isAuth, token, id, role} = useAuth();
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [selectedJob, setSelectedJob] = useState();

    const fetchJobs = async()=> {
        try{
            const jobData = await axios.get(`http://localhost:8000/my_jobs/${id}`,{headers: {Authorization :`Bearer ${token}`},});
            setJobs(jobData.data);
        }catch(error){
            console.error('Error fetching jobs', error);
        }
    };
    
    const handleDelete = async(jobId)=> {
        try{
            await axios.delete(`http://localhost:8000/jobs/${jobId}`,{headers: {Authorization :`Bearer ${token}`},});
        }catch(error){
            console.error('Error Deleting Job: ', error);
        }
    };
    
    const fetchApplications = async()=> {
        try{
            const applicationData = await axios.get(`http://localhost:8000/my_applications/${id}/`,{headers: {Authorization :`Bearer ${token}`},});
            setApplications(applicationData.data);
        }catch(error){
            console.error('Error fetching Applications', error);
        }
    };    
    
    const handleJobClick = (jobId) =>{
        if(selectedJob === jobId){
            setSelectedJob(null);
        }else{
            setSelectedJob(jobId);
        };
    };

    const handleApplicationsClick = (jobId) =>{
        <Link to={`/view_applications/${jobId}`} activeClassName="active"></Link>
    };

    useEffect(()=>{
        fetchJobs();
        fetchApplications();
    },[]);
    
  
    
    return(
        <div>
            {role=== 'Employer' ?
                <div>
                    <h2>My Jobs</h2>
                        <ul className="list-group">
                            {jobs.map((job)=>
                                <li key= {job.id} className='list-group-item'>
                                    <div className="d-flex justify-content-between align-items-center">
                                    <span 
                                        onClick = {()=> {handleJobClick(job.id)}}
                                        style = {{cursor: "pointer" }}>
                                            <b> {job.title} </b>
                                    </span>
                                    <button className="btn btn-primary" onClick={()=> handleApplicationsClick(job.id)}>See Applications</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(job.id) }>Delete</button>
                                    </div>
                                </li>
                            )}
                        </ul>
                </div>
                :
                <div>
                    <h2>My Applications</h2>
                        <ul className="list-group">
                        {applications.map((application)=>
                            <li key= {application.id} className='list-group-item'>
                                <div className="d-flex justify-content-between align-items-center">
                                    <b>{application.job_listing.title}</b>
                                    <b>{application.status.status}</b>
                                </div>
                            </li>
                            )}
                        </ul>
                </div>
            }
        </div>
    );
};

export default UserProfile;