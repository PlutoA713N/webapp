const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const express = require('express');
const cors = require('cors');
const fs = require('fs'); 

const matches = require("../data/matches.json");
const deliveries = require("../data/deliveries.json");
const cricketAnalyzer = require('./ipl.js');

const app = express();
console.log(process.env.PORT)
const PORT = process.env.PORT || 5000;

async function analyzeCricketData() {
    try {
        await cricketAnalyzer.matchesPerYear(matches);
        await cricketAnalyzer.matchesWonPerTeamPerYear(matches);
        await cricketAnalyzer.extraRunsConceededPerTeamInTheYear(matches, 2016);
        await cricketAnalyzer.top10EconomicalBowlersInTheYear(matches, 2015);
        await cricketAnalyzer.timesEachTeamWontheTossAndWonTheMatch(matches);
        await cricketAnalyzer.playerOfTheMatchAwardsForEachSeason(matches);
        await cricketAnalyzer.strikeRateOfABatsmanForEachSeason("V Kohli", deliveries, matches);
        await cricketAnalyzer.highestTimesPlayerDismissedByAnotherPlayer(matches);
        await cricketAnalyzer.bowlerWithBestEconomy(matches);
    } catch (error) {
        console.error('An error occurred during cricket data analysis:', error.message);
    }
}

app.use(cors());

const outputDir = path.join(__dirname, '../public/output/');
app.use(express.static(outputDir));

app.use(express.static(path.join(__dirname, '../public')))

// Serve Client side
// app.get('/', (req, res) => {
//     const indexPath = path.join(__dirname, '../public', 'index.html');
//     res.status(200).sendFile(indexPath);
//     console.log(indexPath)
// });


app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await analyzeCricketData();
});
