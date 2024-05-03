import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";

export const Signup = ()=>{
    const navigate = useNavigate()
    const [firstname , setFirstname]= useState("")
    const [lastname , setLastname]= useState("")
    const [username , setEmail]= useState("")
    const [password , setPassword]= useState("")
    return <div className="bg-slate-900 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
             <div className="rounded-lg bg-zinc-50 w-80 text-center p-2 h-max px-4">
                <Heading label = {"Sign up"} />
                <SubHeading label={"Enter your infromation to create an account"} />
                <InputBox onChange ={(e)=>{
                    setFirstname(e.target.value)
                }} placeholder = "Carl" label = {"First Name"} />
                <InputBox onChange ={(e)=>{
                    setLastname(e.target.value)
                }} placeholder = "Doe" label = {"Last Name"} />
                <InputBox onChange ={(e)=>{
                    setEmail(e.target.value)
                }} placeholder = "Rajveer@gmail.com" label = {"Email"} />
                <InputBox onChange ={(e)=>{
                    setPassword(e.target.value)
                }} placeholder = "123@abc" label = {"Password"} />
                <div className="pt-4">
                    <Button onClick={async () =>{
                       const response = await axios.post("http://localhost:3000/api/v1/user/signup" , {
                            username,
                            firstname,
                            lastname,
                            password
                        });
                        localStorage.setItem("token", response.data.token);
                        navigate("/dashboard")
                    }} label={"Sign up"} />
                </div>
                <BottomWarning label ={"Already have an account?"} buttonText ={"sign in"} to = {"/signin"} />
             </div>
        </div>
    </div>
    }