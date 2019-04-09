import React from 'react';
import { List, Col, Pagination, Card } from 'antd';

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
	{
		title: 'Jaket Navi [LIMITED EDITION]',
		latestBidPrice: 1800000
	},
	{
		title: 'Laptop ROG i7 2018',
		latestBidPrice: 11000000
	},
];


function onShowSizeChange(current, pageSize) {
	console.log(current, pageSize);
}

function onChange(pageNumber) {
	console.log('Page: ', pageNumber);
}

export default class ListBarang extends React.PureComponent {

	render() {
		return (
			<Col
				xs={24} sm={24} md={16} lg={18} xl={18} xxl={18}
				style={{ textAlign: 'center' }}
			>
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
				<Pagination showSizeChanger showQuickJumper onShowSizeChange={onShowSizeChange} onChange={onChange} defaultCurrent={1} total={500} />
			</Col>
		);
	}
}
