import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'; //redux things
import store from './store'; //redux store
import React, { component, Fragment } from 'react';
import Loginpage from './components/auth/Loginpage';
import Registerpage from './components/auth/Registerpage';
import Homepage from './components/Homepage';
import { useEffect } from 'react';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Privateroute from '../src/components/privateroute/Privateroute';
import Adminpage from './components/Adminpage';
import Adminlogin from './components/auth/Adminlogin';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Switch>
						<Route exact path='/' component={Loginpage} />
						<Route exact path='/register' component={Registerpage} />
						<Route exact path='/adminlogin' component={Adminlogin} />
						<Privateroute exact path='/adminpage' component={Adminpage} />
						<Privateroute exact path='/home' component={Homepage} />
					</Switch>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
