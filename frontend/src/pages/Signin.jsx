import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export const Signin = ()=>{
    const navigate = useNavigate()
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    return <div className="bg-slate-900  h-screen flex justify-center">
        <div className = "flex flex-col justify-center">
            <div className = "bg-white rounded-lg w-80 text-center h-max px-4 ">
                <Heading label={"Signin"} />
                <SubHeading label={"Enter your credentials to access your account"} />
                <InputBox onChange={(e)=>{
                    setUsername(e.target.value)
                }} placeholder="harkirat@gmail.com" label={"Email"} />
                <InputBox onChange={(e)=>{
                    setPassword(e.target.value)
                }} placeholder="123456" label={"Password"} />
                <div className = "pt-4">
                    <Button onClick={async()=>{
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                            username,
                            password
                        })
                        localStorage.setItem("token" , response.data.token)
                        navigate("/dashboard")
                    }} label={"signin"} />
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText = {"sig up"} to={"/signup"}/>
            </div>
        </div>
    </div>
    }