var express = require('express');
var fs = require('fs');

var app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');




function getData(cb) {
  console.log('#3 - inside getData');

  fs.readFile('violation-data.csv', 'utf-8', function(err, data) {
    console.log('#4 - finished reading the file.');

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

    console.log('#5 - Time to call teh callback, because I now have the data and have parsed it.');
    cb(output);
  });
}




app.get('/api/data', function(req, res) {

  console.log('#1 - ajax call arrives');

  var callback = function(arrayOfData) {
    console.log('#6 - I am the callback! Time to send the data.');
    res.send({
      violations: arrayOfData
    });
  };

  console.log('#2 - time to get the data');
  getData(callback);

});






app.get('/server-rendered', function(req, res) {

  getData(function(output) {
    res.render('pages/server-rendered', {
      data: output
    });
  });

});







app.get('/about', function(req, res) {
  res.render('pages/about', { greeting: 'Hello, now go away.' });
});


var port = process.env.PORT || 8765;

app.listen(port, function() {
  console.log('Listening on port 8765.');
});
