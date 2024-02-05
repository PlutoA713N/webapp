const fs = require("fs");
const matches = require("../data/matches.json");
const deliveries = require("../data/deliveries.json");

const top10EconomicalBowlersInTheYear = (matches, year) => {
  let output = {};
  output[year] = {};
  const outputFilePath =
    "../public/output/top10EconomicalBowlersInTheYear.json";

  let totalIds = [];

  for (const match of matches) {
    const seasonYear = match["season"];
    const id = match["id"];

    if (+seasonYear === year) {
      totalIds.push(id);
    }
  }

  const obj = {};
  for (let i = 0; i < deliveries.length; i++) {
    if (totalIds.includes(deliveries[i].match_id)) {
      if (obj[deliveries[i].bowler]) {
        (obj[deliveries[i].bowler].run += parseInt(deliveries[i].total_runs)),
          (obj[deliveries[i].bowler].balls += 1);
      } else {
        obj[deliveries[i].bowler] = {
          run: parseInt(deliveries[i].total_runs),
          balls: 1,
        };
      }
    }
  }
  const economyOfBowlers = {};

  for (const objects in obj) {
    let runs = obj[objects].run;
    let balls = obj[objects].balls;

    let economy = (runs / balls) * 6;

    economyOfBowlers[objects] = economy;
  }

  const sortedBowlers = Object.keys(economyOfBowlers).sort((a, b) => {
    return economyOfBowlers[a] - economyOfBowlers[b];
  });

  const top10Bowlers = sortedBowlers.slice(0, 10);
  console.log(top10Bowlers);

  const writeStream = fs.createWriteStream(outputFilePath);
  writeStream.write(JSON.stringify(top10Bowlers, null, 2));
  writeStream.end();

  writeStream.on("finish", () => {
    console.log("Output file created successfully");
  });

  writeStream.on("error", (err) => {
    console.log("Failed to write data:", err);
  });
};

top10EconomicalBowlersInTheYear(matches, 2015);
