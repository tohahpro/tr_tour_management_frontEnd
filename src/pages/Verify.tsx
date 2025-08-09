import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";



export default function Verify() {

    const location = useLocation();
    const [email] = useState(location.state);
    const navigate = useNavigate()


    useEffect(()=>{
        if(!email){
            navigate('/')
        }
    },[email, navigate])
    
  return (
    <div>
      <h1>This is Verify component</h1>
    </div>
  );
}