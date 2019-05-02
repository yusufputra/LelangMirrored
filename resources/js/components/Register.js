import React, { PureComponent, Fragment } from 'react'
import {
  Form, Input, message, Icon, DatePicker, Select, Row, Col, Checkbox, Button, AutoComplete, Menu, Alert
} from 'antd';
import { Redirect } from 'react-router-dom'
import api from './api';


class RegistrationForm extends PureComponent {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    datePicker: null,
    status: false,
    loading: false,
  };

  handleSubmit = (e) => {
    this.setState({ loading: true });
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const body = {
          username: values.username,
          email: values.email,
          nama: values.name,
          password: values.password,
          tanggal_lahir: this.state.datePicker
        }
        try {
          const status = await axios.post(api.register, body);
          this.setState({ loading: false });
          message.success(`Register Berhasil`);
          console.log(status.data);
        }
        catch (err) {
          this.setState({ loading: false });
          console.log('error');
          console.log(err);
          this.setState({ status: true });
        }
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {



    const { getFieldDecorator } = this.props.form;

    return (
      <Fragment>
        {this.state.status && <Alert message="Register Gagal " type="error" />}

        <Form onSubmit={this.handleSubmit} style={{ padding: 0 }} >
          <Form.Item
            colon={false}
            label={(
              <span style={{ fontSize: 20 }}>Email :</span>
            )}
            style={{ marginBottom: '0px', paddingBottom: '0px' }}
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'Pastikan email Valid',
              }, {
                required: true, message: 'Masukkan Email Anda',
              }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item
            colon={false}
            label={(
              <span style={{ fontSize: 20 }}>Username :</span>
            )}
            style={{ marginBottom: '0px', paddingBottom: '0px' }}
          >
            {getFieldDecorator('username', {
              rules: [{
                type: 'string', message: 'Pastikan username Valid',
              }, {
                required: true, message: 'Masukkan username Anda',
              }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item
            colon={false}
            label={(
              <span style={{ fontSize: 20 }}>Nama :</span>
            )}
            style={{ marginBottom: '0px', paddingBottom: '0px' }}
          >
            {getFieldDecorator('name', {
              rules: [{
                type: 'string', message: 'Pastikan nama Valid',
              }, {
                required: true, message: 'Masukkan nama Anda',
              }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item
            colon={false}
            label={(
              <span style={{ fontSize: 20 }}>Password :</span>
            )} style={{ marginBottom: '0px' }}
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Masukkan password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="password" />
            )}
          </Form.Item>
          <Form.Item
            colon={false}
            label={(
              <span style={{ fontSize: 20 }}>Konfirmasi Password :</span>
            )}
            style={{ marginBottom: '0px' }}
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'pastikan password sama!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
          </Form.Item>
          <Form.Item
            colon={false}
            style={{ marginBottom: '0px' }}
            label={(
              <span style={{ fontSize: 20 }}>Tanggal Lahir :</span>
            )}        >
            {getFieldDecorator('date-picker', {
              rules: [{ type: 'object', required: true, message: 'Please select time!' }],
            })(
              <DatePicker onChange={(date, dateString) => this.setState({ datePicker: dateString })} />
            )}
          </Form.Item>

          <Form.Item
            style={{ marginBottom: '0px' }} >
            <Button block type="primary" htmlType="submit" loading={this.state.loading}>Register</Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default class Register extends PureComponent {
  render() {
    if (localStorage.token) {
      return (
        <Redirect to='/profile'></Redirect>
      )
    }
    return (
      <Menu style={{ width: '40%', margin: 'auto', padding: 16, borderRadius: 10 }}>
        <h3 style={{ textAlign: 'center' }}>Daftar akun baru sekarang</h3>
        <WrappedRegistrationForm />
      </Menu>
    );
  }
}


const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

