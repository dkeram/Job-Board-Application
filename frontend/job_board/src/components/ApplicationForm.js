import React, {useState} from "react";
import axios from "axios";
import {useAuth} from './AuthContext';

const ApplicationForm = (props) => {
    const {token, id} = useAuth();
    const job_listing = props.job_listing;
    const [cover_letter, setCoverLetter] = useState('');
 
    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            await axios.post(`http://localhost:8000/application/`, {
                applicant : id,
                job_listing : job_listing,
                cover_letter : cover_letter,
                status : 1,
            },{headers: {Authorization :`Bearer ${token}`},});
            
            setCoverLetter('');
        }catch(error){
            console.error('Error Creating Application: ',error);
        }
    };

    return(
        <div className="container mt-5">
            <h2 className="mb-4">Create New Application</h2>
            <form onSubmit={handleSubmit} className="mb-5">
                <div className='mb-3'>
                    <label className="form-label">Cover Letter:</label>
                    <textarea type="text" className="form-control" value={cover_letter} onChange={(e) => setCoverLetter(e.target.value)} required />
                </div>
                <button type='submit' className="btn btn-primary">Apply</button>
            </form>
        </div>
    );
};

export default ApplicationForm;