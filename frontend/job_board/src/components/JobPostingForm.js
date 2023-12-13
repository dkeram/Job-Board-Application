import React, {useState} from "react";
import axios from "axios";

const UserRegistrationPage = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [salary, setSalary] = useState('');
    const [location, setLocation] = useState('');
    const [employer, setEmployer] = useState('');
    const [date_posted, setDatePosted] = useState('');
    

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            await axios.post(`http://localhost:8000/jobs`, {
                title : title,
                description : description,
                salary : salary,
                location : location,
                employer : employer,
                date_posted : date_posted,
            });

            setTitle('');
            setDescription('');
            setSalary('');
            setLocation('');
            setEmployer('');
            setDatePosted('');

        }catch(error){
            console.error('Error Creating User: ',error);
        }
    };

    return(
        <div className="container mt-5">
            <h2 className="mb-4">Create new user</h2>
            <form onSubmit={handleSubmit} className="mb-5">
                <div className='mb-3'>
                    <label className="form-label">Title:</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Description:</label>
                    <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Salary:</label>
                    <input type="text" className="form-control" value={salary} onChange={(e) => setSalary(e.target.value)} required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Location:</label>
                    <textarea className='form-control' value={location} onChange={(e) => setLocation(e.target.value)} required></textarea>
                </div>
                <div className='mb-3'>
                    <label className="form-label">Employer:</label>
                    <textarea className='form-control' value={employer} onChange={(e) => setEmployer(e.target.value)} required></textarea>
                </div>
                <div className='mb-3'>
                    <label className="form-label">Date Posted:</label>
                    <textarea className='form-control' value={date_posted} onChange={(e) => setDatePosted(e.target.value)} required></textarea>
                </div>
                <button type='submit' className="addJob">Add Job</button>
            </form>
        </div>
    );
};

export default UserRegistrationPage;