import React, {useState} from 'react';
import axios from 'axios';
import {useAuth} from './AuthContext';
import { useLocation } from "react-router-dom";

const Reply = (props) => {
    const {token, id} = useAuth();
    const {state} = useLocation();
    const [content, setContent] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            await axios.post(`http://localhost:8000/message/`, {
                sender : id,
                receiver : state.receiver,
                content : content,
            },{headers: {Authorization :`Bearer ${token}`},});
            setContent('');
        }catch(error){
            console.error('Error Senting the message: ',error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Send a Reply</h2>
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="message"  class="form-label"><strong>Message:</strong></label>
                    <textarea id="message" class="form-control"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button type="submit" class="btn btn-primary">Send</button>
            </form>
        </div>
    );
};

export default Reply;