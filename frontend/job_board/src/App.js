import './App.css';
import {Routes, Route} from 'react-router-dom';
import Login from "./components/LoginPage";
import Home from "./components/HomePage";
import Navigation from './components/NavBar';
import Logout from './components/LogoutPage';
import AddJob from './components/JobPostingForm';
import UserProfile from './components/UserProfilePage';
import UserRegistrationPage from './components/UserRegistrationPage';


function App() {

    return (
      <>
        <Navigation></Navigation>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/add-a-job" element={<AddJob/>}/>
          <Route path="/profile" element={<UserProfile/>}/>
          <Route path="/signUp" element={<UserRegistrationPage/>}/>
        </Routes>
      </>);
}

export default App;