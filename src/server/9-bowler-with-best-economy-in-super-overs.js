const fs = require("fs");
const matches = require("../data/matches.json");
const deliveries = require("../data/deliveries.json");

const bowlerWithBestEconomy = (matches) => {
  const outputFilePath = "../public/output/bowlerWithBestEconomy.json";

  let newObject = {};

  for (let object of deliveries) {
    let isSuperOver = object.is_super_over;
    let bowler = object.bowler;
    let totalRuns = object.total_runs;

    if (isSuperOver == 1) {
      if (newObject.hasOwnProperty(bowler)) {
        newObject[bowler].runs += parseInt(totalRuns);
        newObject[bowler].balls += 1;
      } else {
        newObject[bowler] = {
          runs: parseInt(totalRuns),
          balls: 1,
        };
      }
    }
  }

  for (let key in newObject) {
    newObject[key].economy = newObject[key].runs / (newObject[key].balls / 6);
  }

  let keysArray = Object.keys(newObject);

  let sortedKeys = keysArray.sort(function (key1, key2) {
    return newObject[key1].economy - newObject[key2].economy;
  });

  let finalOutput = [sortedKeys[0], newObject[sortedKeys[0]]];

  const writeStream = fs.createWriteStream(outputFilePath);
  writeStream.write(JSON.stringify(finalOutput, null, 2));
  writeStream.end();

  writeStream.on("finish", () => {
    console.log("Output file created successfully");
  });

  writeStream.on("error", (err) => {
    console.log("Failed to write data:", err);
  });
};

bowlerWithBestEconomy(matches);
