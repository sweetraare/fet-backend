const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const port = 8080;

const router = require('./routes');

app.use('/api', router.apiRoutes);
app.get('/', (req, res) => res.send('Hola!!'));

const options = {
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
}

//https.createServer(options, app).listen(443);

app.listen(port, () => {
	console.log('The server is running at port,', port);
}
)

