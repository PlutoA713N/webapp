const fs = require("fs");
const matches = require("../data/matches.json");
const deliveries = require("../data/deliveries.json");

const highestTimesPlayerDismissedByAnotherPlayer = (matches) => {
  const outputFilePath =
    "../public/output/highestTimesPlayerDismissedByAnotherPlayer.json";

  const dismissedCounts = {};

  for (let i = 0; i < deliveries.length; i++) {
    const delivery = deliveries[i];
    const dismissalType = delivery.dismissal_kind;
    const dismissedPlayer = delivery.player_dismissed;
    const bowler = delivery.bowler;

    if (dismissalType !== "run out" && dismissedPlayer && bowler) {
      const key = `${dismissedPlayer}-${bowler}`;

      if (dismissedCounts[key]) {
        dismissedCounts[key]++;
      } else {
        dismissedCounts[key] = 1;
      }
    }
  }

  let maxDismissals = 0;
  let maxDismissedPair;

  for (const key in dismissedCounts) {
    if (dismissedCounts[key] > maxDismissals) {
      maxDismissals = dismissedCounts[key];
      maxDismissedPair = key;
    }
  }

  const result = {
    maxDismissed: `${maxDismissedPair.split("-")[0]}`,
    Bowler: `${maxDismissedPair.split("-")[1]}`,
    maxDismissals: maxDismissals,
  };

  console.log(result);

  const writeStream = fs.createWriteStream(outputFilePath);
  writeStream.write(JSON.stringify(result, null, 2));
  writeStream.end();

  writeStream.on("finish", () => {
    console.log("Output file created successfully");
  });

  writeStream.on("error", (err) => {
    console.log("Failed to write data:", err);
  });
};

highestTimesPlayerDismissedByAnotherPlayer(matches);
