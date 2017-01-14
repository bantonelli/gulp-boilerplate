"use strict";

var fs = require('fs');
var reader = fs.createReadStream("./documents/mydoc.txt", {
    highWaterMark: 16 * 1024
});

let fileContents = "";
reader.on("data", (data) => {
    // console.log("data" + data);
    fileContents += data;
});

reader.on("end", () => {
    console.log(`Data found: ${fileContents}`);
});

// console.log(reader.__proto__.__proto__.__proto__.__proto__);
    // This is how far up the prototype chain the EventEmitter is...
