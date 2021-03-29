import React, { Fragment } from 'react';
import Navbar from '../Navbar';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { addTask, getTasks } from '../../actions/task';
import PropTypes from 'prop-types';
import moment from 'moment';

const Admintasks = ({ task, loading }) => {
	if (!loading && task) {
		console.log('into the if statement in admintasks');
		const { text, date, _id } = task;
		return (
			<Fragment>
				<nav className='navbar navbar-dark bg-dark'>
					<div className='container-fluid'>
						<a className='navbar-brand'>{loading ? 'Task app' : `Tasks app`}</a>
						;
						<form className='d-flex'>
							<button className='btn btn-outline-success' type='submit'>
								Back to users
							</button>
						</form>
					</div>
				</nav>
				<div
					className='card m-4 d-flex flex-wrap justify-content-center shadow  mb-5 bg-body rounded'
					style={{ maxWidth: 700 }}>
					<div className='card-header d-flex justify-content-between'>
						{moment(date).format(`DD-MM-YYYY @  h:m`)}
					</div>
					<div className='card-body'>
						<h5 className='card-title d-flex justify-content-between'>
							{`${text}  `}
						</h5>
					</div>
				</div>
			</Fragment>
		);
	}
	return <div>error</div>;
};

Admintasks.propTypes = {
	getTasks: PropTypes.func.isRequired,
	loading: PropTypes.bool
};

const mapStateToProps = state => ({
	loading: state.auth.loading
});

export default connect(mapStateToProps, { getTasks })(Admintasks);
