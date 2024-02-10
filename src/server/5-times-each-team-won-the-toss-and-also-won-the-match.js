const fs = require("fs");
const matches = require("../data/matches.json");

const timesEachTeamWontheTossAndWonTheMatch = (matches) => {
  const outputFilePath =
    "../public/output/timesEachTeamWontheTossAndWonTheMatch.json";

  try {
    const wonTossAndMatch = matches.reduce((accu, match) => {
      if (match.toss_winner === match.winner) {
        if (match.toss_winner in accu) {
          accu[match.toss_winner] += 1;
        } else {
          accu[match.toss_winner] = 1;
        }
      }
      return accu;
    }, {});

    const writeStream = fs.createWriteStream(outputFilePath);
    writeStream.write(JSON.stringify(wonTossAndMatch, null, 2));
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

timesEachTeamWontheTossAndWonTheMatch(matches);