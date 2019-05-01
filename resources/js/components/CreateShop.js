import React, { PureComponent } from 'react'
import {
    Form, Input, Spin, Icon, Select, Row, Col, Checkbox, Button, AutoComplete, Menu, Upload, message
} from 'antd';
import { Redirect } from 'react-router'

import Axios from 'axios';
require('./CreateShop.css');

class RegistrationForm extends PureComponent {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        loading: false,
        loadingButton:false,
    };



    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                const body = {
                    nama_toko: values.nickname,
                    no_telepon: values.phone,
                    nama_jalan: values.address,
                    kelurahan: values.kelurahan,
                    kode_pos: values.zipcode
                };
                console.log(body);
                this.setState({loadingButton:true});
                try {
                    const data = await Axios.post('/api/daftar-toko', body, { headers: { Authorization: localStorage.token } });
                    console.log(data.data);
                    this.setState({loadingButton:false});
                    message.success(`Toko Berhasil Dibuat.. Redirect ke halaman Toko dalam 3 detik...`);
                    await new Promise(resolve => { setTimeout(resolve, 3000); });
                    window.location.replace('/shop');
                }
                catch (err) {
                    this.setState({loadingButton:false});
                    console.log('error');
                    console.log(err);
                    message.error(`Terdapat Kesalahan`);
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
    beforeUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        // if (!isJPG) {
        //   message.error('You can only upload JPG file!');
        // }
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
                        rules: [{ type: 'string', required: true, message: 'Mohon isi alamat anda!' }],
                    })(
                        <Input placeholder={"Masukkan Alamat Anda"} >

                        </Input>
                    )}
                </Form.Item>
                <Form.Item
                    colon={false}
                    style={{ marginBottom: '0px' }}
                    label={(
                        <span style={{ fontSize: 20 }}>Kelurahan :</span>
                    )}        >
                    {getFieldDecorator('kelurahan', {
                        rules: [{ type: 'string', required: true, message: 'Mohon isi kodepos anda!' }],
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
                        rules: [{ type: 'string', required: true, message: 'Mohon isi kodepos anda!' }],
                    })(
                        <Input placeholder={"Masukkan KodePos"} >

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
                    style={{ marginBottom: '0px' }} >
                    <Button block type="primary" htmlType="submit" loading={this.state.loadingButton}>Register</Button>
                </Form.Item>
            </Form >
        );
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default class CreateShop extends PureComponent {

    state = {
        loading: true,
        status: true,
        username: undefined,
    }

    async componentDidMount() {
        try {
            const data = await Axios.get('/api/cek-toko/', { headers: { Authorization: localStorage.token } });
            this.setState({ loading: false })
            this.setState({ status: false });
            return Promise.resolve();
        }
        catch (err) {
            this.setState({ loading: false })
            this.setState({ status: true });
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <div>
                    <Spin style={{ marginLeft: '50%' }} />
                </div>
            )
        }
        else {
            console.log('status')
            console.log(this.state.status);
            if (this.state.status) {
                return (
                    <Menu style={{ width: '40%', margin: 'auto', padding: 16, borderRadius: 10 }}>
                        <h3 style={{ textAlign: 'center' }}>Buat Toko Lelangmu Sekarang</h3>
                        <WrappedRegistrationForm />
                    </Menu>
                );
            }
            else {
                return (
                    <div>
                        <Redirect to="/shop">

                        </Redirect>
                    </div>
                )
            }
        }
    }
}


const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

