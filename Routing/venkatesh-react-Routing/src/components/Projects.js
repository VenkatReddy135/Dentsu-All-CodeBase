import React, { useState } from "react";
import { Link, Prompt, useHistory, useRouteMatch } from "react-router-dom";

export default function Projects() {
	const [ projectId, setProjectId ] = useState("");
	let match = useRouteMatch();
	let history = useHistory();
	const redirect = (e) => {
		e.preventDefault();
		history.push(`${match.url}/${projectId}`);
	};
	return (
		<div>
			<h1>My Projects</h1>
			<nav className="navbar navbar-expand-lg">
				<Prompt when={projectId.length > 0} message="Are you want to leave this page?" />
				<ul className="navbar-nav mr-auto">
					<li className="nav-item active">
						<Link to={`${match.url}/chat-application`} title="Chat app" className="nav-link text-primary rounded">
							Chat App
						</Link>
					</li>
					<li className="nav-item">
						<Link to={`${match.url}/ecommerce-application`} className="nav-link text-info rounded">
							ECommerce App
						</Link>
					</li>
				</ul>
			</nav>
			<form onSubmit={redirect}>
				<input type="text" value={projectId} onChange={(e) => setProjectId(e.target.value)} />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
