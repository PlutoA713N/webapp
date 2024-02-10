const fs = require("fs");
const matches = require("../data/matches.json");

const matchesPerYear = (matches) => {
  const outputFilePath = "../public/output/matchesPerYear.json";

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
      throw err; // Pass the error to the catch block
    });
  } catch (error) {
    console.log("An error occurred during processing:", error.message);
  } finally {
    console.log("Processing completed.");
  }
};

matchesPerYear(matches);