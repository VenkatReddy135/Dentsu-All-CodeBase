import React from "react";
import { Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";
export default function Topics() {
	let { path, url } = useRouteMatch();

	return (
		<div>
			<h2>My Topics</h2>
			<ul className="navbar-nav mr-auto">
				<li>
					<Link to={`${url}/rendering`}>Rendering with React</Link>
				</li>
				<li>
					<Link to={`${url}/components`}>Components</Link>
				</li>
				<li>
					<Link to={`${url}/props-v-state`}>Props v. State</Link>
				</li>
				<li>
					<Link to={`${url}/keep-smiling`}>Keep Smiling</Link>
				</li>
			</ul>

			<Switch>
				<Route exact path={path}>
					<h3>Please select a topic.</h3>
				</Route>
				<Route path={`${path}/:topicId`}>
					<Topic />
				</Route>
			</Switch>
		</div>
	);
}

export function Topic() {
	let { topicId } = useParams();

	return (
		<div>
			<h3>{topicId}</h3>
			{topicId === "keep-smiling" && (
				<h1>
					😃 <br />Keep Learning
				</h1>
			)}
		</div>
	);
}
