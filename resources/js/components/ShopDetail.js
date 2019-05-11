import React from 'react';


import { Row, Col, Menu, Select, List } from 'antd';
import ListBarang from './ListBarang';
import axios from 'axios';

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
    constructor(props) {
        super(props);
        this.state = {
            dataToko: [],
            barangToko: [],
        }
    }

    componentWillMount() {
        const id = this.props.location.hash.substring(1);
        axios.get('/api/toko/' + id)
            .then(ress => {
                this.setState({ dataToko: ress.data.data });
                console.log(this.state.dataToko)
            })
        axios.get('/api/barang/' + id)
            .then(ress => {
                this.setState({ barangToko: ress.data });
                console.log(ress.data)
            })
    }
    render() {
        return (
            <Col>
                <Menu>
                    <Row type="flex" gutter={16}>
                        <Col
                            xs={24} sm={24} md={8} lg={6} xl={6} xxl={6}
                        >
                            <img style={{ width: '100%', margin: 8 }} src={this.state.dataToko.foto} />
                        </Col>
                        <Col
                            xs={24} sm={24} md={16} lg={18} xl={18} xxl={18}
                            style={{ padding: 8 }}
                        >
                            <h3>{this.state.dataToko.nama_toko}</h3>
                            <p>{this.state.dataToko.nama_jalan + ', ' + this.state.dataToko.kode_pos}</p>
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
                    <ListBarang data={this.state.barangToko} />

                </Row>
            </Col>
        );
    }
}
