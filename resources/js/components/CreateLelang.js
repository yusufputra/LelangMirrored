import React, { PureComponent } from 'react'
import {
    Form, Input, Tooltip, Icon, DatePicker, Select, Row, Col, Checkbox, Button, AutoComplete, Menu, Upload, message
} from 'antd';
require('./CreateShop.css');

import api from './api';

class FormLelang extends PureComponent {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        loading: false
    };



    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }



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
    beforeUpload(file) {
       
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        isLt2M;
    }

    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    render() {
        const fileList = [{
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }, {
            uid: '-2',
            name: 'yyy.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }];


        const props2 = {
            action: '//jsonplaceholder.typicode.com/posts/',
            listType: 'picture',
            defaultFileList: [...fileList],
            className: 'upload-list-inline',
        };
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;
        const imageUrl = this.state.imageUrl;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <Form onSubmit={this.handleSubmit} style={{ padding: 0 }} >
                <Form.Item
                    colon={false}
                    label={(
                        <span style={{ fontSize: 20 }}>
                            Nama Toko :
                        </span>
                    )}

                    style={{ marginBottom: '0px' }}
                >
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, whitespace: true }],
                    })(
                        <Input placeholder={'Nama Toko'} />
                    )}
                </Form.Item>
                <Form.Item
                    colon={false}
                    label={(
                        <span style={{ fontSize: 20 }}>Alamat :</span>
                    )}
                    style={{ marginBottom: '0px' }}
                >
                    {getFieldDecorator('address', {
                        rules: [{ type: 'address', required: true, message: 'Mohon isi alamat anda!' }],
                    })(
                        <Input placeholder={"Masukkan Alamat Anda"} >

                        </Input>
                    )}
                </Form.Item>
                <Form.Item
                    colon={false}
                    style={{ marginBottom: '0px' }}
                    label={(
                        <span style={{ fontSize: 20 }}>Kode Pos :</span>
                    )}        >
                    {getFieldDecorator('zipcode', {
                        rules: [{ type: 'zipcode', required: true, message: 'Mohon isi kodepos anda!' }],
                    })(
                        <Input placeholder={"Masukkan Kode Pos "} >

                        </Input>
                    )}
                </Form.Item>
                <Form.Item
                    colon={false}
                    style={{ marginBottom: '0px' }}
                    label={(
                        <span style={{ fontSize: 20 }}>Nomor Telepon :</span>
                    )}        >
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(
                        <Input addonBefore={"+62"} style={{ width: '100%' }} />
                    )}
                </Form.Item>

                <Form.Item
                    colon={false}
                    style={{ marginBottom: 0 }}
                    label={(
                        <span style={{ fontSize: 20 }}>Avatar Toko</span>

                    )}>
                    {getFieldDecorator('Avatar', {
                        rules: [{ required: true, message: 'Please Select Shop Image!' }],
                    })(

                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="//jsonplaceholder.typicode.com/posts/"
                            beforeUpload={this.beforeUpload}
                            onChange={this.handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                        </Upload>
                    )}

                </Form.Item>
                <Form.Item
                    style={{ marginBottom: '0px' }} >
                    <Button block type="primary" htmlType="submit">Register</Button>
                </Form.Item>
            </Form >
        );
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(FormLelang);

export default class CreateLelang extends PureComponent {
    render() {
        return (
            <Menu style={{ width: '40%', margin: 'auto', padding: 16, borderRadius: 10 }}>
                <h3 style={{ textAlign: 'center' }}>Lelang Barangmu!</h3>
                <WrappedRegistrationForm />
            </Menu>
        )
    }
}
