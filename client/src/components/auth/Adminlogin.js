import React from 'react';
import { useState } from 'react';
import { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Alert from '../Alert';
import { loadUser, adminlogin } from '../../actions/auth';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Adminlogin = ({ adminlogin, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		username: '',
		password: ''
	});

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const { username, password } = formData;

	const onSubmit = e => {
		e.preventDefault();
		adminlogin(username, password);
	};

	if (isAuthenticated) {
		return <Redirect to='/adminpage' />;
	}

	return (
		<div>
			<Fragment>
				<nav className='navbar navbar-dark bg-dark'>
					<div className='container-fluid'>
						<a className='navbar-brand'>Task app</a>
						<form className='d-flex'>
							<Link
								to='/register'
								className='btn btn-outline-success'
								type='submit'>
								Sign Up
							</Link>
						</form>
					</div>
				</nav>
				<Alert />
				<h1 className='d-flex justify-content-center m-4'>Admin Login</h1>
				<div className='d-flex justify-content-center m-5'>
					<form onSubmit={e => onSubmit(e)}>
						<div className='form-group'>
							<label>Username</label>
							<input
								type='text'
								className='form-control'
								id='usernameinput'
								name='username'
								onChange={e => handleChange(e)}
								aria-describedby='emailHelp'
								placeholder='Enter username'
								required
							/>
						</div>
						<div className='form-group mt-3' style={{ minWidth: 300 }}>
							<label>Password</label>
							<input
								type='password'
								className='form-control'
								id='password'
								name='password'
								onChange={e => handleChange(e)}
								placeholder='Password'
								required
							/>
						</div>
						<div className=' d-grid gap-2 col-6 mx-auto m-4'>
							<button type='submit' className='btn btn-primary'>
								Login
							</button>
						</div>
						<h8 className='d-flex justify-content-center m-1'>
							Normal user? <Link to='/'>Login here</Link>
						</h8>
					</form>
				</div>
			</Fragment>
		</div>
	);
};

Adminlogin.propTypes = {
	adminlogin: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { adminlogin })(Adminlogin);
