import React from 'react';
import { useEffect } from 'react';
import Task from './Task';
import PropTypes from 'prop-types';
import { getTasks } from '../actions/task';
import { connect } from 'react-redux';
// import { task } from '../../../Routes/api/tasks';

const Tasks = ({ user, getTasks, task, loading }) => {
	useEffect(() => {
		if (!loading && user) {
			const { _id } = user;
			console.log(_id);
			getTasks(_id);
		}
	}, [getTasks]);
	return (
		<div>
			{task.map(t => (
				<Task key={t._id} task={t} />
			))}
		</div>
	);
};

Tasks.propTypes = {
	getTasks: PropTypes.func.isRequired,
	loading: PropTypes.bool
};

const mapStateToProps = state => ({
	user: state.auth.user,
	loading: state.auth.loading,
	task: state.task.tasks
});

export default connect(mapStateToProps, { getTasks })(Tasks);
