import React from 'react';
import JobListing from './JobListingPage';


function HomePage(){
    return (
    <div className="App">
        <header className="App-Header">
        <JobListing />
        </header>
    </div> 
    );
}

export default HomePage;
