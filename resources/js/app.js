
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

import React, { PureComponent, createContext, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu, AutoComplete, Input, Button, Icon, Popover } from 'antd';
import FormLoginComponent from './components/FormLogin';
import ReactModal from 'react-modal';
// Import component
import Example from './components/Example';
import Search from './components/Search';
import ShopDetail from './components/ShopDetail';

import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import styles from './app.css';
import './app.css';
import ButtonGroup from 'antd/lib/button/button-group';
import ItemDetails from './components/ItemDetails';
import LandingPage from './components/LandingPage';
import Checkout from './components/Checkout';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import CreateShop from './components/CreateShop';
import CreateLelang from './components/CreateLelang';

import UserProvider, { UserContext } from './contexts/UserProvider';
export const AppContext = createContext();

const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


const dataSource = [{
	title: '话题',
	children: [{
		title: 'AntDesign',
		count: 10000,
	}, {
		title: 'AntDesign UI',
		count: 10600,
	}],
}, {
	title: '问题',
	children: [{
		title: 'AntDesign UI 有多好',
		count: 60100,
	}, {
		title: 'AntDesign 是啥',
		count: 30010,
	}],
}, {
	title: '文章',
	children: [{
		title: 'AntDesign 是一个设计语言',
		count: 100000,
	}],
}];

function renderTitle(title) {
	return (
		<span>
			{title}
			<a
				style={{ float: 'right' }}
				href="https://www.google.com/search?q=antd"
				target="_blank"
				rel="noopener noreferrer"
			>更多
		</a>
		</span>
	);
}

const options = dataSource.map(group => (
	<OptGroup
		key={group.title}
		label={renderTitle(group.title)}
	>
		{group.children.map(opt => (
			<Option key={opt.title} value={opt.title}>
				{opt.title}
				<span className="certain-search-item-count">{opt.count} 人 关注</span>
			</Option>
		))}
	</OptGroup>
)).concat([
	<Option disabled key="all" className="show-all">
		<a
			href="https://www.google.com/search?q=antd"
			target="_blank"
			rel="noopener noreferrer"
		>
			查看所有结果
	  </a>
	</Option>,
]);

function App() {
	return (
		<UserProvider>
			<UserContext.Consumer>
				{(context) => <AppChildren context={context} />}
			</UserContext.Consumer>
		</UserProvider>
	);
}

class AppChildren extends PureComponent {


	constructor(props) {
		super(props);
		this.state = {
			success: true,
			trigger: () => {
				this.setState({ success: !this.state.success });
			},
			visible: false
		};
	}


	componentWillMount() {
		this.props.context.checkLogin();
	}

	showModal = () => {
		this.setState({
			visible: true,
		});
	}

	handleCancel = (e) => {
		this.setState({
			visible: false,
		});
	}

	handleOk = (e) => {
		//login process here
		this.setState({
			visible: false,
		});
	}
	popOver() {
		return (
			<Fragment>
				<a >
					<div>

						Profile
				<Link to="/profile"></Link>

					</div>
				</a>
			</Fragment>
		)
	}

	renderButton() {
		if (this.props.context.loggedIn) {
			return (
				<ButtonGroup style={{ float: 'right' }}>
					<Popover content={this.popOver()} title="Hallo " trigger="hover">
						<Button >
							Profile
										</Button>
					</Popover>
				</ButtonGroup>



			)
		}
		return (
			<ButtonGroup style={{ float: 'right' }}>
				<Button onClick={this.showModal}>
					Masuk
										</Button>
				<Button type="primary" style={{ fontWeight: 'bold' }}>
					<Link to="/Register">Daftar</Link>
				</Button>
			</ButtonGroup>
		)
	}

	render() {
		console.log('render');
		return (
			<AppContext.Provider value={this.state}>
				{/* <AppContext.Consumer>
					{(context) => console.log(context)}
				</AppContext.Consumer> */}
				<BrowserRouter>
					<Layout>
						<Layout.Header style={{ backgroundColor: 'white' }} className="header">
							<div className="logo" ><img src="/LelangInCropped.png" width="100%" /></div>
							<Menu
								theme={'light'}
								mode={'horizontal'}
								style={{ lineHeight: '64px' }}
							>
								<Menu.Item key="kategori">
									Kategori
								</Menu.Item>
								<Menu.Item>
									<div className="certain-category-search-wrapper">
										<AutoComplete
											className="certain-category-search"
											dropdownClassName="certain-category-search-dropdown"
											dropdownMatchSelectWidth={false}
											dropdownStyle={{ width: 300 }}
											size="large"
											style={{ width: '100%' }}
											dataSource={options}
											placeholder="input here"
											optionLabelProp="value"
										>
											<Input suffix={<Icon type="search" className="certain-category-icon" />} />
										</AutoComplete>
									</div>
								</Menu.Item>
								{this.renderButton()}
							</Menu>

						</Layout.Header>

						<ReactModal
							isOpen={this.state.visible}
							contentLabel="Login"
							shouldFocusAfterRender={true}
							shouldCloseOnOverlayClick={false}
							shouldCloseOnEsc={true}
							shouldReturnFocusAfterClose={true}
							onRequestClose={this.handleCancel}
							style={{
								overlay: {
									backgroundColor: 'rgba(0,0,0,0.7)'
								},
								content: {
									borderRadius: '8px',
									bottom: 'auto',
									minHeight: '10rem',
									left: '50%',
									paddingTop: '0.4rem',
									paddingLeft: '2rem',
									paddingBottom: '2rem',
									paddingRight: '2rem',
									position: 'fixed',
									right: 'auto',
									top: '50%',
									transform: 'translate(-50%,-50%)',
									minWidth: '20rem',
									width: '30%',
									maxWidth: '30rem'
								}
							}}
						>
							<a onClick={this.handleCancel} style={{ marginLeft: '100%' }}>
								<Icon type="close-circle" style={{ fontSize: 25 }} />
							</a>
							<FormLoginComponent></FormLoginComponent>
						</ReactModal>

						<Layout.Content style={{ padding: '0 50px', marginTop: 64 }}>
							<Switch>
								<Route exact path='/' component={LandingPage} />
								<Route path='/create' component={Example} />
								<Route path='/itemDetails' component={ItemDetails} />
								<Route path='/checkout' component={Checkout} />
								<Route path='/search' component={Search} />
								<Route path='/shop' component={ShopDetail} />
								<Route path='/Register' component={Register} />
								<Route path='/profile' component={UserProfile} />
								<Route path='/createShop' component={CreateShop} />
								<Route path='/createLelang' component={CreateLelang} />
							</Switch>
						</Layout.Content>
						<Layout.Footer style={{ textAlign: 'center' }}>
							{'Developed with <3 by us'}
						</Layout.Footer>
					</Layout>
				</BrowserRouter>
			</AppContext.Provider>
		);
	}
}


ReactDOM.render(<App />, document.getElementById('app'));
