'use strict';

const fs = require('fs');
var http = require("http");
var querystring = require('querystring');

let rawdata = fs.readFileSync('logs.json');
let student = JSON.parse(rawdata);
var d = new Date();

const server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write('<h1>Log entradas laboratorio</h1>');
  response.write('<ul>');
  for (var i = 0; i < student.length; i++)
  {
    response.write('<li>' + student[i].name + ',  '+ student[i].timeh + ':' + student[i].timem  + ' , ' + student[i].dia + '/' + student[i].mes + '/' + student[i].año +'</li>');
  }
  response.write('</ul>');
  const { headers } = request;
  response.end();
})

server.on('request', (request, response) => {
  let body = {};
request.on('data', (chunk) => {
  body = JSON.parse(chunk);
}).on('end', () => {
  //console.log(body)
  if (typeof(body['name']) == 'string' && body['password'] == 'robotica')
  {
    console.log(body['name'] + ' ' + d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() + ' , ' + d.getHours() + ':' + d.getMinutes())
    student.push({
          "name": body['name'],
          "timeh": d.getHours(),
          "timem": d.getMinutes(),
          "dia": d.getDate(),
          "mes": d.getMonth(),
          "año": d.getFullYear()
      });
      fs.writeFileSync('logs.json', JSON.stringify(student));
  }
});


})

server.listen(8888);
