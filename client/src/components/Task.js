import React from 'react';
import { Fragment } from 'react';

const Task = () => {
	return (
		<Fragment>
			<div
				className='card m-4 d-flex justify-content-center flex-wrap'
				style={{ maxWidth: 500 }}>
				<div className='card-header'>Date</div>
				<div className='card-body'>
					<h5 className='card-title'>Task number 1</h5>
					<div className=' d-flex justify-content-around p-3'>
						<a href='#' className='btn btn-success btn-gradient text-light'>
							Done
						</a>
						<a href='#' className='btn btn-danger btn-gradient text-light'>
							Delete
						</a>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Task;
