import React, {useState} from "react";
import axios from "axios";
import {useAuth} from './AuthContext';

const StautsApplicationForm = (props) => {
    const {token} = useAuth();
    const application_id = props.application_id;
    const applicant = props.applicant;
    const cover_letter = props.application_cl;
    const job_listing = props.job_listing;
    const [status, setStatus] = useState('');
 
    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            await axios.put(`http://localhost:8000/update_applications/${application_id}`, {
                applicant : applicant,
                job_listing : job_listing,
                cover_letter : cover_letter,
                status : {'id':status},
            },{headers: {Authorization :`Bearer ${token}`},});

            console.log(status);
            
            setStatus('');
        }catch(error){
            console.error('Error Creating Application: ',error);
        }
    };

    return(
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label className="form-label">Role:</label>
                    <select className='form-select' onChange={(e) => setStatus(e.target.value)} required>
                        <option value="1">Pending</option>
                        <option value="2">Rejected</option>
                        <option value="3">Accepted</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Update Applications</button>
            </form>
        </div>
    );
};

export default StautsApplicationForm;