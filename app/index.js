const log = require('ssi-logger');
const express = require('express');
const app = express();
const port = 3000;

log.open({
	console: {enable: false},
	syslog: {enable: true, facility: 'LOG_LOCAL1'}
});
log.info('Hello the World');
log.close();

let i = 0;

const emitLog = () => {
	i = i + 1;
	log.open({
		console: {enable: false},
		syslog: {enable: true, facility: 'LOG_LOCAL1'}
	});

	log.emerg('EMERG: Hello the World:', i);
	log.alert('ALERT: Hello the World:', i);
	log.crit('CRIT: Hello the World:', i);
	log.error('ERROR: Hello the World:', i);
	log.warn('WARN: Hello the World:', i);
	log.notice('NOTICE: Hello the World:', i);
	log.info('INFO: Hello the World:', i);
	log.debug('DEBUG: Hello the World:', i);

	log.close();
}

app.get('/', (req, res) => {
	res.send(`... Hello!`);
});

app.listen(port, () => {
	console.log(`... listening on port ${port}`);
	console.log('... application started');
	setInterval(emitLog, 2000);
});
