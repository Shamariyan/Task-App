import React from 'react';
import { useState } from 'react';
import { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { loadUser, register } from '../../actions/auth';
import Alert from '../Alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Registerpage = ({ register, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: ''
	});

	const { name, email, password } = formData;

	const handleFormData = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async e => {
		e.preventDefault();
		register({ name, email, password });
		console.log('success');
	};

	if (isAuthenticated) {
		loadUser();
		return <Redirect to='/home' />;
	}

	return (
		<Fragment>
			<nav className='navbar navbar-dark bg-dark'>
				<div className='container-fluid'>
					<Link to='/home' className='navbar-brand'>
						Task app
					</Link>
					<form className='d-flex'>
						<Link to='/' className='btn btn-outline-success' type='submit'>
							Sign In
						</Link>
					</form>
				</div>
			</nav>
			<Alert />
			<h1 className='d-flex justify-content-center m-4'>Sign Up</h1>
			<div className='d-flex justify-content-center m-5'>
				<form onSubmit={e => onSubmit(e)}>
					<div className='form-group'>
						<label>Username</label>
						<input
							type='text'
							className='form-control'
							name='name'
							value={name}
							onChange={e => handleFormData(e)}
							aria-describedby='username'
							placeholder='Enter your name'
							required
						/>
						<label className=' mt-3'>Email</label>
						<input
							type='email'
							className='form-control'
							name='email'
							value={email}
							onChange={e => handleFormData(e)}
							aria-describedby='emailHelp'
							placeholder='Enter email'
							required
						/>
						<small name='emailHelp' className='form-text text-muted'>
							We'll never share your email with anyone else.
						</small>
					</div>
					<div className='form-group mt-3'>
						<label>Password</label>
						<input
							type='password'
							className='form-control'
							name='password'
							value={password}
							onChange={e => handleFormData(e)}
							placeholder='Password'
							required
						/>
					</div>
					<div className='d-flex justify-content-center m-4 '>
						<button type='submit' className='btn btn-primary'>
							Submit
						</button>
					</div>
				</form>
			</div>
		</Fragment>
	);
};

Registerpage.propTypes = {
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Registerpage);
