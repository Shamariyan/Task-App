const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const config = require('config');
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { check, validationResult } = require('express-validator');

//@route POST api/users
//registering user and getting token
// public accesss
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'email is requitred').isEmail(),
		check('password', 'Enter a password to proceed').not().isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email: email });
			if (user) {
				res.status(400).json({ errors: [{ message: 'User already exists' }] });
			}

			//creating an instance of User model
			user = new User({
				name: name,
				email: email,
				password: password
			});

			//Encrypt password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			//adding a user to database
			await user.save();

			//adding payload
			const payload = {
				user: {
					id: user.id
				}
			};

			//JWT signing process
			jwt.sign(
				payload,
				config.get('jwtsecret'),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.log(err.message);
			res.status(500).send(`SERVER ERROR`);
		}
	}
);

//@ get all users
//GET api/users

router.get('/', auth, async (req, res) => {
	try {
		const users = await User.find();
		res.send(users);
	} catch (err) {
		console.error(err.message);
		res.status(500).send(`SERVER ERROR`);
	}
});

module.exports = router;
