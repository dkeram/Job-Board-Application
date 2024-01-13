import React, {useState} from 'react';
import axios from 'axios';

const UserRegistrationPage = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');


    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            await axios.post(`http://localhost:8000/user/`, {
                username : username,
                password : password,
                email : email,
                role : role
            });
            
            setUsername('');
            setPassword('');
            setEmail('');
            setRole('');
        }catch(error){
            console.error('Error Creating User: ',error);
        }
    };

    return(
        <div className="container mt-5">
            <h2 className="mb-4">Create new user</h2>
            <form onSubmit={handleSubmit} className="mb-5">
                <div className='mb-3'>
                    <label className="form-label">Username:</label>
                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Password:</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">E-mail:</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Role:</label>
                    <select className='form-select' onChange={(e) => setRole(e.target.value)} required>
                        <option>--------------------------</option>
                        <option value="Employer">Employer</option>
                        <option value="Job Seeker">Job Seeker</option>
                    </select>
                </div>
                <button type='submit' className="addUser">Create User</button>
            </form>
        </div>
    );
};

export default UserRegistrationPage;