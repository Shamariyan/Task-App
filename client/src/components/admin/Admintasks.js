import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { getTasks } from '../../actions/task';
import { connect } from 'react-redux';
import Admintask from './Admintask';

const Admintasks = ({ getTasks, tasks, loading }) => {
	return (
		<div>
			{tasks.map(t => (
				<Admintask key={t._id} task={t} />
			))}
		</div>
	);
};

Admintasks.propTypes = {
	getTasks: PropTypes.func.isRequired,
	loading: PropTypes.bool
};

const mapStateToProps = state => ({
	loading: state.auth.loading,
	tasks: state.task.tasks
});

export default connect(mapStateToProps, { getTasks })(Admintasks);
