const express = require('express');
const axios = require('axios');
const router = express.Router();

var totalConfirmed = 0,
	totalDeaths = 0,
	totalRecovered = 0;

router.get('/', (req, res) => {
	axios.get('https://pomber.github.io/covid19/timeseries.json').then((response) => {
		var covidCount = response.data;
		var covidCountIndia = response.data.India;

		for (var country in covidCount) {
			if (covidCount.hasOwnProperty(country)) {
				var latestData = covidCount[country][covidCount[country].length - 1];
				totalConfirmed += latestData.confirmed;
				totalDeaths += latestData.deaths;
				totalRecovered += latestData.recovered;
			}
		}
		var covidCountTotal = {
			country: 'Total',
			confirmed: totalConfirmed,
			deaths: totalDeaths,
			recovered: totalRecovered
		};
		var indiaData = {
			country: 'India',
			confirmed: covidCountIndia[covidCountIndia.length - 1].confirmed,
			deaths: covidCountIndia[covidCountIndia.length - 1].deaths,
			recovered: covidCountIndia[covidCountIndia.length - 1].recovered
		};
		res.send([ indiaData, covidCountTotal ]);
	});
});

module.exports = router;
