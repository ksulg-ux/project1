const http = require('http');
//moodul URL päringu parsimiseks
const url = require('url');
//moodul failitee haldamiseks
const path = require('path');
//const fs = require('fs');
const fs = require('fs').promises;
const dateTime = require('./src/dateTimeET.js');
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Kaisa Sulg, veebiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBanner = '\t<img src="veebiprogrammeerimine_2026_AA.png" alt="banner">';
const pageBody = '\t<h1>Kaisa Sulg, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna ülikoolis</a> ning ei sislda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';
const pageFoot = '\n</body>\n</html>';

http.createServer(async function(req, res){
	console.log(req.url);
	let currentURL = url.parse(req.url, true);
		console.log('parsituna: ' + currentURL.pathname);
		
		if(currentURL.pathname === '/'){
		res.writeHead(200, {"Content-type": "text/html"});
		//res.write('Meie veeb käivitus');
		
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		
		res.write('<table>' + '<tr>' + '<td>' + '<img src="/avaleht.jpg" alt="Piltding-left:20px;">' + '</td>' + '<td style="padding-left:20px; vertical-align:top;">' + '<p>Täna on ' + dateTime.weekdayET() + '.</p><p>Kuupäev on ' + dateTime.dateET(1) + '.</p><p>Leht avati kell ' + dateTime.timeET() + '.</p>' + '<p><a href="/vanasona">Vaata vanasõna</a></p>' + '<p><a href="/minust">Miks tulin TLÜ-sse </a></p>' + '</td>' + '</tr>' + '</table>');
		
	/*	res.write('\t<img src="avaleht.jpg" alt="pilt">');
		res.write('<p>Täna on ' + dateTime.weekdayET() + '.</p>');
		res.write('<p>Kuupäev on ' + dateTime.dateET(1) + '.</p>');
		res.write('<p>Leht avati kell ' + dateTime.timeET() + '.</p>');
		res.write('<p><a href="/vanasona">Vaata vanasõna</a></p>');
		res.write('<p><a href="/minust">Miks tulin TLÜ-sse õppima</a></p>'); */
		
		res.write(pageFoot);
		return res.end();
	}
	else if(currentURL.pathname === '/vanasona'){
		
		const data = await fs.readFile(
			path.join(__dirname, 'txt', 'vanasonad.txt'),
			'utf8'
		);
		
		const vanasonad = data.split(';');
		const vanasona = vanasonad[Math.floor(Math.random() * vanasonad.length)].trim();
		
		res.writeHead(200, {"Content-type": "text/html"});
		//res.write('Meie veeb käivitus');
		res.write(pageHead);
		res.write(pageBanner);
		res.write('<h1>Tänase päeva vanasõna</h1>' + '<p>' + vanasona + '</p>' + '<p><a href="/">Tagasi avalehele</a></p><hr>');
		res.write(pageFoot);
		return res.end();	
	}
	
	else if(path.extname(currentURL.pathname) === '.jpg'){
		let imagePath = path.join(__dirname, 'pic', path.basename(currentURL.pathname));
		
		try{
			const data = await fs.readFile(imagePath);
			res.writeHead(200, {"Content-type": "image/jpeg"});
			return res.end(data);
		} catch (err) {
			res.writeHead(404, {"Content-type": "text/plain; charset=utf8"});
			return res.end('Pilti ei leitud!');
		}
	}
	
	else if(currentURL.pathname === '/veebiprogrammeerimine_2026_AA.png'){
		//liidame virtuaalse serveri päris kataloogidega
		let bannerPath = path.join(__dirname, 'pic', currentURL.pathname);
		try {
			const data = await fs.readFile(bannerPath);
			res.writeHead(200, {"Content-type": "image/png"});
			return res.end(data);
		} catch (err) {
			res.writeHead(404, {"Content-type": "text/plain; charset=utf8"});
			return res.end('Pilti ei leitud!');
		}
	}
	
/* 	else if(currentURL.pathname === '/veebiprogrammeerimine_2026_AA.png'){
		//liidame virtuaalse serveri päris kataloogidega
		let bannerPath = path.join(__dirname, 'pic', currentURL.pathname);
		fs .readFile(bannerPath, (err, data)=>{
			if(err){
				throw(err);
			} else {
				res.writeHead(200, {"Content-type": "image/png"});
				res.end(data);
			}
		});
	}*/
	
	else if(currentURL.pathname === '/minust'){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		
		res.write('<h1>Miks tulin TLÜ-sse õppima?</h1>' + '\t<img src="minust.jpg" alt="pilt2">' + '<p>Tulin TLÜ-sse õppima, et täiendada oma IT-alaseid teadmisi.</p>' + '<p><a href="/">Tagasi avalehele</a></p>');
		
		res.write(pageFoot);
		return res.end();
	}
	
	else {
		res.end('Viga 404! Ei leia sellist lehte!');
	}
	
}).listen(5318);