import React, { createContext, PureComponent } from 'react';

export const UserContext = createContext();

export default class UserProvider extends PureComponent {

	state = {
		loggedIn: false,
		setLoggedIn: () => {
			this.state.loggedIn = true;
			this.forceUpdate();
		}
	}

	render() {
		return (
			<UserContext.Provider value={this.state}>
				{this.props.children}
			</UserContext.Provider>
		);
	}
}