const fs = require("fs");
const matches = require("../data/matches.json");

const matchesPerYear = (matches) => {
  const outputFilePath = "../public/output/matchesPerYear.json";

  let resultMatchesObject = matches.reduce((accu, matches) => {
    if (matches.season in accu) {
      accu[matches.season] += 1;
    } else {
      accu[matches.season] = 1;
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
    console.log("Failed to write data:", err);
  });
};

matchesPerYear(matches);
