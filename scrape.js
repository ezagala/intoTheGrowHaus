const fs = require('fs');
const http = require('http');
const cheerio = require('cheerio')

http.createServer(function (req, res) {
fs.readFile('sampleData.html', function (err, data) {
    const $ = cheerio.load(data);

    $('div[align="center"]').each(function(i, element) {

        const target = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr').children('td').html(); 

    //    console.log("This is ", $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr').children('td').html())

       if (target !== null){
           target.toString().trim(); 
        //    console.log("Here's the target", target); 
           $(this).addClass('transaction'); 
           console.log("This' attributes", $(this).attr())

       }
        // if ( target === "<strong>Trans: </strong>11826" ){
        //     console.log("This' attributes", $(this).attr());
        //    return $(this).addClass('transaction'); 
             
        // }
    })

    res.write($.html());
    res.end(); 
});

}).listen(8080);
