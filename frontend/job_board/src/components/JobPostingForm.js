import React, {useState,useEffect} from "react";
import axios from "axios";

const JobPostingPage = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [salary, setSalary] = useState('');
    const [employer, setEmployer] = useState('');
    const [location, setLocation] = useState('');
    const JWT_token = localStorage.getItem('access_token');
    
    useEffect(() => {
        if(localStorage.getItem('access_token')!==null){
            (async () => {
                try{
                    const response = await axios.get(`http://localhost:8000/get-details/`, {headers: {Authorization :`Bearer ${JWT_token}`},});
                    setEmployer(response.data.id);
                    console.log(employer)
                }catch (e) {
                    console.log('not auth');
                }
            })
        ()};
    },[JWT_token, employer]);


    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            await axios.post(`http://localhost:8000/jobs/`, {
                title : title,
                description : description,
                salary : salary,
                employer: employer,
                location : location,
            },{headers: {Authorization :`Bearer ${JWT_token}`},});

            setTitle('');
            setDescription('');
            setSalary('');
            setEmployer('');
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