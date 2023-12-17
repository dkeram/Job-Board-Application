import {Link} from "react-router-dom";


const NavBar = () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="navbar">
            <Link class="navbar-brand" to="/HomePage">Home</Link>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item"><Link class="nav-link" to="/postjob">Post a Job</Link></li>
                <li class="nav-item"><Link class="nav-link" to="/singup">Sign Up</Link></li>
                <li class="nav-item"><Link class="nav-link" to="/login">Login</Link></li>
                <li class="nav-item"><Link class="nav-link" to="/profile">Profile</Link></li>
                <li class="nav-item"><Link class="nav-link" to="/logout">Logout</Link></li>
            </ul>
        </nav>
    );
};


export default NavBar;