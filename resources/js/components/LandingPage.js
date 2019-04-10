import React, { Component } from 'react';
import { Carousel, Layout, Row, Col, List, Card, Divider, Menu } from 'antd';

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
				<Row style={{ marginBottom: '20px' }}>
					<Carousel autoplay>
						<div><h3>1</h3></div>
						<div><h3>2</h3></div>
						<div><h3>3</h3></div>
						<div><h3>4</h3></div>
					</Carousel>
				</Row>
				<Menu style={{ padding: "0 32px" }}>
					<Divider orientation="left">Barang Panas</Divider>
					<List
						grid={{
							gutter: 16, xs: 2, sm: 4, md: 4, lg: 6, xl: 6, xxl: 8
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
					<Divider orientation="left">Rekomendasi</Divider>
					<List
						grid={{
							gutter: 16, xs: 2, sm: 4, md: 4, lg: 6, xl: 6, xxl: 8
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
				</Menu>
			</Layout>
		)
	}
}
