const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validator, validationResult } = require('express-validator');

//@route GET api/auth
//@descrip test route
//@access Public
router.get('/', auth, async (req, res) => {
	//auth is the middleware used to verify the token. hence we add it as a parameter
	try {
		const user = await User.findById(req.user.id); //in the middleware we put the value of decoded.user to req.user.thats y we can use it hereto get id
		res.send(user);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('SERVER ERROR');
	}
});

//@Route POST api/auth
//logging in and getting token
router.post(
	'/',
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Please enter the correct password').exists()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;
		try {
			const user = await User.findOne({ email: email });
			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ message: 'Invalid Credentials' }] });
			}
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res
					.status(400)
					.json({ errors: [{ message: 'Invalid Credentials' }] });
			}
			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				config.get('jwtsecret'),
				{ expiresIn: 3600000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('SERVER ERROR');
		}
	}
);
module.exports = router;
