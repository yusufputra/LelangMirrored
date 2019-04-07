
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

require('./components/Example');

import React, { PureComponent, createContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Import component
import Header from './components/Header';
import Example from './components/Example';

export const AppContext = createContext();

class App extends PureComponent {

	state = {
		success: true,
		trigger: () => {
			this.setState({ success: !this.state.success });
		}
	};

	render() {
		return (
			<AppContext.Provider value={this.state}>
				{/* <AppContext.Consumer>
					{(context) => console.log(context)}
				</AppContext.Consumer> */}
				<BrowserRouter>
					<div>
						<Header />
						<Switch>
							<Route exact path='/' component={Example} />
							<Route path='/create' component={Example} />
						</Switch>
					</div>
				</BrowserRouter>
			</AppContext.Provider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));