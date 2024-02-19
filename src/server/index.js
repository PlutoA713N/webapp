const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const PORT = 3000

const fs = require("fs");
const matches = require("../data/matches.json");
const deliveries = require("../data/deliveries.json");

const cricketAnalyzer = require('./ipl.js'); 

cricketAnalyzer.matchesPerYear(matches);
cricketAnalyzer.matchesWonPerTeamPerYear(matches);
cricketAnalyzer.extraRunsConceededPerTeamInTheYear(matches, 2016);
cricketAnalyzer.top10EconomicalBowlersInTheYear(matches, 2015);
cricketAnalyzer.timesEachTeamWontheTossAndWonTheMatch(matches);
cricketAnalyzer.playerOfTheMatchAwardsForEachSeason(matches);
cricketAnalyzer.strikeRateOfABatsmanForEachSeason("V Kohli");
cricketAnalyzer.highestTimesPlayerDismissedByAnotherPlayer(matches);
cricketAnalyzer.bowlerWithBestEconomy(matches);


app.use(cors())

const outputDir = path.join(__dirname, '../public/output/');
app.use(express.static(outputDir));


app.get('/', (req, res) => {
    res.send('Output files are being served!');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})