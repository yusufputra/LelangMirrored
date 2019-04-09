import React from 'react';
import {
	Form, Icon, Input, Button, Checkbox,
} from 'antd';
import './form.css';
class FormLogin extends React.PureComponent {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (

			<Form onSubmit={this.handleSubmit} className="login-form">
				<Form.Item>
					{getFieldDecorator('userName', {
						rules: [{ required: true, message: 'Please input your username!' }],
					})(
						<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: 'Please input your Password!' }],
					})(
						<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
					)}
				</Form.Item>
				<Form.Item>
				<div style={{display:'flex',flex:1,justifyContent:'space-between'}}>

					{getFieldDecorator('remember', {
						valuePropName: 'checked',
						initialValue: true,
					})(
						<Checkbox>Remember me</Checkbox>
					)}
						<a href="" >Forgot password</a>
						</div>
						<div style={{textAlign:'center'}}>
						<Button block type="primary" htmlType="submit"  >
							Log in
			 		 </Button>
					  <br></br>
					Or <a href="">register now!</a>
					</div>
				</Form.Item>
			</Form>
		);
	}
}



const FormLoginComponent = Form.create({ name: 'horizontal_login' })(FormLogin);

export default FormLoginComponent
