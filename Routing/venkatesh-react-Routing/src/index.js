import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
// 1.Routers
ReactDOM.render(
	<React.StrictMode>
		<Router
			forceRefresh={false}
			basename="/todoapp"
			getUserConfirmation={(message, callback) => {
				let allow = window.confirm(message);
				callback(allow);
			}}>
			<App />
		</Router>
	</React.StrictMode>,
	document.getElementById("root"),
);
