import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import './App.css';

function App() {
	const [ data, setData ] = useState([]);
	var ENDPOINT = 'http://localhost:5000/';

	useEffect(
		() => {
			axios
				.get(ENDPOINT)
				.then((res) => {
					console.log(res.data);
					setData(res.data);
				})
				.catch((err) => {
					console.error(err);
				});
		},
		[ ENDPOINT ]
	);

	return (
		<div className="App">
			<div className="App-header">
				<BarChart
					width={400}
					height={500}
					data={data}
					margin={{
						top: 20,
						right: 30,
						left: 20,
						bottom: 5
					}}
				>
					<CartesianGrid strokeDasharray="4 4" />
					<XAxis dataKey="country" />
					<YAxis />
					<Legend />
					<Bar dataKey="confirmed" fill="#8884d8" barSize={50} />
					<Bar dataKey="deaths" fill="#82ca9d" barSize={50} />
					<Bar dataKey="recovered" fill="#c02727" barSize={50} />
				</BarChart>
			</div>
		</div>
	);
}

export default App;
