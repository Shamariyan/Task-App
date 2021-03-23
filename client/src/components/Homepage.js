import React from 'react';
import { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { addTask, getTasks } from '../actions/task';
import Navbar from './Navbar';
import Tasks from './Tasks';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ADD_TASK } from '../actions/types';
import moment from 'moment';

const Homepage = ({ getTasks, addTask, user, loading }) => {
	useEffect(() => {
		if (!loading && user) {
			const { _id } = user;
			console.log(_id);
			getTasks(_id);
		}
	}, []);

	const [formData, setFormData] = useState({
		text: ''
	});

	const { text } = formData;
	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const onSubmit = e => {
		e.preventDefault();
		addTask(text);
		const { _id } = user;
		getTasks(_id);
		setFormData({ text: '', date: '' });
	};

	return (
		<Fragment>
			<Navbar></Navbar>
			<form
				className='input-group mb-3  mt-3 w-90 p-4 d-flex justify-content-center'
				onSubmit={e => onSubmit(e)}>
				<input
					type='text'
					name='text'
					value={text}
					onChange={e => handleChange(e)}
					className='form-control'
					placeholder='Enter your task here'
					aria-label='task field'
					aria-describedby='button-addon2'
				/>
				<button
					className='btn btn-outline-secondary bg-primary bg-gradient text-white'
					type='submit'
					id='button-addon2'>
					Add task
				</button>
			</form>
			<h2 className='mb-3  mt-3 d-flex justify-content-center'>
				------------Your Tasks------------
			</h2>
			<Tasks></Tasks>
		</Fragment>
	);
};

Homepage.propTypes = {
	getTasks: PropTypes.func.isRequired,
	addTask: PropTypes.func.isRequired,
	loading: PropTypes.bool,
	user: PropTypes.object
};

const mapStateToProps = state => ({
	user: state.auth.user,
	loading: state.auth.loading
});

export default connect(mapStateToProps, { getTasks, addTask })(Homepage);
