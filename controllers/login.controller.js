
const jwt = require('jsonwebtoken');
const config = require('../config');
const requestBodyChecker = require('../utils/request.body.verifier');

module.exports = (req, res) => {
	const error = requestBodyChecker(req.body, ['username', 'password']);
	if (error) return res.status(401).json({ auth: false, message: 'validation failed', error });
	const { username, password } = req.body;
	const isAvailable = config.users.find(u => {
		return u.username == username && u.password == password;
	});
	if (!isAvailable) return res.status(401).json({ auth: false, message: 'Invalid username and password' });
	const token = jwt.sign({ id: username }, config.secret, {
		expiresIn: 86400, // expires in 24 hours
	});
	return res.status(200).json({ auth: true, token });
}