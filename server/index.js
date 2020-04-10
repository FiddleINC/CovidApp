const express = require('express');
const http = require('http');
const normalizePort = require('normalize-port');
const cors = require('cors');

const dashboard = require('./routes/dashboard');

const app = express();
const server = http.createServer(app);

var PORT = normalizePort(process.env.PORT || '5000');

app.use(cors());
app.use(express.json());

app.use('/', dashboard);

server.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`);
});
