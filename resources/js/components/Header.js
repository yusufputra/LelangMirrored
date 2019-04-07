import React from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../app';

const TestContext = React.createContext();

export default class Header extends React.PureComponent {
	static contextType = AppContext;

	render() {

		console.log(this.context);
		console.log(AppContext);
		console.log(TestContext);

		return (
			<nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
				<div className='container'>
					<Link className='navbar-brand' to='/'>Tasksman</Link>
				</div>
			</nav>
		);
	}
}