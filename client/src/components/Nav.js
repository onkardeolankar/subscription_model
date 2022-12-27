import React,{useContext} from "react";
import { Link, useNavigate,useState } from "react-router-dom";
import {isAuth} from "../utis/functions";
import { UserContext } from "../context";



const Nav = () => {
const[state,setState] = useContext(UserContext);
const navigate=useNavigate();

	const logout =()=>{
		setState({user:{}, token: ""});
		localStorage.removeItem('auth');
		navigate('/login');
	}

	return (
		<ul className="nav border">
			<li className="nav-item">
				<Link className="nav-link active" aria-current="page" to="/">
					Home
				</Link>
			</li>
			{state && state.token ? (
				<>
				<li className="nav-item">
				<span onClick={logout} className="nav-link">
					Logout
				</span>
			</li>
				</>
				): (
					<> 
					<li className="nav-item">
				<Link className="nav-link" to="/register">
					Sign Up
				</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/login">
					Login
				</Link>
			</li>
					</>
				)
			}
			
		</ul>
	);
};

export default Nav;
