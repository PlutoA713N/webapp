const fs = require("fs");
const matches = require("../data/matches.json");

const matchesWonPerTeamPerYear = (matches) => {
  const outputFilePath = "../public/output/matchesWonPerTeamPerYear.json";

  let matchesWonPerTeam = matches.reduce((accu, match) => {
    if (accu[match.season] === undefined) {
      accu[match.season] = { [match.winner]: 0 };
    }
    if (match.winner in accu[match.season]) {
      accu[match.season][match.winner] += 1;
    } else {
      accu[match.season][match.winner] = 1;
    }
    return accu;
  }, {});

  const writeStream = fs.createWriteStream(outputFilePath);
  writeStream.write(JSON.stringify(matchesWonPerTeam, null, 2));
  writeStream.end();

  writeStream.on("finish", () => {
    console.log("Output file created successfully");
  });

  writeStream.on("error", (err) => {
    console.log("Failed to write data:", err);
  });
};

matchesWonPerTeamPerYear(matches);
