import React from 'react';
import { List, Col, Pagination, Card } from 'antd';

const data = [
	{
		title: 'Title 1',
	},
	{
		title: 'Title 2',
	},
	{
		title: 'Title 3',
	},
	{
		title: 'Title 4',
	},
	{
		title: 'Title 5',
	},
	{
		title: 'Title 6',
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
									description="www.instagram.com"
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
