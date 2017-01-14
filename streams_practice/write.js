"use strict";

var fs = require('fs');
var http = require('http');
var Transform = require('stream').Transform;

const basicTransform = new Transform({
    transform: function (chunk, encoding, next) {
    // We only loaded in one chunk so only one BLEGH 
        // With a bigger file it will do multiple BLEGH's
        // this.push("BLEGH");
        const text = chunk.toString();
        // Change H in document to J. 
        this.push(text.replace(/H/g, "J"));
        next();
    }
})

const server = http.createServer((req, res) => {
    const filestream = fs.createReadStream('./documents/mydoc.txt');
    // Pipe 'filestream' (readable stream) to response stream.
    filestream
        .pipe(basicTransform)
        .pipe(res);
    // res.write("Blegh...");
    // res.end(" Whoa!");
});

server.listen(3000);