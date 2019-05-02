import React, { Component } from 'react';
import { Carousel, Layout, Row, Spin, List, Card, Divider, Menu } from 'antd';
import { Link } from 'react-router-dom';
import './css/landing.css';

export default class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hotItem: [],
			rekomItem: [],
			loading: true,
		}
	}

	componentWillMount() {
		axios.get('/api/hotItem')
			.then(ress => {
				console.log(ress.data)
				const data = [];
				for (let index = 0; index < ress.data.length; index++) {
					const element = ress.data[index];
					data.push({
						id: element.id,
						title: element.nama_barang,
						latestBidPrice: element.max_bid,
						image: (element.foto.length == 0) ? "http://sifatit.com/wp-content/uploads/2012/07/dummy-500x337.jpg" : element.foto[0]
					})
				}
				this.setState({ hotItem: data });
			})
		axios.get('/api/rekomen')
			.then(ress => {
				const data = [];
				for (let index = 0; index < ress.data.length; index++) {
					const element = ress.data[index];
					data.push({
						id: element.id,
						title: element.nama_barang,
						latestBidPrice: element.max_bid,
						image: (element.foto.length == 0) ? "http://sifatit.com/wp-content/uploads/2012/07/dummy-500x337.jpg" : element.foto[0]
					})
				}
				this.setState({ loading: false });
				this.setState({ rekomItem: data });
			})
	}



	render() {
		if (this.state.loading) {
			return (
				<div style={{ textAlign: 'center' }}>
					<Spin />
				</div>
			)
		}
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
						dataSource={this.state.hotItem}
						renderItem={item => (
							<Link to={'/itemDetails#' + item.id}>
								<List.Item>
									<Card
										hoverable
										cover={<img alt="example" src={item.image} />}
									>
										<Card.Meta
											title={item.title}
											description={
												<p style={{ color: 'orange' }}>
													{`Rp ${item.latestBidPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}
												</p>
											}
										/>
									</Card>
								</List.Item>
							</Link>
						)}
					/>
					<Divider orientation="left">Rekomendasi</Divider>
					<List
						grid={{
							gutter: 16, xs: 2, sm: 4, md: 4, lg: 6, xl: 6, xxl: 8
						}}
						dataSource={this.state.rekomItem}
						renderItem={item => (
							<Link to={'/itemDetails#' + item.id}>
								<List.Item>
									<Card
										hoverable
										cover={<img alt="example" src={item.image} />}
									>
										<Card.Meta
											title={item.title}
											description={`Rp ${item.latestBidPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}
										/>
									</Card>
								</List.Item>
							</Link>
						)}
					/>
				</Menu>
			</Layout>
		)
	}
}
