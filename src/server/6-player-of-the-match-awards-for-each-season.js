const fs = require("fs");
const matches = require("../data/matches.json");

const playerOfTheMatchAwardsForEachSeason = (matches) => {
  let players_for_each_season = {};

  const outputFilePath =
    "../public/output/playerOfTheMatchAwardsForEachSeason.json";

  for (const match of matches) {
    const player_of_match = match["player_of_match"];
    const season = match["season"];

    if (!players_for_each_season[season]) {
      players_for_each_season[season] = {};
    }

    players_for_each_season[season][player_of_match] = !players_for_each_season[
      season
    ][player_of_match]
      ? 1
      : (players_for_each_season[season][player_of_match] += 1);
  }

  for (const season in players_for_each_season) {
    players_for_each_season[season] = Object.fromEntries(
      Object.entries(players_for_each_season[season])
        .sort((a, b) => b[1] - a[1])
        .slice(0, 1), // Sort in descending order of count
    );
  }

  const writeStream = fs.createWriteStream(outputFilePath);
  writeStream.write(JSON.stringify(players_for_each_season, null, 2));
  writeStream.end();

  writeStream.on("finish", () => {
    console.log("Output file created successfully");
  });

  writeStream.on("error", (err) => {
    console.log("Failed to write data:", err);
  });
};

playerOfTheMatchAwardsForEachSeason(matches);
