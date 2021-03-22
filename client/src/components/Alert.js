import React from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Alert = ({ alerts }) =>
	alerts !== null &&
	alerts.length > 0 &&
	alerts.map(alert => (
		<div
			className={`alert alert-${alert.alertType} `}
			role='alert'
			key={alert.id}>
			<strong>{alert.msg}</strong>
		</div>
	));

Alert.propTypes = {
	alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
