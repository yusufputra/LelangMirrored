import React, { Component } from 'react'
import { Layout, Row, Col, Tabs, Carousel, Comment, Avatar, Form, Button, List, Input, Table, Card, Icon, Menu, Typography, Divider, Spin, Breadcrumb, Skeleton } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import reqwest from 'reqwest';

import InfiniteScroll from 'react-infinite-scroller';
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

import '../app.css';

import './css/itemdetails.css';
import Axios from 'axios';
const TabPane = Tabs.TabPane;

const kurirList = [
    {
        "name": "JNE",
        "imgSource": "https://ecs7.tokopedia.net/img/kurir-jne.png"
    },
    {
        "name": "SiCepat",
        "imgSource": "https://ecs7.tokopedia.net/img/kurir-sicepat.png"
    },
    {
        "name": "TiKi",
        "imgSource": "https://ecs7.tokopedia.net/img/kurir-tiki.png"
    },
    {
        "name": "J&T",
        "imgSource": "https://ecs7.tokopedia.net/img/kurir-jnt.png"
    },
    {
        "name": "Pos Indonesia",
        "imgSource": "https://ecs7.tokopedia.net/img/kurir-pos.png"
    }
];

function callback(key) {
    console.log(key);
}

function onChange(a, b, c) {
    console.log(a, b, c);
}

const data = [];

const TextArea = Input.TextArea;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({
    onChange, onSubmit, submitting, value,
}) => (
        <div>
            <Form.Item>
                <TextArea rows={4} onChange={onChange} value={value} />
            </Form.Item>
            <Form.Item>
                <Button
                    htmlType="submit"
                    loading={submitting}
                    onClick={onSubmit}
                    type="primary"
                >
                    Send
        </Button>
            </Form.Item>
        </div>
    );
const penawaran = [];
export default class ItemDetails extends Component {
    state = {
        comments: [],
        chat: [],
        submitting: false,
        value: '',
        data: [],
        load: false,
        loading: false,
        hasMore: true,
        barang: [],
        foto: [],
        dataToko: [],
        penawaran: [],
        user: [],
        loggedin:true
    }
    handleSubmit = (value) => {
        this.setState({ load: true })
        console.log(localStorage.token)
        const idBarang = this.state.barang.id;
        const URL = '/api/penawaran-lelang/' + idBarang;
        const id = this.props.location.hash.substring(1);
        Axios.post(URL, {
            'penawaran': value
        },
            {
                headers: { Authorization: localStorage.token }
            }).then(ress => {
                console.log(ress)
                alert("Sukses Menawar");
                Axios.get('/api/barangdetail/' + id)
                    .then(resss => {
                        this.setState({ penawaran: resss.data.data.penawaran });
                    })
                this.setState({ load: false })
            }).catch(err => {
                alert("Masukkan angka yang lebih tinggi dan sesuai kelipatan");
                Axios.get('/api/barangdetail/' + id)
                    .then(resss => {
                        this.setState({ penawaran: resss.data.data.penawaran });
                    })
                this.setState({ load: false })
            })
    }
    componentWillMount() {
        this.setState({ load: true })
        const id = this.props.location.hash.substring(1);
        Axios.get('/api/barangdetail/' + id)
            .then(ress => {
                this.setState({ barang: ress.data.data });
                this.setState({ penawaran: this.state.barang.penawaran });
                this.setState({ foto: ress.data.data.foto });
                const data = [];
                for (let index = 0; index < this.state.barang.komentar.length; index++) {
                    const element = this.state.barang.komentar[index];
                    data.push({
                        author: element.username_pengguna,
                        avatar: element.pengguna.foto,
                        content: <p>{element.isi}</p>,
                        datetime: element.created_at,
                    })
                }
                this.setState({ comments: data });

                console.log(this.state.barang)
                Axios.get('/api/toko/' + this.state.barang.id_toko)
                    .then(ress => {
                        this.setState({ dataToko: ress.data.data });
                        console.log(this.state.dataToko);
                    })
            })
        Axios.get('/api/pengguna', { headers: { Authorization: localStorage.token } })
            .then(ress => {
                this.setState({ user: ress.data.data });
                console.log(this.state.user)
                this.setState({ load: false })
            }).catch(err=>{
                this.setState({ load: false })
                console.log(err);
                this.setState({ loggedin: false })
            })

    }
    componentDidMount() {
        this.fetchData((res) => {
            this.setState({
                data: res.results,
            });
        });
    }

    fetchData = (callback) => {
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

    handleInfiniteOnLoad = () => {
        let data = this.state.data;
        this.setState({
            loading: true,
        });
        if (data.length > 14) {
            message.warning('Infinite List loaded all');
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }
        this.fetchData((res) => {
            data = data.concat(res.results);
            this.setState({
                data,
                loading: false,
            });
        });
    }

    handleComment = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });
        const id = this.props.location.hash.substring(1);
        Axios.post('/api/barangdetail/' + id + '/komentar', {
            'isi': this.state.value
        }, {
                headers: {
                    Authorization: localStorage.token
                }
            }).then(ress => {
                console.log(ress);
            }).catch(err => {
                alert(err);
            })
        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    {
                        author: this.state.user.username,
                        avatar: this.state.user.foto,
                        content: <p>{this.state.value}</p>,
                        datetime: moment().fromNow(),
                    },
                    ...this.state.comments,
                ],
            });
        }, 1000);
    }

    handleChat = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
                chat: [
                    {
                        author: 'Han Solo',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        content: <p>{this.state.value}</p>,
                        datetime: moment().fromNow(),
                    },
                    ...this.state.chat,
                ],
            });
        }, 1000);
    }


    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }

    render() {
        const { comments, submitting, value, chat } = this.state;
        const { Meta } = Card;
        const start = (this.state.barang.waktu_mulai == undefined) ? '' : this.state.barang.waktu_mulai;
        const finish = (this.state.barang.waktu_akhir == undefined) ? '' : this.state.barang.waktu_akhir;
        // let t = now.split(/[- :]/);
        // let d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
        let startDate = Date.parse(start);
        let finishDate = Date.parse(finish);
        console.log(this.state.load +" "+ startDate +" "+ Date.now()) +" "+ (finishDate >= Date.now());
        return (
            <Layout>
                <Breadcrumb separator=">" style={{ padding: "16px 0" }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
                    <Breadcrumb.Item>An Application</Breadcrumb.Item>
                </Breadcrumb>
                <Row gutter={16}>
                    <Col xxl={20} xl={20}>
                        <Row gutter={16}>
                            <Col xxl={9} xl={9}>
                                <Skeleton loading={this.state.load} active>
                                    <Carousel afterChange={onChange} autoplay>
                                        {(this.state.foto.length == 0) &&
                                            <div><img src="https://imgur.com/f0iMfy9.png" /></div>}
                                        {(this.state.foto.length != 0) && this.state.barang.foto.map(ress => (<div><img src={ress} /></div>))}
                                    </Carousel>
                                </Skeleton>
                            </Col>
                            <Col xxl={15} xl={15}>
                                <Menu style={{ padding: 16 }}>
                                    <h2>{this.state.barang.nama_barang}</h2>
                                    <Card bordered>
                                        <h5>Histori Penawaran</h5>
                                        <Row type="flex">
                                            <Col
                                                xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}
                                            >
                                                <b>Penawar</b>
                                            </Col>
                                            <Col
                                                xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}
                                            >
                                                <b>Harga Penawaran</b>
                                            </Col>
                                            <Col
                                                xs={0} sm={0} md={0} lg={8} xl={8} xxl={8}
                                            >
                                                <b>Waktu</b>
                                            </Col>
                                        </Row>

                                        <div className="demo-infinite-container">
                                            <InfiniteScroll
                                                initialLoad={false}
                                                pageStart={0}
                                                loadMore={this.handleInfiniteOnLoad}
                                                hasMore={!this.state.loading && this.state.hasMore}
                                                useWindow={false}
                                            >
                                                <List
                                                    dataSource={this.state.penawaran}
                                                    renderItem={item => (
                                                        <List.Item key={item.id}>
                                                            <List.Item.Meta
                                                                avatar={<Avatar src={item.pengguna.foto} />}
                                                                title={<a href="https://ant.design">{item.username_pengguna}</a>}
                                                                description={item.created_at}
                                                            />
                                                            <div>{item.harga_penawaran}</div>
                                                        </List.Item>
                                                    )}
                                                >
                                                    {this.state.loading && this.state.hasMore && (
                                                        <div className="demo-loading-container">
                                                            <Spin />
                                                        </div>
                                                    )}
                                                </List>
                                            </InfiniteScroll>
                                        </div>
                                        <div style={{ textAlign: "center", marginTop: 16 }}>

                                            <Input.Search
                                                placeholder="Masukkan harga penawaranmu"
                                                addonBefore="Rp"
                                                enterButton="Tawar Barang"
                                                size="large"
                                                disabled={this.state.load ||( (startDate <= Date.now()) && !(finishDate >= Date.now()) || !this.state.loggedin)}
                                                onSearch={(value) => this.handleSubmit(value)}
                                            />
                                            {this.state.load && <Spin />}
                                        </div>
                                    </Card>
                                </Menu>
                            </Col>
                        </Row>
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="Informasi Produk" key="1">
                                description section
            </TabPane>
                            <TabPane tab="Live Chat" key="2">
                                {chat.length > 0 && <CommentList comments={chat} />}
                                <Comment
                                    avatar={(
                                        <Avatar
                                            src={"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}
                                            alt="Han Solo"
                                        />
                                    )}
                                    content={(
                                        <Editor
                                            onChange={this.handleChange}
                                            onSubmit={this.handleChat}
                                            submitting={submitting}
                                            value={value}
                                        />
                                    )}
                                />
                            </TabPane>
                            <TabPane tab="Komentar" key="3">
                                {comments.length > 0 && <CommentList comments={comments} />}
                                <Comment
                                    avatar={(
                                        <Avatar
                                            src={this.state.user.foto}
                                            alt={this.state.user.username}
                                        />
                                    )}
                                    content={(
                                        <Editor
                                            onChange={this.handleChange}
                                            onSubmit={this.handleComment}
                                            submitting={submitting}
                                            value={value}
                                        />
                                    )}
                                />
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col xxl={4} xl={4}>
                        <Skeleton loading={this.state.load} active>
                            <Card
                                cover={<img alt="example" src={this.state.dataToko.foto} />}
                            >
                                <Meta
                                    title={<Link to={'/shop#' + this.state.dataToko.id}><Typography.Title level={4}>{this.state.dataToko.nama_toko}</Typography.Title></Link>}
                                    description={(
                                        <div style={{ textAlign: "center" }}>
                                            <div>
                                                {this.state.dataToko.nama_jalan + ', ' + this.state.dataToko.kode_pos}
                                            </div>
                                            <Divider orientation="left" style={{ fontSize: 8 }}>
                                                Pengiriman yang didukung
                    </Divider>
                                            <List
                                                dataSource={kurirList}
                                                renderItem={(item) => (
                                                    <img src={item.imgSource} style={{ height: 48, maxWidth: '100%' }} title={item.name} />
                                                )}
                                            />
                                        </div>
                                    )}
                                />
                            </Card>
                        </Skeleton>
                    </Col>
                </Row>
            </Layout>
        );
    }
}
