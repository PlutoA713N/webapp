const fs = require("fs");
const matches = require("../data/matches.json");
const deliveries = require("../data/deliveries.json");

const matchesPerYear = (matches) => {
  const outputFilePath = "src/public/output/matchesPerYear.json";

  try {
    let resultMatchesObject = matches.reduce((accu, match) => {
      if (match.season in accu) {
        accu[match.season] += 1;
      } else {
        accu[match.season] = 1;
      }
      return accu;
    }, {});

    const writeStream = fs.createWriteStream(outputFilePath);
    writeStream.write(JSON.stringify(resultMatchesObject, null, 2));
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


const matchesWonPerTeamPerYear = (matches) => {
    const outputFilePath = "src/public/output/matchesWonPerTeamPerYear.json";
  
    try {
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
        throw err; // Pass the error to the catch block
      });
    } catch (error) {
      console.log("An error occurred during processing:", error.message);
    } finally {
      console.log("Processing completed.");
    }
  };
  


  const extraRunsConceededPerTeamInTheYear = (matches, year) => {
    const output = {};
    const outputFilePath = "src/public/output/extraRunsConceededPerTeamInTheYear.json"  
    try {
      const totalIds = matches
        .filter((match) => +match["season"] === year)
        .map((match) => match["id"]);
  
      deliveries.forEach((delivery) => {
        const matchId = delivery["match_id"];
        const bowling_team = delivery["bowling_team"];
        const extra_runs = +delivery["extra_runs"];
  
        if (totalIds.includes(matchId)) {
          output[bowling_team] = (output[bowling_team] || 0) + extra_runs;
        }
      });
  
      const writeStream = fs.createWriteStream(outputFilePath);
      writeStream.write(JSON.stringify(output, null, 2));
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
  



const top10EconomicalBowlersInTheYear = (matches, year) => {
  const outputFilePath = "src/public/output/top10EconomicalBowlersInTheYear.json";

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
        const economy = +((runs / balls) * 6).toFixed(2);
        return [key, economy];
      })
    );

    const bowlersArray = Object.entries(economyOfBowlers)
    
    const sortedBowlersArray = bowlersArray.sort((bowlerA, bowlerB) => {
      const economyA = bowlerA[1]
      const economyB = bowlerB[1]
      return economyA - economyB
    });

    const top10Bowlers = Object.fromEntries(sortedBowlersArray.slice(0, 10));

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

 

const timesEachTeamWontheTossAndWonTheMatch = (matches) => {
    const outputFilePath =
      "src/public/output/timesEachTeamWontheTossAndWonTheMatch.json";
  
    try {
      const wonTossAndMatch = matches.reduce((accu, match) => {
        if (match.toss_winner === match.winner) {
          if (match.toss_winner in accu) {
            accu[match.toss_winner] += 1;
          } else {
            accu[match.toss_winner] = 1;
          }
        }
        return accu;
      }, {});
  
      const writeStream = fs.createWriteStream(outputFilePath);
      writeStream.write(JSON.stringify(wonTossAndMatch, null, 2));
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
  
  

  const playerOfTheMatchAwardsForEachSeason = (matches) => {
    const outputFilePath =
      "src/public/output/PlayerOfTheMatchAwardsForEachSeason.json"
    try {
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
        throw err; // Pass the error to the catch block
      });
    } catch (error) {
      console.log("An error occurred during processing:", error.message);
    } finally {
      console.log("Processing completed.");
    }
};



const strikeRateOfABatsmanForEachSeason = (batsman, deliveriesData, matchesData) => {
    const outputFilePath = "src/public/output/strikeRateOfABatsmanForEachSeason.json"  
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
  

  
  const highestTimesPlayerDismissedByAnotherPlayer = (matches) => {
    try {
      const outputFilePath = "src/public/output/highestTimesPlayerDismissedByAnotherPlayer.json" 
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
  
  
      const writeStream = fs.createWriteStream(outputFilePath);
      writeStream.write(JSON.stringify(result, null, 2));
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
  
  
  const bowlerWithBestEconomy = (matches) => {
    const outputFilePath = "src/public/output/bowlerWithBestEconomy.json";
  
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
  
  
      const topBowler = sortedEntries[0];
  
      const bestBowlerInObj = {
        [topBowler[0]] : topBowler[1],
      }
  
      const writeStream = fs.createWriteStream(outputFilePath);
      writeStream.write(JSON.stringify(bestBowlerInObj, null, 2));
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


module.exports = {
    matchesPerYear,
    matchesWonPerTeamPerYear,
    extraRunsConceededPerTeamInTheYear,
    top10EconomicalBowlersInTheYear,
    timesEachTeamWontheTossAndWonTheMatch,
    playerOfTheMatchAwardsForEachSeason,
    strikeRateOfABatsmanForEachSeason,
    highestTimesPlayerDismissedByAnotherPlayer,
    bowlerWithBestEconomy,
  };   