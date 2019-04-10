import React, { Component } from 'react'
import { Layout, Row, Col, Tabs, Carousel, Comment, Avatar, Form, Button, List, Input, Table, Card, Icon, Menu, Typography, Divider, Spin, Breadcrumb } from 'antd';
import moment from 'moment';

import reqwest from 'reqwest';

import InfiniteScroll from 'react-infinite-scroller';
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

import '../app.css';

import './css/itemdetails.css';
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

const data = [
  {
    id_penawaran: 1,
    id_barang: 1,
    email_penawar: 'admin@lelang.in',
    harga_penawaran: 600000,
    waktu: new Date()
  },
  {
    id_penawaran: 2,
    id_barang: 1,
    email_penawar: 'admin@lelang.in',
    harga_penawaran: 500000,
    waktu: new Date(new Date().getTime() - (60 * 1000 * 30))
  },
  {
    id_penawaran: '1',
    id_barang: '1',
    email_penawar: 'admin@lelang.in',
    harga_penawaran: 400000,
    waktu: new Date(new Date().getTime() - (60 * 1000 * 45))
  }
];

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
                  <div><img src="https://imgur.com/v7bLgPg.png" /></div>
                  <div><img src="https://imgur.com/GHt0aF8.png" /></div>
                  <div><img src="https://imgur.com/f0iMfy9.png" /></div>
                </Carousel>
              </Col>
              <Col xxl={15} xl={15}>
                <Menu style={{ padding: 16 }}>
                  <h2>Headset Gaming</h2>
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
                      dataSource={data}
                      renderItem={item => (
                        <List.Item>
                          <Row type="flex" style={{ width: '100%' }}>
                            <Col
                              xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}
                            >
                              {item.email_penawar}
                            </Col>
                            <Col
                              xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}
                            >
                              {item.harga_penawaran}
                            </Col>
                            <Col
                              xs={0} sm={0} md={0} lg={8} xl={8} xxl={8}
                            >
                              {item.waktu.toISOString()}
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
                          dataSource={this.state.data}
                          renderItem={item => (
                            <List.Item key={item.id}>
                              <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href="https://ant.design">{item.name.last}</a>}
                                description={item.email}
                              />
                              <div>Content</div>
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
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
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
              cover={<img alt="example" src="data:image/png;base64,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" />}
            >
              <Meta
                title={<Typography.Title level={4}>Galaxy Solusindo</Typography.Title>}
                description={(
                  <div style={{ textAlign: "center" }}>
                    <div>
                      Cyber Mall Lantai 2 Malang
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
