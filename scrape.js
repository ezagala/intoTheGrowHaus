const fs = require('fs');
const http = require('http');
const cheerio = require('cheerio')

fs.readFile('sampleData.html', function (err, data) {
    const $ = cheerio.load(data);

    



});


