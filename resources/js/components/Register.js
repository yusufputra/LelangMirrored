import React, { PureComponent } from 'react'
import {
  Form, Input, Tooltip, Icon, DatePicker, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';


class RegistrationForm extends PureComponent {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        md: { span: 12 },
        lg: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 12 },
        lg: { span: 16 }
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };



    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{marginLeft:"-10px"}}>
        <Form.Item
          label="E-mail"
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
          label="Password"
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
          label="Konfirmasi Password"
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
          label={(
            <span>
              Nama Toko&nbsp;
              <Tooltip title="Nama toko dapat diatur kembali nanti">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: false, whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="Alamat"
        >
          {getFieldDecorator('address', {
            rules: [{ type: 'address', required: true, message: 'Mohon isi provinsi anda!' }],
          })(
            <Input placeholder={"Masukkan Alamat Anda"} >

            </Input>
          )}
        </Form.Item>
        <Form.Item
          label="Nomor Telepon"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Input addonBefore={"+62"} style={{ width: '100%' }} />
          )}
        </Form.Item>
        <Form.Item
          label="Tanggal Lahir"
        >
          {getFieldDecorator('date-picker', {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
          })(
            <DatePicker />
          )}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Register</Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default class Register extends PureComponent {
  render() {
    return (
      <Row>
        <Col md={{ span: 4 }} lg={{ span: 6 }} xl={{}}  >
        </Col>

        <Col md={{ span: 16 }} lg={{ span: 8 }} xl={{}}  >
          <h3 style={{textAlign:'center'}}>Daftar akun baru sekarang</h3>
          <WrappedRegistrationForm />
        </Col>

        <Col md={{ span: 4 }} lg={{ span: 8 }} xl={{}}  >


        </Col>
      </Row>

    )
  }
}


const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

