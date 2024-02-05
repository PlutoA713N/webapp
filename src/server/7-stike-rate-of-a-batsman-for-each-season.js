const fs = require("fs");
const deliveriesData = require("../data/deliveries.json");
const matchesData = require("../data/matches.json");

const strikeRateOfABatsmanForEachSeason = () => {
  const outputFilePath =
    "../public/output/strikeRateOfABatsmanForEachSeason.json";

  const idsObject = {};
  for (let i = 0; i < matchesData.length; i++) {
    const curr = matchesData[i];
    if (!idsObject[curr.season]) {
      idsObject[curr.season] = [curr.id];
    } else {
      idsObject[curr.season].push(curr.id);
    }
  }

  const object = {};

  for (const key in idsObject) {
    if (idsObject.hasOwnProperty(key)) {
      object[key] = {};

      for (let j = 0; j < deliveriesData.length; j++) {
        const obj = deliveriesData[j];
        if (idsObject[key].includes(obj.match_id)) {
          object[key][obj.batsman] = object[key][obj.batsman] || {
            runs: 0,
            balls: 0,
          };

          object[key][obj.batsman].runs += parseInt(obj.batsman_runs);
          object[key][obj.batsman].balls += 1;
        }
      }

      for (const batsman in object[key]) {
        if (object[key].hasOwnProperty(batsman)) {
          const { runs, balls } = object[key][batsman];
          object[key][batsman].strikeRate = +(
            (runs / balls) * 100 || 0
          ).toFixed(2);
        }
      }
    }
  }

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
