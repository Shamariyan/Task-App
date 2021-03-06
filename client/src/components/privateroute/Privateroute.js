import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const privateRoute = ({
	component: Component,
	auth: { isAuthenticated, loading },
	...rest
}) => (
	<Route
		{...rest}
		render={props =>
			!isAuthenticated && !loading ? (
				<Redirect to='/'></Redirect>
			) : (
				<Component {...props} />
			)
		}
	/>
);

privateRoute.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(privateRoute);
