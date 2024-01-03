import React, {useState} from "react";
import {Link} from 'react-router-dom';
import { useAuth } from "./AuthContext";
import ApplicationForm from "./ApplicationForm";

const JobList = (props) =>{
    const [selectedJob, setSelectedJob] = useState(null);
    const {isAuth} = useAuth();

    const handleJobClick = (jobId) =>{
        if(selectedJob === jobId){
            setSelectedJob(null);
        }else{
            setSelectedJob(jobId);
            
        }
    };

    return(
        <div className="container mt-5">
            <h2 className="mb-4">Available Jobs</h2>
            <ul className="list-group">
                {props.jobs.map(job => (
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
                                <ApplicationForm job_listing = {job.id} />
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default JobList;