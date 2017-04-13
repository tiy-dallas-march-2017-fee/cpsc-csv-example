  var express = require('express');
var fs = require('fs');

var app = express();

app.use(express.static('public'));


app.get('/api/data', function(req, res) {

  fs.readFile('violation-data.csv', 'utf-8', function(err, data) {

    var output = [];

    var lines = data.split('\n');
    for (var i = 1; i < lines.length - 1; i++) {
      var bits = lines[i].split(',');
      output.push({
        date: bits[0],
        product: bits[1],
        violation: bits[2],
        firm: bits[3]
      });
    }



    res.send({
      violations: output
    });


  });

});


var port = process.env.PORT;

app.listen(port, function() {
  console.log('Listening on port 8765.');
});
