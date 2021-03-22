import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const privateRoute = ({
	component = Component,
	auth: { isAuthenticated, loading },
	...rest
}) => (
	<Route
		{...rest}
		render={props =>
			!isAuthenticated && !loading ? (
				<Redirect to='/login'></Redirect>
			) : (
				<component {...props}></component>
			)
		}
	/>
);
