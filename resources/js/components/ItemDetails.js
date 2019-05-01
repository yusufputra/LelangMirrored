import React, { Component } from 'react'
import { Layout, Row, Col, Tabs, Carousel, Comment, Avatar, Form, Button, List, Input, Table, Card, Icon, Menu, Typography, Divider, Spin, Breadcrumb } from 'antd';
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

export default class ItemDetails extends Component {
    state = {
        comments: [],
        chat: [],
        submitting: false,
        value: '',
        data: [],
        loading: false,
        hasMore: true,
        barang: [],
        foto: [],
        dataToko: []
    }

    componentWillMount() {
        const id = this.props.location.hash.substring(1);
        Axios.get('/api/barangdetail/' + id)
            .then(ress => {
                this.setState({ barang: ress.data.data });
                this.setState({ foto: ress.data.data.foto })
                console.log(this.state.barang.penawaran)
                Axios.get('/api/toko/' + this.state.barang.id_toko)
                    .then(ress => {
                        this.setState({ dataToko: ress.data.data });
                        console.log(this.state.dataToko)
                    })
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

        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    {
                        author: 'Han Solo',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
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
                                <Carousel afterChange={onChange} autoplay>
                                    {(this.state.foto.length == 0) &&
                                        <div><img src="https://imgur.com/f0iMfy9.png" /></div>}
                                    {(this.state.foto.length != 0) && this.state.barang.foto.map(ress => (<div><img src={ress} /></div>))}
                                </Carousel>
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
                                        <List
                                            size="small"
                                            bordered
                                            dataSource={this.state.barang.penawaran}
                                            renderItem={item => (
                                                <List.Item>
                                                    <Row type="flex" style={{ width: '100%' }}>
                                                        <Col
                                                            xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}
                                                        >
                                                            {item.username_pengguna}
                                                        </Col>
                                                        <Col
                                                            xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}
                                                        >
                                                            {item.harga_penawaran}
                                                        </Col>
                                                        <Col
                                                            xs={0} sm={0} md={0} lg={8} xl={8} xxl={8}
                                                        >
                                                            {item.created_at}
                                                        </Col>
                                                    </Row>
                                                </List.Item>
                                            )}
                                        />
                                        <div className="demo-infinite-container">
                                            <InfiniteScroll
                                                initialLoad={false}
                                                pageStart={0}
                                                loadMore={this.handleInfiniteOnLoad}
                                                hasMore={!this.state.loading && this.state.hasMore}
                                                useWindow={false}
                                            >
                                                <List
                                                    dataSource={this.state.barang.penawaran}
                                                    renderItem={item => (
                                                        <List.Item key={item.id}>
                                                            <List.Item.Meta
                                                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                                                title={<a href="https://ant.design">{item.username_pengguna}</a>}
                                                                description={item.created_at}
                                                            />
                                                            <div>Bid</div>
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
                                                onSearch={value => console.log(value)}
                                            />
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
                                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                            alt="Han Solo"
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
                    </Col>
                </Row>
            </Layout>
        );
    }
}
