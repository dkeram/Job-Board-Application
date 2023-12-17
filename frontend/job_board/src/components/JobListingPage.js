import React, {useState} from "react";
import ApplicationForm from "./ApplicationForm";

const JobList = (props) =>{
    const [selectedJob, setSelectedJob] = useState(null);

    const handleJobClick = (jobId) =>{
        if(selectedJob === jobId){
            setSelectedJob(null);
        }else{
            setSelectedJob(jobId);
        }
    };

    return(
        <div className="container mt-5">
            <h2 className="mb-4">All Jobs</h2>
            <ul className="list-group">
                {props.jobs.map(job => (
                    <li key = {job.id}>
                        <div>
                            <span onClick = {()=> {handleJobClick(job.id)}}>
                                <b>{job.title}</b>
                            </span>
                            <button className="btn" onClick = {()=> <ApplicationForm job={job.id} /> }>Apply</button>
                        </div>
                        {selectedJob === job.id && (
                            <div>
                                <strong>Description:</strong>
                                <p dangerouslySetInnerHTML={{ __html: job.description.replace(/\n/g, '<br />')}}></p>
                                <strong>Salary:</strong>
                                <p dangerouslySetInnerHTML={{ __html: job.salary.replace(/\n/g, '<br />')}}></p>
                                <strong>Location:</strong>
                                <p dangerouslySetInnerHTML={{ __html: job.location.replace(/\n/g, '<br />')}}></p>
                                <strong>Employer:</strong>
                                <p dangerouslySetInnerHTML={{ __html: job.employer.replace(/\n/g, '<br />')}}></p>
                                <strong>Date Posted:</strong>
                                <p dangerouslySetInnerHTML={{ __html: job.date_posted.replace(/\n/g, '<br />')}}></p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default JobList;