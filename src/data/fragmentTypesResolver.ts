const API_URL =
  "http://ec2-18-217-250-79.us-east-2.compute.amazonaws.com:41960/";
const fs = require("fs");
const nodeFetch = require("node-fetch");

nodeFetch(`${API_URL}/graphql`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    variables: {},
    operationName: "",
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `
  })
})
  .then(result => result.json())
  .then(result => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter(
      type => type.possibleTypes !== null
    );

    const result1 = { ...result };
    result1.data.__schema.types = filteredData;
    fs.writeFile("./fragmentTypes.json", JSON.stringify(result1.data), err => {
      if (err) {
        console.error("Error writing fragmentTypes file", err);
      } else {
        console.log("Fragment types successfully extracted!");
      }
    });
  });
