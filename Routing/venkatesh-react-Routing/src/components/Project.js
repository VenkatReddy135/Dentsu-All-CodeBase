import React from "react";
import { Link, useParams } from "react-router-dom";

export default function Project() {
	const { id } = useParams();
	return (
		<div>
			<h1>My Projects</h1>
			<nav className="navbar navbar-expand-lg">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item active">
						<Link to="/" className="nav-link text-info rounded">
							Home /{" "}
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/projects" className="nav-link text-info rounded">
							Projects /
						</Link>
					</li>
					<li className="nav-item">
						<Link to={`/projects/${id}`} className="nav-link text-info rounded">
							{id}
						</Link>
					</li>
				</ul>
			</nav>
			<h1>Project ID: {id}</h1>
		</div>
	);
}
