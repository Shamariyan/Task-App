//this is the actions file

import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';
import {
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT,
	REMOVE_TASKS,
	GET_TASKS,
	GET_USERS
} from './types';

//Load user
export const loadUser = () => async dispatch => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const res = await axios.get('/api/auth');
		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR
		});
	}
};

//get all users
export const getUsers = () => async dispatch => {
	try {
		const response = await axios.get('/api/users');
		console.log(response);
		dispatch({ type: GET_USERS, payload: response.data });
	} catch (err) {
		console.log('Error in getting all users');
		dispatch(setAlert('Cannot get users', 'danger'));
	}
};

//register a user
export const register = ({ name, email, password }) => async dispatch => {
	const config = {
		headers: {
			'content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ name, email, password });
	try {
		const response = await axios.post('/api/users', body, config);
		console.log(body);
		console.log(config);
		dispatch({ type: REGISTER_SUCCESS, payload: response.data });
		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			Array.from(errors).forEach(error => {
				dispatch(setAlert(error.message, 'danger'));
			});
		} else {
			dispatch({
				type: REGISTER_FAILED
			});
			dispatch(setAlert('User already exists', 'danger'));
		}
	}
};
//login a user
export const login = (email, username, password) => async dispatch => {
	const config = {
		headers: {
			'content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ email, username, password });
	try {
		console.log(body);
		console.log(config);
		const response = await axios.post('/api/auth', body, config);
		dispatch({ type: LOGIN_SUCCESS, payload: response.data });
		dispatch(loadUser());
	} catch (err) {
		// const errors = err.response.data.errors;
		// if (errors) {
		// 	errors.forEach(error => {
		// 		dispatch(setAlert(error.msg, 'danger'));
		// 	});
		// } else {
		dispatch({
			type: LOGIN_FAILED
		});
		dispatch(setAlert('Invalid Credentials', 'danger'));
	}
};
//login a admin
export const adminlogin = (username, password) => async dispatch => {
	const config = {
		headers: {
			'content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ username, password });
	try {
		console.log(body);
		console.log(config);
		const response = await axios.post('/api/auth/admin', body, config);
		dispatch({ type: LOGIN_SUCCESS, payload: response.data });
		dispatch(loadUser());
	} catch (err) {
		// const errors = err.response.data.errors;
		// if (errors) {
		// 	errors.forEach(error => {
		// 		dispatch(setAlert(error.msg, 'danger'));
		// 	});
		// } else {
		dispatch({
			type: LOGIN_FAILED
		});
		dispatch(setAlert('Invalid Credentials', 'danger'));
	}
};

//logout
export const logout = () => dispatch => {
	dispatch({ type: LOGOUT });
	dispatch({ type: REMOVE_TASKS });
};
