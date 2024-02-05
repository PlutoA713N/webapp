const fs = require("fs");
const matches = require("../data/matches.json");

const timesEachTeamWontheTossAndWonTheMatch = (matches) => {
  const outputFilePath =
    "../public/output/timesEachTeamWontheTossAndWonTheMatch.json";

    wonTossAndMatch = matches.reduce((accu,match)=>{
      if (match.toss_winner === match.winner) {
          if (match.toss_winner in accu) {
              accu[match.toss_winner] += 1;
          } else {
              accu[match.toss_winner] = 1;
          }
      }
      return accu;
  },{})


  console.log(output);

  const writeStream = fs.createWriteStream(outputFilePath);
  writeStream.write(JSON.stringify(wonTossAndMatch, null, 2));
  writeStream.end();

  writeStream.on("finish", () => {
    console.log("Output file created successfully");
  });

  writeStream.on("error", (err) => {
    console.log("Failed to write data:", err);
  });
};

timesEachTeamWontheTossAndWonTheMatch(matches);
