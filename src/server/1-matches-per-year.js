const fs = require("fs");
const matches = require("../data/matches.json");

const matchesPerYear = (matches) => {
  const matchesPlayedPerYear = {};
  const outputFilePath = "../public/output/matchesPerYear.json";

  for (const match of matches) {
    matchesPlayedPerYear[match.season] = matchesPlayedPerYear[match.season]
      ? (matchesPlayedPerYear[match.season] += 1)
      : 1;
  }

  const writeStream = fs.createWriteStream(outputFilePath);
  writeStream.write(JSON.stringify(matchesPlayedPerYear, null, 2));
  writeStream.end();

  writeStream.on("finish", () => {
    console.log("Output file created successfully");
  });

  writeStream.on("error", (err) => {
    console.log("Failed to write data:", err);
  });
};

matchesPerYear(matches);
