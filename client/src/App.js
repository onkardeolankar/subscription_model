import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Nav from "./components/Nav";
import toast, { Toaster } from 'react-hot-toast';
import "./App.css";

function App() {
	return (
		<>
    <Nav />
    <Toaster position="botton-right" toastOptions={{
      duration : 2000,
    }} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</>
	);
}

export default App;
