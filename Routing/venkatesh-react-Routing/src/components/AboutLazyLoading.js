import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";

const Loading = () => (
	<div>
		<h1>Loading...</h1>
	</div>
);

const Country = ({ name }) => <p>{name}</p>;
export default function AboutLazyLoading(props) {
	const [ data, setData ] = useState([]);
	useEffect(() => {
		fetch("https://covid19.mathdro.id/api/countries")
			.then((response) => response.json())
			.then((data) => setData(data.countries))
			.catch((error) => console.log(error));
	}, []);
	return (
		<div style={{ backgroundColor: "#282c34", overflow: "auto" }}>
			<h1>About</h1>
			<p>My name is Venkatesh Mogili. I'm a Full Stack Developer.</p>
			<h1>👨‍💻</h1>
			{data.map((country) => (
				<LazyLoad offset={[ -50, 100 ]} key={country.name} placeholder={<Loading />}>
					<Country key={country.name} {...country} />
				</LazyLoad>
			))}
		</div>
	);
}
