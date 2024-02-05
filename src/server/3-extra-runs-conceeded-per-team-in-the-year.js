const fs = require("fs");
const matches = require("../data/matches.json");
const deliveries = require("../data/deliveries.json");

const extraRunsConceededPerTeamInTheYear = (matches, year) => {
  const output = {};
  const outputFilePath =
    "../public/output/extraRunsConceededPerTeamInTheYear.json";

  let totalIds = [];

  for (const match of matches) {
    const seasonYear = match["season"];
    const id = match["id"];

    if (+seasonYear === year) {
      totalIds.push(id);
    }
  }

  for (const delivery of deliveries) {
    const matchId = delivery["match_id"];
    const bowling_team = delivery["bowling_team"];
    const extra_runs = delivery["extra_runs"];

    if (totalIds.includes(matchId)) {
      output[bowling_team]
        ? (output[bowling_team] += +extra_runs)
        : (output[bowling_team] = +extra_runs);
    }
  }

  const writeStream = fs.createWriteStream(outputFilePath);
  writeStream.write(JSON.stringify(output, null, 2));
  writeStream.end();

  writeStream.on("finish", () => {
    console.log("Output file created successfully");
  });

  writeStream.on("error", (err) => {
    console.log("Failed to write data:", err);
  });
};

extraRunsConceededPerTeamInTheYear(matches, 2016);
