const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const authMiddleWare = require('./middlewares/auth');
const loginController = require('./controllers/login.controller');
const countriesController = require('./controllers/countries.controller');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// enable cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.post('/login', loginController);

app.get('/countries', authMiddleWare, countriesController.listCountries);

app.put('/countries', authMiddleWare, countriesController.putCountry);

app.delete('/countries', authMiddleWare, countriesController.deleteCountry);

app.listen(config.port, () => console.log('Listening at %d', config.port));

module.exports = app;
