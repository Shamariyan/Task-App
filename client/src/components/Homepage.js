import React from 'react';
import { Fragment } from 'react';
import Navbar from './Navbar';
import Tasks from './Tasks';

const Homepage = () => {
	return (
		<Fragment>
			<Navbar></Navbar>
			<div className='input-group mb-3  mt-5 w-90 p-4 d-flex justify-content-center'>
				<input
					type='text'
					className='form-control'
					placeholder='Enter your task here'
					aria-label='task field'
					aria-describedby='button-addon2'
				/>
				<button
					className='btn btn-outline-secondary bg-primary bg-gradient text-white'
					type='button'
					id='button-addon2'>
					Add task
				</button>
			</div>
			<Tasks></Tasks>
		</Fragment>
	);
};

export default Homepage;
