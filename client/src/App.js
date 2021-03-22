import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'; //redux things
import store from './store'; //redux store
import React, { component, Fragment } from 'react';
import Loginpage from './components/auth/Loginpage';
import Registerpage from './components/auth/Registerpage';
import Homepage from './components/Homepage';

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Switch>
						<Route exact path='/' component={Loginpage} />
						<Route exact path='/register' component={Registerpage} />
						<Route exact path='/home' component={Homepage} />
					</Switch>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
