import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthRoute from "./components/routes/AuthRoute";
import Nav from "./components/Nav";
import toast, { Toaster } from 'react-hot-toast';
import "./App.css";
import StripeSuccess from "./pages/success";
import StripeCancel from "./pages/cancel";

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
				<Route path="/stripe/success" element={<StripeSuccess />} />
				<Route path="/stripe/cancel" element={<StripeCancel />} />
			</Routes>
		</>
	);
}

export default App;
