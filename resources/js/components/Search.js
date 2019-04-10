import React from 'react';
import { Breadcrumb, Menu, Icon, Button, Row, Col, List, Card, Select, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import ListBarang from './ListBarang';

const { SubMenu } = Menu;

const Option = Select.Option;

function handleChange(value) {
	console.log(`selected ${value}`);
}

export default class Search extends React.PureComponent {

	render() {
		return (
			<Col>
				<Row type="flex" style={{ paddingBottom: 8 }}>
					<Col xs={24} sm={24} md={16} lg={18} xl={18} xxl={18}>
						<Breadcrumb separator=">" style={{ padding: '8px 0' }}>
							<Breadcrumb.Item><Link to="/">Beranda</Link></Breadcrumb.Item>
							<Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
							<Breadcrumb.Item href="">Application List</Breadcrumb.Item>
						</Breadcrumb>
					</Col>
					<Col xs={24} sm={24} md={8} lg={6} xl={6} xxl={6}
						style={{ textAlign: 'right' }}
					>
						<Select defaultValue="terbaru" style={{ width: 300 }} onChange={handleChange}>
							<Option value="terbaru">Urutkan : Barang Terbaru</Option>
							<Option value="hargaAsc">Urutkan : Harga Terendah ke Tertinggi</Option>
							<Option value="hargaDesc">Urutkan : Harga Tertinggi ke Terendah</Option>
						</Select>
					</Col>
				</Row>
				<Row type="flex" gutter={16}>
					<Col
						xs={24} sm={24} md={8} lg={6} xl={6} xxl={6}
					>
						<Menu
							mode="inline"
							defaultSelectedKeys={['1']}
							defaultOpenKeys={['sub1']}
							style={{ textAlign: 'center', padding: 8 }}
						>
							<Menu.Item>
								Filter
							</Menu.Item>
							<SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
								<Menu.Item key="1">option1</Menu.Item>
								<Menu.Item key="2">option2</Menu.Item>
								<Menu.Item key="3">option3</Menu.Item>
								<Menu.Item key="4">option4</Menu.Item>
							</SubMenu>
							<SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
								<Menu.Item key="5">option5</Menu.Item>
								<Menu.Item key="6">option6</Menu.Item>
								<Menu.Item key="7">option7</Menu.Item>
								<Menu.Item key="8">option8</Menu.Item>
							</SubMenu>
							<SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
								<Menu.Item key="9">option9</Menu.Item>
								<Menu.Item key="10">option10</Menu.Item>
								<Menu.Item key="11">option11</Menu.Item>
								<Menu.Item key="12">option12</Menu.Item>
							</SubMenu>
							<Button>
								Filter
						</Button>
						</Menu>
					</Col>
					<ListBarang />
				</Row>
			</Col>
		);
	}
}