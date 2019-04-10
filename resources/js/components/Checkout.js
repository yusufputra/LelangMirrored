import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import {Layout, Row, Col, Steps, Card, Button, Divider, Avatar, Menu, Dropdown, Icon, Typography} from 'antd';

export default class Checkout extends Component {
  render() {
    const Step = Steps.Step;
    const { Title } = Typography;
    let msec = Date.parse("May 21, 2019");
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout>
          <Row gutter={16}>
            <center><h3>Batas Konformasi</h3></center>
            <center><Title level={1}><Countdown date={msec} /></Title></center>
          </Row>
          <Row gutter={16} style={{marginTop: '3%'}}>
            <Col>
              <Steps current={1}>
                <Step title="Menang Lelang" description="Menangkan lelang barang ini" />
                <Step title="Pembayaran" description="Lakukan pembayaran ke No. Rekening sebelum tenggat waktu" />
                <Step title="Verifikasi" description="Sedang memverifikasi data anda" />
                <Step title="Pengiriman" description="Barang sedang dikirim dengan No. Resi xxxxxx"/>
                <Step title="Selesai" description="Selamat menikmati"/>
              </Steps>
            </Col>
          </Row>
          <Row gutter={16} style={{marginTop: '1%'}}>
            <Col xl={16}>
              <Row gutter={16}>
                <Card title="Alamat Pengiriman" bordered={false}>
                  <b>Han Solo</b>
                  <p>10923810928</p>
                  <p>Jl. Muria No.24 Surabaya</p>
                  <Divider/>
                  <Button type="primary" style={{float:"right"}}>Ubah Alamat Pengiriman</Button>
                </Card>
              </Row>
              <Row gutter={16}  style={{marginTop: '1%', marginBottom:'1%'}}>
                <Card title="Rincian Barang" bordered={false}>
                  <Col xl={4}>
                    <Avatar shape="square" size={64} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/GrandLivina15XV2013White.jpg/250px-GrandLivina15XV2013White.jpg" />
                  </Col>
                  <Col xl={12}>
                    <Row gutter={16}>
                      <b>Grand Livina 1.5 V 2014</b>
                      <p style={{color:'orange'}}>Rp 140.000.000</p>
                    </Row>
                    <Row gutter={16}>
                      <Col xl={12}>
                        <p>Jumlah : 1</p>
                      </Col>
                      <Col xl={12}>
                        <p>Berat : 1100 kg</p>
                      </Col>
                    </Row>
                  </Col>
                  <Col xl={8}>
                    <Row gutter={16}>
                      <b>Durasi Pengiriman</b>
                    </Row>
                    <Row gutter={16} style={{marginTop: '2%'}}>
                      <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" href="#">
                          Pilih Durasi <Icon type="down" />
                        </a>
                      </Dropdown>
                    </Row>
                    
                  </Col>
                </Card>
              </Row>
            </Col>
            <Col xl={8}>
              <Card title="Ringkasan Belanja" bordered={false}>
                <Row gutter={16}>
                  <Col xl={15}>
                    <p>Total Belanja : </p>
                  </Col>
                  <Col xl={9}>
                    <p>Rp 140.000.000</p>
                  </Col>
                </Row>
                <Divider/>
                <Button type="primary" style={{width:'100%'}}>Lakukan Verifikasi</Button>
              </Card>
            </Col>
          </Row>
      </Layout>
    )
  }
}
