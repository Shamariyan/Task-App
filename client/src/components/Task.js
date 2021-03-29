import React from 'react';
import { Fragment } from 'react';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteTask } from '../../src/actions/task';

const Task = ({ task: { text, date, _id }, deleteTask }) => {
	const [disable, setdisable] = useState(false);

	const disableCard = _id => {
		setdisable(!disable);
	};
	return (
		<Fragment>
			<div
				className='card m-4 d-flex flex-wrap justify-content-center shadow  mb-5 bg-body rounded'
				style={{ maxWidth: 700 }}>
				<div
					disabled={disable}
					className='card-header d-flex justify-content-between'>
					{moment(date).format(`DD-MM-YYYY @  h:m`)}
					{
						<Link
							// onClick={() => editTask()}
							class='bi bi-pen-fill text-dark'></Link>
					}
				</div>
				<div className='card-body'>
					<h5 className='card-title d-flex justify-content-between'>
						{`${text}  `}
						{disable ? <i class='bi bi-check-all bg-primary m-1 p-1'></i> : ''}
					</h5>
					<div className=' d-flex justify-content-around p-3'>
						<Link
							onClick={() => disableCard(_id)}
							className='btn btn-success btn-gradient text-light'
							disabled={disable}>
							{disable ? 'Not Done' : 'Done'}
						</Link>
						<Link
							disabled={disable}
							onClick={e => deleteTask(_id)}
							className='btn btn-danger btn-gradient text-light'>
							Delete
						</Link>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

Task.propTypes = {
	deleteTask: PropTypes.func.isRequired
};

export default connect(null, { deleteTask })(Task);
