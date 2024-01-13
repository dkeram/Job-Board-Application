import React, {useState, useEffect} from "react";
import axios from "axios";
import {useAuth} from './AuthContext';

const MessageForm = (props) => {
    const {token, id} = useAuth();
    const [receiver, setReceiver] = useState([]);
    const [selectedReceiver, setSelectedReceiver] = useState(null);
    const [content, setContent] = useState('');
 
    useEffect(() => {
        
        const fetchReceivers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/user/');
                setReceiver(response.data);
            } catch (error) {
                console.error('Error fetching receivers', error);
            }
        };

        fetchReceivers();
    }, []);


    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            await axios.post(`http://localhost:8000/message/`, {
                sender : id,
                receiver : selectedReceiver,
                content : content,
            },{headers: {Authorization :`Bearer ${token}`},});

            setReceiver([]);
            setContent('');
        }catch(error){
            console.error('Error Senting the message: ',error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Send a Message</h2>
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="receiver_name"  class="form-label">Select Recipient:</label>
                    <select id="receiver_name" class="form-select"
                        value={selectedReceiver}
                        onChange={(e) => setSelectedReceiver(e.target.value)}
                    >
                        <option value="" disabled>
                            Select recipient
                        </option>
                        {receiver.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                </div>
                <div class="mb-3">
                    <label for="message"  class="form-label">Message:</label>
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

export default MessageForm;