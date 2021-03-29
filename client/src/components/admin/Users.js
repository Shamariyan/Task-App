import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers } from '../../actions/auth';
import { getTasks } from '../../actions/task';
import { Link, Redirect } from 'react-router-dom';
import Admintasks from './Admintasks';

const Users = ({ user, loading, getUsers, getTasks, task }) => {
	useEffect(() => {
		if (!loading) {
			getUsers();
		}
	}, [getUsers]);

	const gettasksofuser = (e, _id) => {
		e.preventDefault();
		getTasks(_id);
	};

	if (!loading && user) {
		const { name, _id } = user;
		return (
			<Fragment>
				<div
					className='card d-flex flex-wrap justify-content-center shadow m-5 p-5  bg-body rounded'
					style={{ maxWidth: 500 }}>
					<div className='card-body'>
						<h5 className='card-title d-flex justify-content-center '>
							{`${name}`}
						</h5>
						<div class='d-flex flex-wrap justify-content-center shadow mt-4 '>
							<Link
								to='/admintasks'
								class='btn btn-primary'
								onClick={e => gettasksofuser(e, _id)}
								type='button'>
								View Tasks
							</Link>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
};

Users.propTypes = {
	loading: PropTypes.bool,
	getUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	loading: state.auth.loading,
	task: state.task.tasks
});

export default connect(mapStateToProps, { getUsers, getTasks })(Users);
