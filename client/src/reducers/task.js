import {
	GET_TASKS,
	TASKS_ERROR,
	ADD_TASK,
	REMOVE_TASKS
} from '../actions/types';

const initialState = {
	tasks: [],
	loading: true,
	error: {}
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_TASKS:
			console.log('into get tasks action reducer');
			return {
				...state,
				tasks: payload,
				loading: false
			};
		case ADD_TASK:
			console.log('into add task action reducer');
			return {
				...state,
				tasks: [payload, ...state.tasks],
				loading: false
			};
		case TASKS_ERROR:
			console.log('into task error action reducer');
			return {
				...state,
				error: payload
			};
		case REMOVE_TASKS:
			return {
				...state,
				tasks: [],
				loading: false
			};
		default:
			return { ...state };
	}
}
