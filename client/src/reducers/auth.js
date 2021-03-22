//this is the reducer

import {
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	LOGIN_SUCCESS,
	LOGIN_FAILED
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case REGISTER_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false
			};
		case REGISTER_FAILED:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false
			};
		case LOGIN_SUCCESS:
			return;
		case LOGIN_FAILED:
			return;
		default:
			return state;
	}
}