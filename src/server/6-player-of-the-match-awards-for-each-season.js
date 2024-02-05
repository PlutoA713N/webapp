const fs = require("fs");
const matches = require("../data/matches.json");

const playerOfTheMatchAwardsForEachSeason = (matches) => {
  const outputFilePath =
    "../public/output/playerOfTheMatchAwardsForEachSeason.json";

  let playerOfTheMatchPerSeason = matches.reduce((accu, match) => {
    if (match.season in accu) {
      if (match.player_of_match in accu[match.season]) {
        accu[match.season][match.player_of_match] += 1;
      } else {
        accu[match.season][match.player_of_match] = 1;
      }
    } else {
      accu[match.season] = {};
      accu[match.season][match.player_of_match] = 1;
    }
    return accu;
  }, {});

  const topPlayerForEachSeason = Object.keys(playerOfTheMatchPerSeason).reduce(
    (result, season) => {
      result[season] = Object.fromEntries(
        Object.entries(playerOfTheMatchPerSeason[season])
          .sort((a, b) => b[1] - a[1])
          .slice(0, 1),
      );

      return result;
    },
    {},
  );

  const writeStream = fs.createWriteStream(outputFilePath);
  writeStream.write(JSON.stringify(topPlayerForEachSeason, null, 2));
  writeStream.end();

  writeStream.on("finish", () => {
    console.log("Output file created successfully");
  });

  writeStream.on("error", (err) => {
    console.log("Failed to write data:", err);
  });
};

playerOfTheMatchAwardsForEachSeason(matches);
