
const _ = require('lodash');
const requestBodyChecker = require('../utils/request.body.verifier');

const countries = [];

const listCountries = (req, res) => {
	return res.status(200).json({status: true, countries});
}

const putCountry = (req, res) => {
	const error = requestBodyChecker(req.body, ['country']);
	if (error) return res.status(400).json({ status: false, message: 'validation failed', error });
	if (!_.includes(countries, req.body.country)) {
		countries.push(req.body.country);
	}
	return res.status(200).json({status: true, countries});
}

const deleteCountry = (req, res) => {
	const error = requestBodyChecker(req.body, ['country']);
	if (error) return res.status(400).json({ status: false, message: 'validation failed', error });
	if (!_.includes(countries, req.body.country)) {
		return res.status(400).json({ status: false, message: 'Country does not exist' });
	}
	_.remove(countries, function(n) {
		return n === req.body.country;
	});
	res.status(200).json({status: true, countries});
}

module.exports = {
    listCountries,
    putCountry,
    deleteCountry
}