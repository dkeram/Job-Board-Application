import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useAuth} from './AuthContext';


function InboxMessages(props){
    const {token, id} = useAuth();
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [messages, setMessages] = useState([]);

    const fetchMessages = async()=> {
        try{
            const messagesData = await axios.get(`http://localhost:8000/inbox_messages/${id}`,{headers: {Authorization :`Bearer ${token}`},});
            setMessages(messagesData.data);
        }catch(error){
            console.error('Error fetching Messages', error);
        }
    };
    
    const handleDelete = async(messageId)=> {
        try{
            await axios.delete(`http://localhost:8000/message/${messageId}`,{headers: {Authorization :`Bearer ${token}`},});
            window.location.reload();
        }catch(error){
            console.error('Error Deleting Message: ', error);
        }
    };
    
    const handleJobClick = async(messageId) =>{
        if(selectedMessage === messageId){
            setSelectedMessage(null);
        }else{
            setSelectedMessage(messageId);
        };
    };


    useEffect(()=>{
        fetchMessages();
    },[]);
    
  
    
    return(
            <div className="container mt-5">
                <h2>My Inbox</h2>
                {messages.length === 0 ? 
                    <div>
                        <p>No messages yet!</p>
                    </div>:
                    <ol className="list-group">
                            {messages.map((message)=>
                                <li key= {message.id} className='list-group-item'>
                                    <div className="d-flex justify-content-between align-items-center">
                                    <span 
                                        onClick = {()=> {handleJobClick(message.id)}}
                                        style = {{cursor: "pointer" }}>
                                            <b> {message.sender.username} </b>
                                    </span>
                                    <button className="btn btn-danger" onClick={() => handleDelete(message.id) }>Delete Message</button>
                                    </div>
                                    {selectedMessage === message.id && (
                                        <div className="mt-3">
                                            <ul>
                                                <li>
                                                    <strong>Message:</strong>
                                                    <p dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br />') }}></p>
                                                    <strong>Received at:</strong>
                                                    <p dangerouslySetInnerHTML={{ __html: message.timestamp.replace(/\n/g, '<br />') }}></p>
                                                    <Link to="/reply" state={{receiver:message.sender}}><button type="submit" class="btn btn-primary">Reply</button></Link>
                                                </li>
                                            </ul>
                                            
                                        </div>
                                    )}
                                </li>
                            )}
                        </ol>}
                        <br></br>
                        <div>
                            <Link to="/"><button class="btn btn-primary">Back</button></Link>
                        </div>
                </div>
    );
};

export default InboxMessages;