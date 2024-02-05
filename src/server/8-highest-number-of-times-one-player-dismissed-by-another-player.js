const fs = require("fs");
const matches = require("../data/matches.json");
const deliveries = require("../data/deliveries.json");

const highestTimesPlayerDismissedByAnotherPlayer = (matches) => {
  const outputFilePath =
    "../public/output/highestTimesPlayerDismissedByAnotherPlayer.json";

    const dismissedCounts = deliveries.reduce((acc, delivery) => {
      const dismissalType = delivery.dismissal_kind;
      const dismissedPlayer = delivery.player_dismissed;
      const bowler = delivery.bowler;
  
      if (dismissalType !== "run out" && dismissedPlayer && bowler) {
        const key = `${dismissedPlayer}-${bowler}`;
        acc[key] = (acc[key] || 0) + 1;
      }
      return acc;
    }, {});
  
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
