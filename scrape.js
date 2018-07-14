const fs = require('fs');
const http = require('http');
const cheerio = require('cheerio')

http.createServer(function (req, res) {
    fs.readFile('sampleData.html', function (err, data) {
        const $ = cheerio.load(data);

        // Iterate through divs of interest and add transaction class
        $('div[align="center"]').each(function (i, element) {

            const target = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr').children('td').html();

            // If the elements are the ones intended (in this case just not null)
            if (target !== null) {
                $(this).addClass('transaction');
            }
        })

        // Loop through each transation
        $(".transaction").each(function(i, element){
            // Transaction that will be push to the DB
            const transaction = {}; 

            // Paths for Transaction id, date and customer 
            const targetTrans = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr');
            const transID = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr').children('td[width="95"]'); 
            const date = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr').children('td[width="155"]')
            const customer = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr').children('td[width="118"]')

            // Paths for item descriptions, accommodating for retail keys
            const itemName = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr[style="color: #000000"]').children('td[align="left"]'); 
            const itemNameOverRetail = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr[style="color: #0000FF"]').children('td[align="left"]'); 
            const itemNameVoid = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr[style="color: #FF0000"]').children('td[align="left"]'); 
            const itemNameBelowRetail = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr[style="color: #009900"]').children('td[align="left"]'); 

            // Paths for item quantities, accommodating for retail keys
            const itemQuatity = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr[style="color: #000000"]').children('td[align="right"]'); 
            const itemQuatityOverRetail = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr[style="color: #0000FF"]').children('td[align="right"]'); 
            const itemQuatityVoid = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr[style="color: #FF0000"]').children('td[align="right"]'); 
            const itemQuatityBelowRetail = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr[style="color: #009900"]').children('td[align="right"]'); 

            // Paths for item sub-totals, accommodating for retail keys 
            const itemSubTotal = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr[style="color: #000000"]').children('td[valign="top"]'); 
            const itemSubTotalOverRetail = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr[style="color: #0000FF"]').children('td[valign="top"]'); 
            const itemSubTotalVoid = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr[style="color: #FF0000"]').children('td[valign="top"]'); 
            const itemSubTotalBelowRetail = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr[style="color: #009900"]').children('td[valign="top"]'); 

            // Capture transaction id, date, and customer 
            grabTrans(transID);
            grabTrans(date);
            grabTrans(customer);

            // Capture item description (for each retail if, there is one)
            grabDescription(itemName);
            grabDescription(itemNameVoid);
            grabDescription(itemNameOverRetail);          
            grabDescription(itemNameBelowRetail);

            // Capture item quantity (for each retail if, there is one)
            grabDescription(itemQuatity);
            grabDescription(itemQuatityVoid);
            grabDescription(itemQuatityOverRetail);
            grabDescription(itemQuatityBelowRetail);

             // Capture item sub-total (for each retail if, there is one)
             grabDescription(itemSubTotal);
             grabDescription(itemSubTotalVoid);
             grabDescription(itemSubTotalOverRetail);
             grabDescription(itemSubTotalBelowRetail);

            function grabTrans(path) {
                if (path) {
                    transaction.transID = path.html(); 
                    console.log(path.html());
                }
            }

            function grabDescription (path) {
                path.each(function(i, element){
                    console.log("Rtn grabDescription ", $(this).html());
                })
            }


            //console.log("The transaction is ", transaction);

            // EXAMPLE: You might use slice to peel off the relevant data
            //  console.log(targetPath.children('td[width="95"]').html().slice(-5))
        })

        res.write($.html());
        res.end();
    });

}).listen(8080);
