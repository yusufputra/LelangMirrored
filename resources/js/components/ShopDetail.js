import React from 'react';

import { Row, Col, Menu, Select, List } from 'antd';
import ListBarang from './ListBarang';

const { Option } = Select;

function handleChange(value) {
	console.log(`selected ${value}`);
}

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

const data = [
	'Headset',
	'Perlengkapan Komputer',
	'Pakaian',
	'Laptop'
];

export default class ShopDetail extends React.PureComponent {
	render() {
		return (
			<Col>
				<Menu>
					<Row type="flex" gutter={16}>
						<Col
							xs={24} sm={24} md={8} lg={6} xl={6} xxl={6}
						>
							<img style={{ width: '100%', margin: 8 }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAkFBMVEUAAAD///+nqq+kq7GprLHg4OCvsreUl5ri4uKvr6+RkZHw8PCIiIimpqbk5OT4+Pja2tq8vLy2trZOTlA4ODhnZ2cvLy9fX1/MzMwoKCikpKSDg4OampoLCwtaWlp8fHw+QEFzc3OKj5MXFxcrKyszMzNISEh0dHTT09OdoKUTExMeHh6VlZVUVFZ+goiss7kbfz8DAAAHBElEQVR4nO2a6baiOhCFDeZEBcWRgwIqzrO+/9vdpCoMDn2712q17V77+3NMCByyraqkKlYqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgn2XiJsfaQxJ39Kdf7g2MK4Odkg+oVqtShX/69d5DqqQjpXNPVe4yI1isT2H/37WIhXKqDwTQXHY8Yj/bKcKZLvPb3GGnTviN+2cmfvdNb/8cztroH0ogrQQbZaykalxDqoD7Rp7IGd4/syE675vAE1BX5q9xJH/rPbL9w640QEcJvqklRGNg+b5/5l+mQXqjgbw458lqr2Plwlwe6dhYHqDYG3pCXD3lcHSZzcA0SYO8b2r61slxRUODY7KvhLE1qH48fddMf0z/SgOpauury+5NtFApdd9qkBauYSIBafB97S5d4RnDmgnhmob1IFe0Xz7Fn3KlgYrS2+sn+SsaHAImbAgRWg32M9sXCTHTY4bC21cCIaLKlQbea+f3K5Q1UA/tsqZMmGAzeaDBcBiVR7fF9C4eeOJo/nSEpyVomY8fqkG1mm+I0llzXtocNVWV0evC/EBdJQ3Y0tNhvlLkGqyKPpeG1q2rfKwGTibBzNGLoTrpT4sB98yVsQOpnM3B3lXSoE3TaYt2lyhp4BV9rIHWy874IzXQs95wWyqzS1Ymfp261jlaFC0nxV23GvSFSLNmpsFAiEnWxxpshXWFT9WgRs0NKaA1MI2pVAn1fvdUc1C+61aDkxCLrFnSIM36SAO9MriCQ0OuQfNjNNCWTl+8liBbJE0r1okES3PKnGDCi7zeI7UO+4VGz6pBdsAm0xdlDZrUZz9o3daVmAfqpSKiNaP7ORpUVWwapzw40D7Z1XtkvmAJnG5KH5btYvFvm22Tjn6eQZCBcDzw9TXbtzR9oq87j0JopxsX93+MBmwG+0axWTLXpjpKFBqsYp012bVRp0VbnzKmTmtM7VbH19TrXaOIzZki6vP9rvaj2PM5OiS+p+PtXo/Xt3eGn6MBm3xcaEDxIOjtgnxcjSLFJX3uv/+ceOBwPlgqIigTAL5LK4HixCG3gyfxOfGAXSEsZ4hBMYTi4Y4i57M0OLAj1b1ssfyjcBgk049zOzAbwmxA4NDCVpPP1GCUh8RPSLJJA+mYj4nMksddWFMU6pZnvWWiPcL5qRrsmzFzesrjfhPWgEKiQx6vTaBvunWqt64pHQi5nrR5qgafBWtA0zTrg5JnLp1KGbSUvCTKXpzeaLCPtrzw+Z5799Chl/zGK3W8+OeDnknJF7QJRFkoXO6kapgN8klJmmPzWoNDqaAY3T3067cinSfuVX0pWUxcnpVysxpSv3bRM+Zt8sAxBZBKzViJzihtgT0RojdYfhtWh7uH/mUa2D1Sq6vO2fmBcQKqrdpKOs3RHLoolsOgE4br44Z+3DRsqJc0WLvWpMdN1yRco2mT0XGwyXIHbqJxrfGFLcq0ezbFCnl0UHk5Wc6U/avRVOUHLnKVDxvV5vNZKXWMbopp29wzzMRJg7xUOBYiMM2S77RNFjXysx7fJJ3dwru0BoPc2drXFc4XYO3gzK31XJWOnKTq/+g2rYFNFIimzh4nYRgGddKGNMi3wayBEMNwQgysBjqL8ru9XtenjdJaiO5gtFyORmQHQ9F2zRObbbF94fQJawd8bnC8XJ+5yccVxkopcWwP04qZjs/9oRDjH2lQWBVr0MlmtzXVhEluWaSBL3rcamWPfh1Z3ki+kF6qpUMnU0tp3Aa3vf27MImi5xspVuZF69w9+R876J76p1OfrMdqYI/pGlYDa1ikQT27GL1JA/OVj7nF1dNCg9KXVxmvNzK9uT8h722V7KDyWINjeSl9rIHV9+0afCvJGQInCOur44Ts4Dl2dEis0cnr/ub+pRDJTzSokAaVQRy1WtGQGp9lB3pnZLNl3rrvm+bHCJw3SS6zmn0SUZzDFqytBl92aDkeWAdfsgaWthn/WIN8hGse8UYNAusMeXlktInMqausZS+e0iELeUh+BHFY0f7oez2kAmEk2ryEtAo70JPaTmebTdwRolhVR+Q7DzQ4ZeXHgD58iS+u0nayUPNKdtJOsJFmXePvVfFLg3UmQdWWm/i1c8wrrs0KYeATF94ndvIhOv6PqLTY9jiGPtDAlB8FP8JbkBXZ1jt2jXvnwhrkvy64Ymar7aaQVniC638xQ1s77lGrvqXS+dCn90461Lk1jZG9oU5racefmlE2s4p8sw7uIzs8obgQdO34WeUd6FSBfn5UvSSDm0vp7lK1v09S9hTmH+UQxnPCrQXlwH/YJPOMOLxdEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAv8h/NulzH7CbEfYAAAAASUVORK5CYII=" />
						</Col>
						<Col
							xs={24} sm={24} md={16} lg={18} xl={18} xxl={18}
							style={{ padding: 8 }}
						>
							<h3>Galaxy Solusindo</h3>
							<p>Cyber Mall Lantai 2 Malang</p>
							<p style={{ fontWeight: 'bold', padding: "8px 0" }}>
								Deskripsi Toko
							</p>
							<p>
								Kami melelang barang-barang berkualitas
							</p>
							<p style={{ fontWeight: 'bold', padding: "8px 0" }}>
								Pengiriman yang didukung
							</p>
							<List
								dataSource={kurirList}
								renderItem={(item) => (
									<img src={item.imgSource} style={{ height: 48, maxWidth: '100%' }} title={item.name} />
								)}
							/>
						</Col>
					</Row>
				</Menu>
				<div style={{ textAlign: "right", padding: "16px 0" }}>
					<Select defaultValue="terbaru" style={{ width: 300 }} onChange={handleChange}>
						<Option value="terbaru">Urutkan : Barang Terbaru</Option>
						<Option value="hargaAsc">Urutkan : Harga Terendah ke Tertinggi</Option>
						<Option value="hargaDesc">Urutkan : Harga Tertinggi ke Terendah</Option>
					</Select>
				</div>
				<Row type="flex" gutter={16}>
					<Col
						xs={24} sm={24} md={8} lg={6} xl={6} xxl={6}
					>
						<Menu
							style={{ textAlign: 'center', padding: 8 }}
						>
							<h5>Pilih Kategori</h5>
							<List
								size="small"
								bordered
								dataSource={data}
								renderItem={item => (<List.Item>{item}</List.Item>)}
							/>
						</Menu>
					</Col>
					<ListBarang />
				</Row>
			</Col>
		);
	}
}