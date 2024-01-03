import {Link} from "react-router-dom";
import React from 'react';
import { useAuth } from "./AuthContext";

function NavBar(){
    const {role, isAuth} = useAuth();
    
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="navbar">
            <Link class="navbar-brand" to="/">Home</Link>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">{isAuth ? null:<Link class="nav-link" to="/signup">SignUp</Link>}</li>
                <li class="nav-item">{isAuth ? null:<Link class="nav-link" to="/login">Login</Link>}</li>
                <li class="nav-item">{isAuth && role === 'Employer' ? <Link class="nav-link" to="/add-a-job">Post a Job</Link>:null}</li>
                <li class="nav-item">{isAuth ?<Link class="nav-link" to="/profile">Profile</Link>:null}</li>
                <li class="nav-item">{isAuth ?<Link class="nav-link" to="/message">Messages</Link>:null}</li>
                <li class="nav-item">{isAuth ?<Link class="nav-link" to="/logout">Logout</Link>:null}</li>
            </ul>
        </nav>
    );
};


export default NavBar;