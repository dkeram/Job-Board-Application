import { useEffect} from "react";
import axios from "axios";


const Logout = () => {
    useEffect(() => {
        (async ()=>{
            try{
                await axios.post(`http:127.0.0.1:8000/logout/`,{refresh_token:localStorage.getItem('refresh_token')},
                {headers:{"Content-Type":"application/json"}},{withCredentials: true});
                localStorage.clear();
                axios.defaults.headers.common['Authorization'] = null;
                window.location.href= '/login'
            }catch(e){
                console.log("logout not working!", e)
            }
        })();
    },[]);

    return(
        <div>
            <h6>See you around!</h6>
        </div>
    );
};

export default Logout;