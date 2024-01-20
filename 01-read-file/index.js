const fs = require('fs');
const path = require('path');
const pathToFile = path.join(__dirname, 'text.txt');
const rs = fs.createReadStream(pathToFile, 'utf-8');
rs.on('error', (err) => console.log(err.message));
rs.on('data', (chunk) => console.log(chunk));
