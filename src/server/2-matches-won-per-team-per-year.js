const fs = require("fs");
const matches = require("../data/matches.json");

const matchesWonPerTeamPerYear = (matches) => {
  const output = {};
  const outputFilePath = "../public/output/matchesWonPerTeamPerYear.json";

  for (const match of matches) {
    const season = match["season"];
    const winner = match["winner"];

    !output[season]
      ? (output[season] = {})
      : winner !== undefined && winner !== ""
        ? (output[season][winner] = output[season][winner]
            ? output[season][winner] + 1
            : 1)
        : null;
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

matchesWonPerTeamPerYear(matches);
