const fs = require("fs");
const matches = require("../data/matches.json");
const deliveries = require("../data/deliveries.json");

const extraRunsConceededPerTeamInTheYear = (matches, year) => {
  const output = {};
  const outputFilePath =
    "../public/output/extraRunsConceededPerTeamInTheYear.json";

  try {
    const totalIds = matches
      .filter((match) => +match["season"] === year)
      .map((match) => match["id"]);

    deliveries.forEach((delivery) => {
      const matchId = delivery["match_id"];
      const bowling_team = delivery["bowling_team"];
      const extra_runs = +delivery["extra_runs"];

      if (totalIds.includes(matchId)) {
        output[bowling_team] = (output[bowling_team] || 0) + extra_runs;
      }
    });

    const writeStream = fs.createWriteStream(outputFilePath);
    writeStream.write(JSON.stringify(output, null, 2));
    writeStream.end();

    writeStream.on("finish", () => {
      console.log("Output file created successfully");
    });

    writeStream.on("error", (err) => {
      throw err; // Pass the error to the catch block
    });
  } catch (error) {
    console.log("An error occurred during processing:", error.message);
  } finally {
    console.log("Processing completed.");
  }
};

extraRunsConceededPerTeamInTheYear(matches, 2016);