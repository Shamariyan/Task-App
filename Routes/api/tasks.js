const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Task = require('../../models/Task');
const User = require('../../models/User');

// POST api/tasks
//create a task
//private

router.post(
	'/',
	[auth, [check('text', 'Please enter a task to continue')]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const user = await User.findById(req.user.id).select('-password');

			const newTask = new Task({
				text: req.body.text,
				name: user.name,
				user: req.user.id
			});
			const task = await newTask.save();
			res.json(task);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('SERVER ERROR');
		}
	}
);

//GET api/tasks/user/:user_id
//get all tasks of a user
//private

router.get('/user/:user_id', auth, async (req, res) => {
	try {
		const task = await Task.find({ user: req.params.user_id }).sort({
			date: -1
		});

		if (!task) {
			return res
				.status(400)
				.json({ message: 'This user does not have any task' });
		}

		res.send(task);
	} catch (err) {
		console.error(err);
		res.status(500).send(`SERVER ERROR`);
	}
});

//DELETE api/tasks/:id
//delete a post by id
//private

router.delete('/:id', auth, async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);
		if (!task) {
			res.status(400).send(`User not authorized`);
		}
		await task.remove();
		res.send(`The task is removed`);
	} catch (err) {
		console.error(err.message);

		res.status(404).json({ msg: 'task not found' });
	}
});

module.exports = router;
