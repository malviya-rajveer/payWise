import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export  const Appbar = () =>{
    const [user, setUser] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [user]);



        

    return <div className ="shadow shadow-slate-800 h-14 flex justify-between">
        
    <div className="flex flex-col justify-center h-full text-xl ml-4 text-white ">
         Pay Wise
    </div>
         <div className="flex">
            <div className="py-[10px] pr-4">
                <Button label={"logout"} onClick={(e)=>{
                    navigate("/signin")
                }}></Button>
            </div>
             <div className="flex flex-col justify-center h-full mr-4 text-white">
                 {user.name}
             </div>
             
             <div className = "rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">

                 <div className="flex flex-col justify-center h-full text-xl">
                    Me
                 </div>

             </div>
         </div>
    </div>
}