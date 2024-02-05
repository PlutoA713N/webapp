const fs = require("fs");
const csv = require("csv-parser");

const matchesFilePath = "../src/data/matches.csv";
const deliveriesFilePath = "../src/data/deliveries.csv";

const convertCsvToJson = (csvData, outputJsonFile) => {
  const outputData = [];

  const writeStream = fs.createWriteStream(outputJsonFile, {
    encoding: "utf-8",
  });

  fs.createReadStream(csvData)
    .pipe(csv())
    .on("data", (data) => outputData.push(data))
    .on("end", () => {
      writeStream.write(JSON.stringify(outputData, null, 2), (err) => {
        if (err) {
          console.error("Error writing to file:", err);
        } else {
          console.log("JSON data created successfully");
        }
        writeStream.end();
      });
    });
};

convertCsvToJson(matchesFilePath, "../src/data/matches.json");
convertCsvToJson(deliveriesFilePath, "../src/data/deliveries.json");
