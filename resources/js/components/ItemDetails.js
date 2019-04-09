import React, { Component } from 'react'
import { Layout, Row, Col, Tabs, Carousel, Comment, Avatar, Form, Button, List, Input, Table, Card, Icon, } from 'antd';
import moment from 'moment';

import './css/itemdetails.css';
const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

function onChange(a, b, c) {
  console.log(a, b, c);
}
const columns = [{
  title: 'Lot No',
  dataIndex: 'lot',
}, {
  title: 'Harga Limit',
  dataIndex: 'limit',
}, {
  title: 'Lokasi',
  dataIndex: 'lokasi',
}, {
  title: 'Jadwal Lelang',
  dataIndex: 'jadwal',
}, {
  title: 'Note',
  dataIndex: 'note',
}];

const data = [{
  key: '1',
  lot: 'John Brown',
  limit: '￥300,000.00',
  lokasi: 'New York No. 1 Lake Park',
  jadwal: '20 Maret 2019',
  note: 'Semangat',
}]

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
                <center><h3>Informasi Pelelangan</h3></center>
                <Table
                  columns={columns}
                  dataSource={data}
                  bordered
                  title={() => 'Info Lelang'}
                  pagination={false}
                />
              </Col>
            </Row>
          </Col>
          <Col xxl={4} xl={4}>
            <Card
              cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
            >
              <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title="Card title"
                description="This is the description"
              />
            </Card>
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
      </Layout>
    )
  }
}
