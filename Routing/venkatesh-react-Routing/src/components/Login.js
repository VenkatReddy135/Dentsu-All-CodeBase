import React, { useState } from "react";
import { Redirect } from "react-router-dom";

export default function Login() {
	const [ username, setUsername ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ isLoggedin, setIsLoggedIn ] = useState(localStorage.getItem("loggedin"));
	const login = (e) => {
		e.preventDefault();
		if (username === "admin" && password === "admin") {
			localStorage.setItem("loggedin", 1);
			setIsLoggedIn(1);
		} else {
			alert("Wrong username/password");
		}
	};
	return (
		<div>
			<h1 className="mt-5">Login Area</h1>
			<form onSubmit={login}>
				<input
					type="text"
					className="form-control-lg m-4 border"
					placeholder="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<br />
				<input
					type="password"
					className="form-control-lg m-4 border"
					placeholder="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<br />
				<button type="submit" className="btn btn-primary">
					Login
				</button>
				{isLoggedin !== null && <Redirect to="/dashboard" />}
			</form>
		</div>
	);
}
