import React, { lazy, Suspense } from "react";
import "./App.css";
import Header from "./components/Header";
import Content from "./components/Content";
// import About from "./components/About";
import { Switch, Route, Redirect } from "react-router-dom";
import Contact from "./components/Contact";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Projects from "./components/Projects";
import Topics from "./components/Topics";
import Project from "./components/Project";
import SidebarExample from "./components/Sidebar";
import AboutLazyLoading from "./components/AboutLazyLoading";
const About = lazy(() => import("./components/About"));
// 2.Route Matchers
function App() {
	// Get location
	// const location = window.location.pathname;
	// console.log(location);
	return (
		<div className="App">
			<Header />

			{/* Based on location particular component should render */}
			{/* {location === "/" && <Content />}
			{location === "/about" && <About />} */}

			{/* React Routing with Lazy Loading */}
			<Suspense fallback={<h1>Loading...</h1>}>
				<Switch>
					<Redirect from="/todoappv1" to="/todoappv2" />
					<Route path="/about">
						<About />
					</Route>
					<Route path="/about-lazy-load">
						<AboutLazyLoading />
					</Route>
					<Route path="/contact">
						<Contact />
					</Route>
					<PrivateRoute path="/dashboard" component={Dashboard} />
					<PrivateRoute path="/projects/:id" component={Project} />
					<PrivateRoute path="/projects" component={Projects} />
					<PrivateRoute path="/topics" component={Topics} />
					<Route path="/login">
						<Login />
					</Route>
					<PrivateRoute path="/menu" component={SidebarExample} />
					<Route path="/logout">
						<Redirect to="/login" />
					</Route>
					<Route path="/" exact>
						<Content />
					</Route>
					<Route path="*">
						<h1>404 Not Found!</h1>
					</Route>
				</Switch>
			</Suspense>
		</div>
	);
}
export default App;
