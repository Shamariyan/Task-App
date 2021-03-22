import React, { Fragment } from 'react';

const Navbar = () => {
	return (
		<Fragment>
			<nav className='navbar navbar-dark bg-dark'>
				<div className='container-fluid'>
					<a className='navbar-brand'>Task app</a>
					<form className='d-flex'>
						<button className='btn btn-outline-success' type='submit'>
							Logout
						</button>
					</form>
				</div>
			</nav>
		</Fragment>
	);
};

export default Navbar;
