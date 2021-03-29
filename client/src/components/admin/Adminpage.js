import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers } from '../../actions/auth';
import Users from './Users';
import Navbar from '../Navbar';
import Alert from '../Alert';
import Admintasks from './Admintasks';

const Adminpage = ({ getUsers, loading, users }) => {
	useEffect(() => {
		if (!loading) {
			getUsers();
		}
	}, [getUsers]);

	return (
		<Fragment>
			<Navbar></Navbar>
			<Alert></Alert>
			<div style={{ backgroundImage: 'url(/bg.jpg)' }} />
			<h2 className='d-flex mt-5 justify-content-center'>-----Users-----</h2>
			<div className='d-flex  flex-wrap justify-content-center'>
				{users.map(u => (
					<Users key={u._id} user={u} />
				))}
			</div>
			<h2 className='d-flex  flex-wrap justify-content-center'>
				-----Tasks-----
			</h2>
			<Admintasks />
		</Fragment>
	);
};

Adminpage.propTypes = {
	users: PropTypes.array.isRequired,
	getUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	loading: state.auth.loading,
	users: state.auth.users
});

export default connect(mapStateToProps, { getUsers })(Adminpage);
