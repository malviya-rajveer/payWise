import axios from "axios";
import { useEffect, useState } from "react";

export const Balance = ({ value }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                });
                const balance = Math.floor(response.data.balance);
                setUser({ balance: balance });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return <div className="flex text-white">
        <div className="font-bold text-lg ">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {user.balance}
        </div>
    </div>
}