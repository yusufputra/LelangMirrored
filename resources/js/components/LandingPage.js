import React, { Component } from 'react';
import { Carousel, Layout, Row, Col, List, Card, Divider } from 'antd';

import './css/landing.css';
const data = [
	{
		title: 'Headset Gaming',
		latestBidPrice: 1500000
	},
	{
		title: 'Headset Audiophile',
		latestBidPrice: 12000000
	},
	{
		title: 'Keyboard 2nd Blue Switch',
		latestBidPrice: 750000
	},
	{
		title: 'Mouse Gaming',
		latestBidPrice: 120000
	},
];
export default class LandingPage extends Component {
  render() {
    return (
      <Layout>
          <Row gutter={16} style={{marginBottom: '20px'}}>
              <Col xxl={24} xl={24} xs={24}>
                <Carousel autoplay>
                    <div><h3>1</h3></div>
                    <div><h3>2</h3></div>
                    <div><h3>3</h3></div>
                    <div><h3>4</h3></div>
                </Carousel>
              </Col>
          </Row>
          <Col>
            <center><h3>Barang Panas</h3></center>
          </Col>
          <Divider/>
          <Row gutter={16}>
              <Col xxl={24} xl={24} xs={24}>
				<List
					grid={{
						gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 5
					}}
					dataSource={data}
					renderItem={item => (
						<List.Item>
							<Card
								hoverable
								cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
							>
								<Card.Meta
									title={item.title}
									description={`Rp ${item.latestBidPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}
								/>
							</Card>
						</List.Item>
					)}
				/>
              </Col>
          </Row>
          <Col>
            <center><h3>REKOMENDASI</h3></center>
          </Col>
          <Divider/>
          <Row gutter={16}>
              <Col xxl={24} xl={24} xs={24}>
				<List
					grid={{
						gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 5
					}}
					dataSource={data}
					renderItem={item => (
						<List.Item>
							<Card
								hoverable
								cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
							>
								<Card.Meta
									title={item.title}
									description={`Rp ${item.latestBidPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}
								/>
							</Card>
						</List.Item>
					)}
				/>
              </Col>
          </Row>
      </Layout>
    )
  }
}
