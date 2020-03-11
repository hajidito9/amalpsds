import React, { Component } from 'react';
import { View,BackHandler } from 'react-native';
import {
    Container,
    Header,
    Content,
    Form,
    Item,
    Text,
    Input,
    Label,
    Button,
    List,
    ListItem,
    DatePicker,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import NumberFormat from 'react-number-format';
let uuid = require('react-native-uuid');
import { connect } from 'react-redux';
import { addNasabah } from '../publics/redux/actions/nasabah';
import { addDpEmas } from '../publics/redux/actions/emas';
import { addJaminan } from '../publics/redux/actions/jaminan';
import { addDpCash } from '../publics/redux/actions/cash';
import { addPegawai } from '../publics/redux/actions/pegawai';
import { addMikro } from '../publics/redux/actions/mikro';
import { getPengajuan } from '../publics/redux/actions/pengajuan';
import { addKendaraanNasabah } from '../publics/redux/actions/kendaraan';
import { addAngsuran } from '../publics/redux/actions/angsuran';

class PengajuanStatus extends Component {
    constructor() {
        super();
        this.state = {
            harga: 0,
            angsuran: 0,
            merkKendaraan: '',
            tipeKendaraan: '',
            statusKendaraan: '',
            warnaKendaraan: '',
            tenor: 0,
            nama: '',
            cabang: '',
            tipePekerjaan: '',
            angsuran: 0,
            marhunBih: 0,
            lunas:false,
            verifikasi:false,
            status:''
        };
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Data Pengajuan',
            headerTintColor: "white",
            headerTitleStyle: {
                // width: '90%',
                textAlign: 'center',
                color: 'white'
            },
            headerLeft: null,
            headerStyle: {
                elevation: null,
                backgroundColor: '#2ECC71'
            },
        }
    }

    componentDidMount = async () => {
        BackHandler.addEventListener('hardwareBackPress', function() {
            return true;
        });
        let user_id = await AsyncStorage.getItem("userId")
        await this.props.dispatch(getPengajuan(user_id))
        // console.warn(this.props.pengajuanProp.dataPengajuanNasabah)
        this.props.pengajuanProp.dataPengajuanNasabah.map((item, i) => 
        // console.warn(item.verifikasi)
        this.setState({tipePekerjaan:item.jenis_pekerjaan,nama:item.nmnasabah
        ,verifikasi:item.verifikasi
        ,lunas:item.lunas
        ,tenor:item.tenor
        ,harga:item.harga
        ,marhunBih:item.marhunbih
        ,angsuran:item.angsuran
        ,cabang:item.nmcabang
        ,merkKendaraan:item.merk
        ,tipeKendaraan:item.tipe
        ,statusKendaraan:item.status
        ,warnaKendaraan:item.warna})
        )
        if (this.state.lunas){
            this.setState({status:'Lunas'})
        }else{
            this.setState({status:'Belum Lunas'})
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <View style={{ marginTop: '3%' }} >
                        <Item stackedLabel>
                            <Label style={{ marginLeft: '1%', fontSize: 16 }}>Nama Nasabah</Label>
                            <Input style={{ color: "black", fontWeight: 'bold' }} editable={false} value={this.state.nama} />
                        </Item>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{ marginLeft: '2%', fontWeight: 'bold' }}>Data Pengajuan </Text>
                        <Text style={{color:this.state.verifikasi == true && this.state.lunas == true ? 'green' : 'red'}}>({this.state.verifikasi == true ? this.state.status : "Belum Disetujui"})</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <List>
                                    <ListItem style={{ alignSelf: 'flex-start' }}>
                                        <Text style={{ color: 'grey' }}>Kendaraan</Text>
                                    </ListItem>
                                    <ListItem style={{ alignSelf: 'flex-start' }}>
                                        <Text style={{ color: 'grey' }}>Tipe Nasabah</Text>
                                    </ListItem>
                                    <ListItem style={{ alignSelf: 'flex-start' }}>
                                        <Text style={{ color: 'grey' }}>Jangka Waktu</Text>
                                    </ListItem>
                                    <ListItem style={{ alignSelf: 'flex-start' }}>
                                        <Text style={{ color: 'grey' }}>Harga Kendaraan</Text>
                                    </ListItem>
                                    <ListItem style={{ alignSelf: 'flex-start' }}>
                                        <Text style={{ color: 'grey' }}>Marhun Bih</Text>
                                    </ListItem>
                                    <ListItem style={{ alignSelf: 'flex-start' }}>
                                        <Text style={{ color: 'grey', alignSelf: 'flex-start' }}>Biaya Angsuran</Text>
                                    </ListItem>
                                </List>
                            </View>
                            <View style={{ marginLeft: '-10%', flexDirection: 'column' }}>
                                <List>
                                    <ListItem >
                                        <Text style={{ color: "black", alignSelf: 'flex-end' }}>: {this.state.merkKendaraan + ' ' + this.state.tipeKendaraan + ' ' + this.state.statusKendaraan + ' (' + this.state.warnaKendaraan + ')'}</Text>
                                    </ListItem>
                                    <ListItem >
                                        <Text style={{ color: "black" }}>: {this.state.tipePekerjaan}</Text>
                                    </ListItem>
                                    <ListItem >
                                        <Text style={{ color: "black", alignSelf: 'flex-end' }}>: {this.state.tenor}</Text>
                                    </ListItem>
                                    <ListItem >
                                        <NumberFormat value={this.state.harga} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ color: "black", alignSelf: 'flex-end' }}>: {value}</Text>} />
                                    </ListItem>
                                    <ListItem >
                                        <NumberFormat value={this.state.marhunBih} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ color: "black", alignSelf: 'flex-end' }}>: {value}</Text>} />
                                    </ListItem>
                                    <ListItem >
                                        <NumberFormat value={this.state.angsuran} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ color: "black", alignSelf: 'flex-end' }}>: {value}</Text>} />
                                    </ListItem>
                                </List>
                            </View>
                        </View>
        <Text style={{ marginLeft: '2%', fontWeight: 'bold' }}>Lokasi Akad</Text>
                        <Text style={{ marginLeft: '5%', marginTop: '2%', color: 'grey' }}>{this.state.cabang}</Text>
                        {/* <View style={{ marginTop: '5%', marginBottom: '5%' }}>
                            <Button style={{ justifyContent: 'center', alignSelf: 'center', width: '90%' }} success onPress={() => this.addPengajuan()}>
                                <Text>Lanjut</Text>
                            </Button>
                        </View> */}
                    </View>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        pengajuanProp: state.pengajuan,
    }
}

export default connect(mapStateToProps)(PengajuanStatus);