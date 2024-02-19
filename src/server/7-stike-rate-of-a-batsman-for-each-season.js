const fs = require("fs");
const deliveriesData = require("../data/deliveries.json");
const matchesData = require("../data/matches.json");

const strikeRateOfABatsmanForEachSeason = (batsman) => {
  const outputFilePath =
    "../public/output/strikeRateOfABatsmanForEachSeason.json";

  try {
    const calculateStrikeRateForSeason = (season) => {
      const batsmanDeliveries = deliveriesData.filter(
        (delivery) =>
          delivery.batsman === batsman &&
          matchesData.find(
            (match) =>
              match.id === delivery.match_id && match.season === season,
          ),
      );

      const totalRuns = batsmanDeliveries.reduce(
        (sum, delivery) => sum + parseInt(delivery.batsman_runs),
        0,
      );
      const totalBallsFaced = batsmanDeliveries.length;

      return totalBallsFaced > 0
        ? ((totalRuns / totalBallsFaced) * 100).toFixed(2)
        : 0;
    };

    const seasons = [...new Set(matchesData.map((match) => match.season))];

    const strikeRatesObject = {};
    seasons.forEach((season) => {
      const strikeRate = (strikeRatesObject[season] =
        calculateStrikeRateForSeason(season));
      if (strikeRate > 0) {
        strikeRatesObject[season] = strikeRate;
      }
    });

    const filteredBatsmanStrikeRates = Object.fromEntries(
      Object.entries(strikeRatesObject).filter(([key, value]) => value !== 0),
    );

    const strikeRate = { [batsman]: filteredBatsmanStrikeRates };

    const writeStream = fs.createWriteStream(outputFilePath);
    writeStream.write(JSON.stringify(strikeRate, null, 2));
    writeStream.end();

    writeStream.on("finish", () => {
      console.log("Output file created successfully");
    });

    writeStream.on("error", (err) => {
      throw err;
    });
  } catch (error) {
    console.log("An error occurred during processing:", error.message);
  } finally {
    console.log("Processing completed.");
  }
};

strikeRateOfABatsmanForEachSeason("V Kohli");
