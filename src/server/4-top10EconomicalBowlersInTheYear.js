const fs = require("fs");
const matches = require("../data/matches.json");
const deliveries = require("../data/deliveries.json");

const top10EconomicalBowlersInTheYear = (matches, year) => {
  const outputFilePath = "../public/output/top10EconomicalBowlersInTheYear.json";

  try {
    const totalIds = matches
      .filter((match) => +match.season === year)
      .map((match) => match.id);

    const obj = deliveries.reduce((acc, delivery) => {
      if (totalIds.includes(delivery.match_id)) {
        const bowler = delivery.bowler;
        const runs = parseInt(delivery.total_runs);
        const balls = 1;

        acc[bowler] = acc[bowler] || { run: 0, balls: 0 };
        acc[bowler].run += runs;
        acc[bowler].balls += balls;
      }
      return acc;
    }, {});

    const economyOfBowlers = Object.fromEntries(
      Object.entries(obj).map(([key, value]) => {
        const runs = value.run;
        const balls = value.balls;
        const economy = (runs / balls) * 6;
        return [key, economy];
      })
    );

    const sortedBowlers = Object.keys(economyOfBowlers).sort(
      (a, b) => economyOfBowlers[a] - economyOfBowlers[b]
    );

    const top10Bowlers = sortedBowlers.slice(0, 10);

    const writeStream = fs.createWriteStream(outputFilePath);
    writeStream.write(JSON.stringify(top10Bowlers, null, 2));
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

top10EconomicalBowlersInTheYear(matches, 2015);