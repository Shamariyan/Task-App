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
	LOGOUT
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
				dispatch(setAlert(error.msg, 'danger'));
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
export const login = (email, password) => async dispatch => {
	const config = {
		headers: {
			'content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ email, password });
	try {
		console.log(body);
		console.log(config);
		const response = await axios.post('/api/auth', body, config);
		dispatch({ type: LOGIN_SUCCESS, payload: response.data });
		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			Array.from(errors).forEach(error => {
				dispatch(setAlert(error.msg, 'danger'));
			});
		} else {
			dispatch({
				type: LOGIN_FAILED
			});
		}
	}
};

//logout
export const logout = () => dispatch => {
	dispatch({ type: LOGOUT });
};
