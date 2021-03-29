import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';
import { Redirect } from 'react-router';

const Navbar = ({ logout, isAuthenticated, loading, user }) => {
	if (!isAuthenticated) {
		return <Redirect to='/' />;
	}

	return isAuthenticated ? (
		<Fragment>
			<nav className='navbar navbar-dark bg-dark'>
				<div className='container-fluid'>
					<a className='navbar-brand'>{loading ? 'Task app' : `Tasks app`}</a>;
					<form className='d-flex'>
						<button
							className='btn btn-outline-success'
							type='submit'
							onClick={logout}>
							Logout
						</button>
					</form>
				</div>
			</nav>
		</Fragment>
	) : (
		''
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
	loading: PropTypes.bool.isRequired,
	user: PropTypes.object
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	loading: state.auth.loading,
	user: state.auth.user
});

export default connect(mapStateToProps, { logout })(Navbar);
