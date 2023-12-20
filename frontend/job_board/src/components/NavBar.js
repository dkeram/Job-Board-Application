import axios from 'axios';
import {Link} from "react-router-dom";
import React, { useState, useEffect} from 'react';

function NavBar(){
    const [isAuth, setIsAuth] = useState(false);
    const [role, setRole] = useState('');
    
    useEffect(() => {
     if (localStorage.getItem('access_token') !== null) {
        setIsAuth(true);

        const JWT_token = localStorage.getItem('access_token');
        const role_response = async() => {
            const response = await axios.get(`http://localhost:8000/get-details`, {headers:{Authorization:`Bearer ${JWT_token}`},})
            setRole(response.data.role);
        };
      }
    }, [isAuth,role]);
    

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="navbar">
            <Link class="navbar-brand" to="/">Home</Link>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">{isAuth ? null:<Link class="nav-link" to="/signup">SignUp</Link>}</li>
                <li class="nav-item">{isAuth ? null:<Link class="nav-link" to="/login">Login</Link>}</li>
                <li class="nav-item">{isAuth ?<Link class="nav-link" to="/add-a-job">Post a Job</Link>:null}</li>
                <li class="nav-item">{isAuth ?<Link class="nav-link" to="/profile">Profile</Link>:null}</li>
                <li class="nav-item">{isAuth ?<Link class="nav-link" to="/message">Messages</Link>:null}</li>
                <li class="nav-item">{isAuth ?<Link class="nav-link" to="/logout">Logout</Link>:null}</li>
            </ul>
        </nav>
    );
};


export default NavBar;