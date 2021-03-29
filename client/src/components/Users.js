import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers } from '../actions/auth';

const Users = ({ user, loading, getUsers }) => {
	useEffect(() => {
		if (!loading) {
			getUsers();
		}
	}, [getUsers]);

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
							<button class='btn btn-primary' type='button'>
								View Tasks
							</button>
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
	loading: state.auth.loading
});

export default connect(mapStateToProps, { getUsers })(Users);
