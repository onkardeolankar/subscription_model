import React,{useState,useContext} from "react";
import Input from "../components/input";
import Button from "../components/Button";
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context";

const Login =()=>{
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const[state,setState] = useContext(UserContext);
    const navigate = useNavigate();
    const handleClick = async (e)=>{
        console.log(email,password);
        try{
            e.preventDefault();
            const {data} = await axios.post("http://localhost:8000/api/login",{
                email,password
            },
            );

            if(data.error){
                toast.error(data.error);
            }else{
                setEmail("");
                setPassword("");
                setState(data);
                // history.push("/");
                localStorage.setItem('auth',JSON.stringify(data));
                navigate("/");
            }


        }catch (err){
            console.log(err);
            toast.error("Something went wrong.Try again")
        }
    };
    return(
        <div className="d-flex justify-content-center" style={{height:'80vh'}}>
            <div className="container align-items-center d-flex">
                <div className="row col-md-6 offset-md-3 text-center">
                    <h1 className="pt-5 fw-bold">Login</h1>
                    <p className="lead pb-4">Access your subscriptions anytime anywhere</p>
                    <div className="form-label">
                        <Input label="Email" type="text" value={email} setValue={setEmail} />
                        <Input label="Password" type="password" value={password} setValue={setPassword} /> 
                        <div className="d-grid">
                        <Button handleClick={handleClick} type="danger" text="Login" size="sm"/>
                        </div>
                        
                    </div>
                </div>
                <div className="row">
                    <pre>
                        {/* {JSON.stringify({name,email,password})} */}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default Login;