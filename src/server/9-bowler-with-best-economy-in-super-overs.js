const fs = require("fs");
const matches = require("../data/matches.json");
const deliveries = require("../data/deliveries.json");

const bowlerWithBestEconomy = (matches) => {
  const outputFilePath = "../public/output/bowlerWithBestEconomy.json";

  try {
    const superOverDeliveries = deliveries.filter(
      (delivery) => delivery.is_super_over === "1"
    );

    const newObject = superOverDeliveries.reduce((acc, delivery) => {
      const bowler = delivery.bowler;
      const totalRuns = parseInt(delivery.total_runs);

      acc[bowler] = acc[bowler] || { runs: 0, balls: 0 };
      acc[bowler].runs += totalRuns;
      acc[bowler].balls += 1;

      return acc;
    }, {});

    Object.entries(newObject).forEach(([key, value]) => {
      value.economy = value.runs / (value.balls / 6);
    });

    const sortedEntries = Object.entries(newObject).sort(
      (entry1, entry2) => entry1[1].economy - entry2[1].economy
    );

    const finalOutput = [sortedEntries[0]];

    const writeStream = fs.createWriteStream(outputFilePath);
    writeStream.write(JSON.stringify(finalOutput, null, 2));
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

bowlerWithBestEconomy(matches);
