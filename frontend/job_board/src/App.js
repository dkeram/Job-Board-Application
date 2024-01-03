import './App.css';
import {Routes, Route} from 'react-router-dom';
import Login from "./components/LoginPage";
import Home from "./components/HomePage";
import Navigation from './components/NavBar';
import Logout from './components/LogoutPage';
import AddJob from './components/JobPostingForm';
import ApplicationForm from "./components/ApplicationForm";
import UserProfile from './components/UserProfilePage';
import UserRegistrationPage from './components/UserRegistrationPage';
import HeaderImage from './assets/images/header.png';

function App() {

    return (
      <header>
        <img src={HeaderImage} class="rounded mx-auto d-block" alt='Job_Board' />
        <Navigation></Navigation>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/add-a-job" element={<AddJob/>}/>
          <Route path="/application-form" element={<ApplicationForm/>}/>
          <Route path="/profile" element={<UserProfile/>}/>
          <Route path="/signUp" element={<UserRegistrationPage/>}/>
        </Routes>
      </header>
    );
}

export default App;