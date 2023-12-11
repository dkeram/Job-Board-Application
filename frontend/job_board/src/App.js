import axios from 'axios';
import './App.css';
import React,{useEffect,useState} from 'react';
import JobListing from './components/JobListingPage';


function App() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async()=> {
    try{
        const response = await axios.get(`http://localhost:8000/Job_Board/`);
        setJobs(response.data);
    }catch(error){
      console.error('Error fetching jobs',+error);
    }
  }

  useEffect(()=>{
    fetchJobs();
  },[]);


  return (
   <div className="App">
    <header className="App-Header">
      <h1>Job Board</h1>
      <JobListing jobs = {jobs} refreshJobs = {fetchJobs} />
    </header>
   </div>
   
  );
}

export default App;
