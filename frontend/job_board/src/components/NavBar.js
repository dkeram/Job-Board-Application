import {Link} from "react-router-dom";
import React from 'react';
import { useAuth } from "./AuthContext";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar(){
    const {role, isAuth} = useAuth();
    
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="navbar">
            <div class="container-fluid">
                <Link class="navbar-brand" to="/">Home</Link>
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">{isAuth ? null:<Link class="nav-link" to="/signup">SignUp</Link>}</li>
                    <li class="nav-item">{isAuth ? null:<Link class="nav-link" to="/login">Login</Link>}</li>
                    <li class="nav-item">{isAuth && role === 'Employer' ? <Link class="nav-link" to="/add-a-job">Post a Job</Link>:null}</li>
                    <li class="nav-item">{isAuth ?<Link class="nav-link" to="/profile">Profile</Link>:null}</li>
                    <li class="nav-item dropdown">{isAuth ?
                        <>
                        <Navbar.Toggle aria-controls="navbar-dark-example" />
                        <Navbar.Collapse class="collapse navbar-collapse" id="navbar-dark-example">
                        <Nav>
                            <NavDropdown
                            id="nav-dropdown-dark-example"
                            title="Messages"
                            menuVariant="dark"
                            >
                            <NavDropdown.Item><Link class="nav-link" to="/messages">Sent a message</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link class="nav-link" to="/inbox">Inbox</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link class="nav-link" to="/outbox">Outbox</Link></NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        </Navbar.Collapse>
                        </>
                        :null}
                    </li>
                    <li class="nav-item">{isAuth ?<Link class="nav-link" to="/logout">Logout</Link>:null}</li>
                </ul>
            </div>
        </nav>
    );
};


export default NavBar;