"use strict";

var vfs = require('vinyl-fs');
var stream = require('stream');
var fs = require('fs');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

const basicPlugin = new stream.Transform({
    objectMode: true,
    transform: function (file, encoding, next) {
        // console.log(file);
        const contents = file.contents.toString();       

    // Accessible if not converting using vinyl-buffer 
        // console.log(file.contents._readableState.buffer);     

        file.contents = new Buffer(contents.replace(/\w/g, "BLAH "));    
        
    // This throws error - file.contents has to be buffer or stream. 
        // file.contents = contents.replace(/\w/g, "Blah");

    // We have to push the vinyl file back onto the stream 
        // This should happen after we transform data. 
        this.push(file);
        next();
    }
});

function replaceContents (file, string) {
    file.contents = new Buffer(string);
    return file;
}
const concatPlugin = new stream.Transform({
    objectMode: true,
    transform: function (file, encoding, next) {
        this.outputString += file.contents.toString();
        this.file = file;        
        next();
    },
    flush: function (cb) {
        var indexEnd = this.file.path.lastIndexOf('/');
        this.file.path = this.file.path.substring(0, indexEnd) + '/output.js';
        this.push(replaceContents(this.file, this.outputString));
        console.log(this.file.path);
        cb();
    }
});
// const changeName = new stream.Transform({
//     objectMode: true,
// })

// Copy files using vfs 
vfs.src("./src/**/*.js")
    .pipe(buffer())
    .pipe(concatPlugin)
    .pipe(vfs.dest("./dist"));

// This will throw an error.
    // Because we are trying to pipe non-vinyl non-object stream
// fs.createReadStream("./docs/doc1.txt")
//     .pipe(vfs.dest('./dist'));

// With additional metadata WE CAN pipe from normal read stream.
// All vfs files need filename as well as object based filestream. 
fs.createReadStream("./docs/doc1.txt")
    // changes to vinyl object and gives a filename property 
    .pipe(source('blablabla.txt'))
    // At this point we still have streaming data 
    // So we have to convert to buffer mode to use basicPlugin
    .pipe(buffer())
    // data is now converted to buffer so we can pipe to basicPlugin
    .pipe(basicPlugin) 
    // pipe to dest to write output file. 
    .pipe(vfs.dest('./dist'));