import React, { PureComponent, Fragment } from 'react'
import {
    Form, Upload, DatePicker, Icon, Avatar, message, Row, Col, Card, Spin, List, Button, Skeleton, Tabs, Typography, Input,
} from 'antd';
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;
const { Paragraph } = Typography;
import UserProvider, { UserContext } from '../contexts/UserProvider';
import ReactModal from 'react-modal';
import { Redirect } from 'react-router';
import axios from 'axios';
// prepare for activity list if you want.

class ActivityList extends PureComponent {
    state = {
        initLoading: true,
        initLoading2: true,
        loading: false,
        data: [],
        list: [],
        visible: false,
        loadingDelete: false,
        barang: []
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

    componentDidMount() {
        this.getData();
        this.getHistory();
    }



    async getData() {
        const token = localStorage.token;
        const data = await axios.get('/api/alamat-pengiriman', { headers: { Authorization: token } });

        this.setState({
            initLoading: false,
            data: data.data.data,
            list: data.data.data,
            loading: false,

        });
        return (data);
    }

    getHistory = async () => {
        const data = await axios.get('/api/histori-transaksi-pengguna', { headers: { Authorization: localStorage.token } });
        this.setState({
            barang: data.data.data,
            initLoading2: false,

        });
    }

    // onLoadMore = () => {
    //     this.setState({
    //         loading: true,
    //         list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
    //     });
    //     this.getData((res) => {
    //         const data = this.state.data.concat(res.results);
    //         this.setState({
    //             data,
    //             list: data,
    //             loading: false,
    //         }, () => {
    //             // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
    //             // In real scene, you can using public method of react-virtualized:
    //             // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
    //             window.dispatchEvent(new Event('resize'));
    //         });
    //     });
    // }

    deleteAddres = async (id) => {
        try {
            console.log(id);
            this.setState({ loading: true });
            const data = await axios.post('/api/hapus-alamat-pengiriman/' + id, {}, { headers: { Authorization: localStorage.token } });
            console.log(data);
            this.setState({ loading: false });
            message.success(`Alamat Berhasil Dihapus.. Redirect ke halaman Profile dalam 3 detik...`);
            await new Promise(resolve => { setTimeout(resolve, 3000); });
            window.location.replace('/profile');

        }
        catch (err) {
            console.log(err);
        }
    }
    render() {
        const { initLoading, initLoading2, loading, list, barang } = this.state;
        const loadMore = !initLoading && !loading ? (
            <div style={{
                textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
            }}
            >
                <Button onClick={() => {
                    window.location.replace('/tambahAlamat');
                }}>Tambah Alamat</Button>

            </div>
        ) : null;

        switch (this.props.pos) {
            case "user":
                return (
                    <List
                        className="demo-loadmore-list"
                        loading={initLoading}
                        itemLayout="horizontal"
                        dataSource={list}
                        renderItem={item => (
                            <List.Item actions={[]}>
                                {console.log(item)}
                                <Skeleton avatar title={false} loading={item.loading} active>

                                    <div style={{ paddingTop: 0 }}>
                                        <div style={{ flexDirection: 'row', display: 'flex' }}>
                                            <h5>Penerima:</h5>
                                            <h5  >{item.nama_penerima}</h5>
                                        </div>

                                        <div style={{ flexDirection: 'row', display: 'flex' }}>

                                            <h5>Jalan:</h5>
                                            <h5 >{item.nama_jalan}</h5>
                                        </div>

                                        <div style={{ flexDirection: 'row', display: 'flex' }}>

                                            <h5>Kelurahan:</h5>
                                            <h5 >{item.kelurahan}</h5>
                                        </div>
                                        <div style={{ flexDirection: 'row', display: 'flex' }}>

                                            <h5>Kode Pos:</h5>
                                            <h5 >{item.kode_pos}</h5>
                                        </div>
                                        <div style={{ flexDirection: 'row', display: 'flex' }}>

                                            <h5>Nomor Telepon:</h5>
                                            <h5 >{item.no_telepon}</h5>
                                        </div>
                                        <Button onClick={() => { this.deleteAddres(item.id) }} loading={this.state.loading}>Hapus Alamat</Button>
                                    </div>
                                </Skeleton>

                            </List.Item>
                        )}
                    />);
            default:
                return (<List
                    className="demo-loadmore-list"
                    loading={initLoading2}
                    itemLayout="horizontal"
                    dataSource={barang}
                    renderItem={item => (
                        <List.Item >
                            {console.log(item)}
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.barang.foto[0]}/>}
                                    title={item.barang.nama_barang}
                                    description={`Rp ${item.barang.max_bid.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />);
        }
    }
}




class FormData extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            getData: true,
            email: undefined,
            foto: undefined,
            nama: undefined,
            tanggal_lahir: undefined,
            username: undefined,
        };
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    async componentDidMount() {

        const token = localStorage.token;
        const data = await axios.get('/api/pengguna', { headers: { Authorization: token } });
        this.setState({
            email: data.data.data.email,
            nama: data.data.data.nama,
            tanggal_lahir: data.data.data.tanggal_lahir,
            temp: undefined,
            username: data.data.data.username,
            foto: data.data.data.foto,
            getData: false,
            visible: false,
            loading: false,
        });
    }

    showDatePicker() {
        this.setState({ visible: true });
    }

    sendData = async () => {
        this.setState({
            loading: true
        })
        const body = {
            nama: this.state.nama,
            email: this.state.email,
            tanggal_lahir: this.state.tanggal_lahir
        }
        const data = await axios.post('/api/perbarui-profil', body, { headers: { Authorization: localStorage.token } });
        if (data.status === 200) {
            this.setState({
                loading: false
            })
            message.success(`Profile Updated`);
        }
        else {
            this.setState({
                loading: false
            })
            message.error(`Update Gagal`);

        }
        console.log(data);
    }

    render() {
        console.log(this.props.cotext);
        console.log(this.props.asd);
        if (this.state.getData) {
            return (
                <div>
                    <Spin style={{ marginLeft: '50%' }} />
                </div>
            )
        }



        return (
            <Card style={{ borderRadius: 8, boxShadow: "rgba(0, 0, 0, 0.12) 0px 2px 8px 0px" }}>
                <div style={{ paddingTop: 0 }}>
                    <h5>Username :</h5>
                    <Paragraph style={{ fontSize: 20 }} >{this.state.username}</Paragraph>
                    <h5>Nama :</h5>
                    <Paragraph style={{ fontSize: 20 }} editable={{ onChange: (val) => { this.setState({ nama: val }) } }}>{this.state.nama}</Paragraph>
                    <h5>Email :</h5>
                    <Paragraph style={{ fontSize: 20 }} editable={{ onChange: (val) => { this.setState({ email: val }) } }}>{this.state.email}</Paragraph>
                    <h5>Tanggal Lahir</h5>
                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                        <p style={{ fontSize: 20 }}>{this.state.tanggal_lahir}</p>
                        <Icon type="edit" theme="twoTone" style={{ fontSize: 20, marginLeft: '0.4rem' }} onClick={() => this.showDatePicker()} />
                    </div>
                </div>

                <ReactModal
                    isOpen={this.state.visible}
                    contentLabel="Tanggal Lahir"
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
                            width: '10%',
                            maxWidth: '20rem',
                            height: '10%',
                            maxHeight: '20rem'
                        }
                    }}
                >
                    <a onClick={this.handleCancel} style={{ marginLeft: '100%' }}>
                        <Icon type="close-circle" style={{ fontSize: 25 }} />
                    </a>
                    <DatePicker onChange={(date, dateString) => this.setState({ temp: dateString })} />
                    <Button onClick={() => {
                        this.setState({ tanggal_lahir: this.state.temp })
                        this.handleCancel()
                    }}> Save Change </Button>
                </ReactModal>
                <div style={{ margin: 'auto' }}>
                    <Button onClick={this.sendData} loading={this.state.loading}>Save Change</Button>
                </div>
            </Card>
        )
    }
}

const FormFilled = () => {

    return (
        <UserProvider>
            <UserContext.Consumer>
                {(context) => <FormData context={context} asd={'halo'} />}
            </UserContext.Consumer>
        </UserProvider>
    )
}



export default class UserProfile extends PureComponent {


    state = {
        getData: true,
        email: undefined,
        foto: undefined,
        nama: undefined,
        tanggal_lahir: undefined,
        username: undefined,
        height: 0,
        width: 0,
        upload: undefined,
        uploading: false
    };

    constructor() {
        super();

        window.addEventListener("resize", this.update);
    }

    componentDidMount() {
        this.update();
    }

    update = () => {
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth
        });
    };

    async componentDidMount() {

        const token = localStorage.token;
        const data = await axios.get('/api/pengguna', { headers: { Authorization: token } });
        this.setState({
            email: data.data.data.email,
            nama: data.data.data.nama,
            tanggal_lahir: data.data.data.tanggal_lahir,
            username: data.data.data.username,
            foto: data.data.data.foto,
            getData: false

        });
        return (data.data);
    }

    renderTab() {
        if (this.state.width < 683 && this.state.width > 655) {
            console.log('return 683')
            return (
                <div>
                    <Card style={{ borderRadius: 8, boxShadow: "rgba(0, 0, 0, 0.12) 0px 2px 8px 0px" }}>
                        <Tabs defaultActiveKey="1" tabBarGutter={this.state.width / 40}>

                            <Tabs.TabPane tab="Data Diri" key="1"><FormFilled /></Tabs.TabPane>
                            <Tabs.TabPane tab="List Alamat" key="2">
                                <ActivityList pos={"user"} />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Barang Lelang Yang Dimenangkan" key="3">
                                <ActivityList pos={"lelang"} />
                            </Tabs.TabPane>
                        </Tabs>
                    </Card>
                </div>
            )
        } else if (this.state.width < 655) {
            console.log('bellow 655');
            return (
                <div>
                    <Card style={{ borderRadius: 8, boxShadow: "rgba(0, 0, 0, 0.12) 0px 2px 8px 0px" }}>
                        <Tabs defaultActiveKey="1" tabBarGutter={this.state.width / 40}>

                            <Tabs.TabPane tab="Data Diri" key="1"><FormFilled /></Tabs.TabPane>
                            <Tabs.TabPane tab="List Alamat" key="2">
                                <ActivityList pos={"user"} />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Barang Lelang Yang Dimenangkan" key="3">
                                <ActivityList pos={"lelang"} />
                            </Tabs.TabPane>
                        </Tabs>
                    </Card>
                </div>
            );
        } else {
            console.log("grather than ");

            return (
                <div>
                    <Card style={{ borderRadius: 8, boxShadow: "rgba(0, 0, 0, 0.12) 0px 2px 8px 0px" }}>
                        <Tabs defaultActiveKey="1" tabBarGutter={this.state.width / 40}>
                            <Tabs.TabPane tab="Data Diri" key="1"><FormFilled /></Tabs.TabPane>
                            <Tabs.TabPane tab="List Alamat" key="2">
                                <ActivityList pos={"user"} />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Barang Lelang Yang Dimenangkan" key="3">
                                <ActivityList pos={"lelang"} />
                            </Tabs.TabPane>
                        </Tabs>
                    </Card>
                </div>
            );
        }
    }
    handleUpload = () => {
        const { upload } = this.state;
        //handling upload
    }



    render() {
        const { uploading, upload } = this.state;

        const props = {
            onRemove: (file) => {
                this.setState((state) => {
                    upload: undefined
                });
            },
            beforeUpload: (file) => {
                this.setState(state => ({
                    upload: [file],
                }));
                return false;
            },
            upload,
        };
        if (localStorage.token) {
            return (
                <Row gutter={24}>
                    <Col

                        xl={{ span: 8 }}
                        xxl={{ span: 6 }}
                        style={{ textAlign: 'center' }}
                    >
                        <Card style={{ borderRadius: 8, boxShadow: "rgba(0, 0, 0, 0.12) 0px 2px 8px 0px" }}>
                            <Skeleton loading={this.state.getData} active avatar={{ size: "large" }} paragraph={false} title={false} >
                                <Avatar size={200} src={this.state.foto} />


                            </Skeleton>
                            <Skeleton loading={this.state.getData} active paragraph={false}>
                                <h3 style={{ marginTop: 10 }}>{this.state.nama}</h3>

                            </Skeleton>
                            <Skeleton loading={this.state.getData} active paragraph={false}>
                                <Upload {...props}>
                                    <Button>
                                        <Icon type="upload" /> Pilih Avatar
                                  </Button>
                                </Upload>
                                <Button
                                    type="primary"
                                    onClick={this.handleUpload}
                                    disabled={this.state.upload === undefined}
                                    loading={this.state.uploading}
                                    style={{ marginTop: 16 }}
                                >
                                    {this.state.uploading ? 'Upload Foto...' : 'Upload Foto'}
                                </Button>

                            </Skeleton>

                        </Card>
                    </Col>
                    <Col

                        xl={{ span: 16 }}
                        xxl={{ span: 18 }}
                    >
                        {this.renderTab()}
                    </Col>
                </Row>
            );
        }
        return (
            <h1>Please Login </h1>
        )
    }
}
