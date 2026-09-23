const http = require('http');
const dateTime = require('./src/dateTimeET.js');

const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Kaisa Sulg, veebiprogrammeerimine</title>\n</head>\n<body>\n';

const pageBody = '\t<h1>Kaisa Sulg, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna ülikoolis</a> ning ei sislda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';

const pageFoot = '\n</body>\n</html>';

http.createServer(function(req, res){
	res.writeHead(200, {"Content-type": "text/html"});
	//res.write('Meie veeb käivitus');
	
	res.write(pageHead);
	res.write(pageBody);
	
	res.write('<p>Täna on ' + dateTime.weekdayET() + '.</p>');
	res.write('<p>Kuupäev on ' + dateTime.dateET(1) + '.</p>');
	res.write('<p>Leht avati kell ' + dateTime.timeET() + '.</p>');
	
	res.write(pageFoot);
	return res.end();
}).listen(5318);