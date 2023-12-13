import React, {useState} from "react";
import axios from "axios";

const ApplicationForm = (props) => {
    const [applicant, setApplicant] = useState('');
    const [job_listing, setJobListing] = useState('');
    const [cover_letter, setCoverLetter] = useState('');
    const [date_applied, setDateApplied] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            await axios.post(`http://localhost:8000/application`, {
                applicant : applicant,
                job_listing : job_listing,
                cover_letter : cover_letter,
                date_applied : date_applied,
            });

            setApplicant('');
            setJobListing('');
            setCoverLetter('');
            setDateApplied('');
        }catch(error){
            console.error('Error Creating Application: ',error);
        }
    };

    return(
        <div className="container mt-5">
            <h2 className="mb-4">Create New Application</h2>
            <form onSubmit={handleSubmit} className="mb-5">
                <div className='mb-3'>
                    <label className="form-label">Applicant:</label>
                    <input type="text" className="form-control" value={applicant} onChange={(e) => setApplicant(e.target.value)} required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Password:</label>
                    <input type="text" className="form-control" value={job_listing} onChange={(e) => setJobListing(e.target.value)} required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">E-mail:</label>
                    <input type="text" className="form-control" value={cover_letter} onChange={(e) => setCoverLetter(e.target.value)} required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Role:</label>
                    <textarea className='form-control' value={date_applied} onChange={(e) => setDateApplied(e.target.value)} required></textarea>
                </div>
                <button type='submit' className="addApplication">Apply</button>
            </form>
        </div>
    );
};

export default ApplicationForm;