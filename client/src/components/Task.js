import React from 'react';
import { Fragment } from 'react';
import moment from 'moment';

const Task = ({ task: { text, date } }) => {
	return (
		<Fragment>
			<div
				className='card m-4 d-flex flex-wrap justify-content-center shadow  mb-5 bg-body rounded'
				style={{ maxWidth: 700 }}>
				<div className='card-header'>
					{moment(date).format('DD-MM-YYYY @ hh:mm')}
				</div>
				<div className='card-body'>
					<h5 className='card-title'>{text}</h5>
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
