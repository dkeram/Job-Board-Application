import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./components/LoginPage";
import Home from "./components/HomePage";
import Navigation from './components/NavBar';
import Logout from './components/LogoutPage';
import AddJob from './components/JobPostingForm';
import UserProfile from './components/UserProfilePage';
import UserRegistrationPage from './components/UserRegistrationPage';


function App() {

    return (
      <BrowserRouter>
        <Navigation></Navigation>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/add-a-job" element={<AddJob/>}/>
          <Route path="/user-profile" element={<UserProfile/>}/>
          <Route path="/Sign-Up" element={<UserRegistrationPage/>}/>
        </Routes>
      </BrowserRouter>)
    ;
}

export default App;