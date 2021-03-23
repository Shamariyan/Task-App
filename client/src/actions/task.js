import axios from 'axios';
import setAlert from './alert';

import { GET_TASKS, TASKS_ERROR, ADD_TASK } from './types';

//get current user profile

export const getTasks = _id => async dispatch => {
	try {
		console.log('into gettasks function');
		const res = await axios.get(`api/tasks/user/${_id}`);

		dispatch({ type: GET_TASKS, payload: res.data });
	} catch (err) {
		dispatch({
			type: TASKS_ERROR
		});
	}
};

//add a task to the user

export const addTask = text => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ text });
	try {
		console.log('into addtasks function');
		console.log(config);
		console.log(body);
		const res = await axios.post('/api/tasks', body, config);
		dispatch({
			type: ADD_TASK,
			payload: res.data
		});
	} catch (err) {
		if (err) {
			dispatch({
				type: TASKS_ERROR
			});
		}
	}
};
