const fs = require("fs");
const deliveriesData = require("../data/deliveries.json");
const matchesData = require("../data/matches.json");

const strikeRateOfABatsmanForEachSeason = () => {
  const outputFilePath =
    "../public/output/strikeRateOfABatsmanForEachSeason.json";

 
    const idsObject = matchesData.reduce((acc, curr) => {
      acc[curr.season] = acc[curr.season] || [];
      acc[curr.season].push(curr.id);
      return acc;
    }, {});

    const object = Object.keys(idsObject).reduce((result, key) => {
      result[key] = {};
  
      deliveriesData.forEach((obj) => {
        if (idsObject[key].includes(obj.match_id)) {
          result[key][obj.batsman] = result[key][obj.batsman] || {
            runs: 0,
            balls: 0,
          };
  
          result[key][obj.batsman].runs += parseInt(obj.batsman_runs);
          result[key][obj.batsman].balls += 1;
        }
      });

      for (const batsman in result[key]) {
        if (result[key].hasOwnProperty(batsman)) {
          const { runs, balls } = result[key][batsman];
          result[key][batsman].strikeRate = +((runs / balls) * 100 || 0).toFixed(2);
        }
      }
  
      return result;
    }, {});


  const writeStream = fs.createWriteStream(outputFilePath);
  writeStream.write(JSON.stringify(object, null, 2));
  writeStream.end();

  writeStream.on("finish", () => {
    console.log("Output file created successfully");
  });

  writeStream.on("error", (err) => {
    console.log("Failed to write data:", err);
  });
};

strikeRateOfABatsmanForEachSeason();
