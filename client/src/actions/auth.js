//this is the actions file

import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAILED } from './types';

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
