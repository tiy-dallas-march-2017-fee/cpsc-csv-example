var fs = require('fs');


fs.readFile('poop.csv', 'utf-8', function(err, data) {

  var output = [];

  var lines = data.split('\n');
  for (var i = 0; i < lines.length; i++) {
    var bits = lines[i].split(',');
    console.log(bits);
    output.push({
      date: bits[0],
      product: bits[1].replace('"""', '"').replace('""', '"'),
      violation: bits[3],
      firm: bits[6]
    });

    if (i > 400) {
      break;
    }
  }

  var str = 'Date,Product,Violation,Firm\n';
  for (var i = 0; i < output.length; i++) {
    str += [output[i].date, output[i].product, output[i].violation, output[i].firm].join() + '\n'
  }

  fs.writeFileSync('zonk.csv', str, 'utf-8');



  console.log(output);




});
