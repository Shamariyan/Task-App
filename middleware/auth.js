const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
	const token = req.header('auth token');

	if (!token) {
		return res.status(400).json({ message: 'No token is recognized' });
	}
	try {
		const decodedtoken = jwt.verify(token, config.get('jwtsecret'));
		req.user = decodedtoken.user;
		next();
	} catch (err) {
		res.status(401).json({ message: 'Unauthorized - Token in invalid' });
	}
};
