import React from 'react';
import { useState } from 'react';
import { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Alert from '../Alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Loginpage = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;
	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async e => {
		e.preventDefault();
		login(email, password);
	};

	//redirecting if logged in
	if (isAuthenticated) {
		return <Redirect to='/home' />;
	}

	return (
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
			<h1 className='d-flex justify-content-center m-4'>Sign In</h1>
			<div className='d-flex justify-content-center m-5'>
				<form onSubmit={e => onSubmit(e)}>
					<div className='form-group'>
						<label>Email address</label>
						<input
							type='email'
							className='form-control'
							id='exampleInputEmail1'
							name='email'
							onChange={e => handleChange(e)}
							aria-describedby='emailHelp'
							placeholder='Enter email'
						/>
					</div>
					<div className='form-group mt-3' style={{ minWidth: 300 }}>
						<label>Password</label>
						<input
							type='password'
							className='form-control'
							id='exampleInputPassword1'
							name='password'
							onChange={e => handleChange(e)}
							placeholder='Password'
						/>
					</div>
					<div className='d-flex justify-content-center m-4 '>
						<button type='submit' className='btn btn-primary'>
							Login
						</button>
					</div>
				</form>
			</div>
		</Fragment>
	);
};

Loginpage.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Loginpage);
