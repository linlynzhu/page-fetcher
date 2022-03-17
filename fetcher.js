const hostAddress = process.argv[2].replace("http://www.", '').replace('/','');
const localFile = process.argv[3];

const fs = require('fs');
const net = require('net');
const conn = net.createConnection({
  host: hostAddress,
  port: 80
});
conn.setEncoding('UTF8');
conn.on('connect', () => {
  console.log(`Connected to server!`);

  conn.write(`GET / HTTP/1.1\r\n`);
  conn.write(`Host: example.edu\r\n`);
  conn.write(`\r\n`);
});
conn.on('data', (data) => {
  console.log(`Downloaded and saved ${data.length} bytes to ./index.html`);
  fs.writeFile(`${localFile}`, data, err => {
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
  });
  conn.end();
});


