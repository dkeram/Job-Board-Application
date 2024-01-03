import React, {useState} from "react";
import axios from "axios";
import {useAuth} from './AuthContext';

const JobPostingPage = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [salary, setSalary] = useState('');
    const {token, id} = useAuth();
    const [location, setLocation] = useState('');
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try{
            await axios.post(`http://localhost:8000/jobs/`, {
                title : title,
                description : description,
                salary : salary,
                employer: id,
                location : location,
            },{headers: {Authorization :`Bearer ${token}`},});

            setTitle('');
            setDescription('');
            setSalary('');
            setLocation('');

        }catch(error){
            console.error('Error Creating Job: ',error);
        }
    };

    return(
        <div className="container mt-5">
            <h2 className="mb-4">Post a new Job</h2>
            <form onSubmit={handleSubmit} className="mb-5">
                <div className='mb-3'>
                    <label className="form-label">Title:</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Description:</label>
                    <textarea type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Salary:</label>
                    <input type="number" className="form-control" value={salary} onChange={(e) => setSalary(e.target.value)} required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Location:</label>
                    <input className='form-control' value={location} onChange={(e) => setLocation(e.target.value)} required></input>
                </div>
                <button type='submit' className="addJob">Add Job</button>
            </form>
        </div>
    );
};

export default JobPostingPage;