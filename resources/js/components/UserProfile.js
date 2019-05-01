import React, { PureComponent } from 'react'
import {
    Form, Input, DatePicker, Icon, Avatar, Select, Row, Col, Card, Spin, List, Button, Skeleton, Tabs, Typography
} from 'antd';
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;
import reqwest from 'reqwest';
const { Paragraph } = Typography;
import UserProvider, { UserContext } from '../contexts/UserProvider';
import ReactModal from 'react-modal';

// prepare for activity list if you want.

class ActivityList extends PureComponent {
    state = {
        initLoading: true,
        loading: false,
        data: [],
        list: [],
    }

    componentDidMount() {
        this.getData((res) => {
            this.setState({
                initLoading: false,
                data: res.results,
                list: res.results,
            });
        });
    }

    getData = (callback) => {
        reqwest({
            url: fakeDataUrl,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: (res) => {
                callback(res);
            },
        });
    }

    onLoadMore = () => {
        this.setState({
            loading: true,
            list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
        });
        this.getData((res) => {
            const data = this.state.data.concat(res.results);
            this.setState({
                data,
                list: data,
                loading: false,
            }, () => {
                // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                window.dispatchEvent(new Event('resize'));
            });
        });
    }

    render() {
        const { initLoading, loading, list } = this.state;
        const loadMore = !initLoading && !loading ? (
            <div style={{
                textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
            }}
            >
                <Button onClick={this.onLoadMore}>loading more</Button>
            </div>
        ) : null;

        switch (this.props.pos) {
            case "user":
                return (
                    <List
                        className="demo-loadmore-list"
                        loading={initLoading}
                        itemLayout="horizontal"
                        loadMore={loadMore}
                        dataSource={list}
                        renderItem={item => (
                            <List.Item actions={[]}>
                                {console.log(item)}
                                <Skeleton avatar title={false} loading={item.loading} active>
                                    <List.Item.Meta

                                        avatar={<Avatar src="https://cdn1.i-scmp.com/sites/default/files/styles/1200x800/public/images/methode/2018/07/26/bf01d32e-8fcd-11e8-ad1d-4615aa6bc452_1280x720_204951.jpg?itok=NjQWdY8Z" />}
                                        title={"Lisa"}
                                        description="Melakukan Penawaran Terhadap Barang Mobil Impian sebesar Rp. 100.000.000"
                                    />

                                </Skeleton>
                            </List.Item>
                        )}
                    />);
            default:
                return (<List
                    className="demo-loadmore-list"
                    loading={initLoading}
                    itemLayout="horizontal"
                    loadMore={loadMore}
                    dataSource={list}
                    renderItem={item => (
                        <List.Item actions={[<a>More</a>]}>
                            {console.log(item)}
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={<Avatar src="data:image/jpeg;base64,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" />}
                                    title={"Avanza 2020"}
                                    description="Menang Lelang Avanza Seharga Rp.100.000.000,-"
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />);
        }
    }
}




class FormData extends PureComponent {

    state = {
        getData: true,
        email: undefined,
        foto: undefined,
        nama: undefined,
        tanggal_lahir: undefined,
        username: undefined,
    };
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
            visible: false
        });
    }

    showDatePicker() {
        this.setState({ visible: true });
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
                    <Button>Save Change</Button>
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
        width: 0
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
        console.log(this.state);
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

    render() {
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
}
