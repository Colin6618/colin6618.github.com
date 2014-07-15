var  fs = require('fs');

var data1 = fs.readFileSync('file.txt', 'utf-8');
console.log(data1);
console.log('end');