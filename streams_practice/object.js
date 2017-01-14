"use strict";

var stream = require("stream");
const source = new stream.Readable({
    objectMode: true
});

source.push("WHOA");
source.push("blegh");
source.push({file: "file1.txt", length: 300});
source.push(null);


const transform = new stream.Transform({
    objectMode: true,
    transform: function (chunk, encoding, next) {
        this.push(`Transform: ${chunk.toString()}`);
        next();
    }
});

const dest = new stream.Writable({
    objectMode: true,
    write: function (chunk, encoding, next) {
        console.log(`Writing: ${chunk.toString()}`);
        next();
    }
});

source.pipe(transform).pipe(dest);
