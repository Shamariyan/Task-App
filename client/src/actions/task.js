import axios from 'axios';
import { setAlert } from './alert';

import { GET_TASKS, TASKS_ERROR, ADD_TASK, DELETE_TASK } from './types';

//get current user profile

export const getTasks = _id => async dispatch => {
	try {
		console.log('into gettasks function');
		const res = await axios.get(`api/tasks/user/${_id}`);

		dispatch({ type: GET_TASKS, payload: res.data });
	} catch (err) {
		dispatch(setAlert(err.message, 'danger'));
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
		// const errors = err.response.data.errors;
		// if (errors) {
		// 	errors.forEach(error => {

		// 	});
		// } else {
		dispatch({
			type: TASKS_ERROR
		});
	}
};

//delete task of the user

export const deleteTask = id => async dispatch => {
	try {
		const res = await axios.delete(`api/tasks/${id}`);
		dispatch({ type: DELETE_TASK, payload: id });
	} catch (err) {
		dispatch(setAlert('into error part of delete task', 'danger'));
		dispatch({
			type: TASKS_ERROR
		});
	}
};
