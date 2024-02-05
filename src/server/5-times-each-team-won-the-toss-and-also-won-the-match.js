const fs = require("fs");
const matches = require("../data/matches.json");

const timesEachTeamWontheTossAndWonTheMatch = (matches) => {
  let output = {};
  const outputFilePath =
    "../public/output/timesEachTeamWontheTossAndWonTheMatch.json";

  for (const match of matches) {
    const toss_winner = match["toss_winner"];
    const winner = match["winner"];

    if (winner != "" && toss_winner === winner) {
      output[winner] = output[winner] ? (output[winner] += 1) : 1;
    }
  }

  console.log(output);

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

timesEachTeamWontheTossAndWonTheMatch(matches);
