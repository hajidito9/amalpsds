import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
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
import { hapusNasabah,getDpCash, getDpJaminan, getDpTabEmas } from '../publics/redux/actions/nasabah';
import { hapusEmas } from '../publics/redux/actions/emas';
import { hapusJaminan } from '../publics/redux/actions/jaminan';
import { hapusCash } from '../publics/redux/actions/cash';
import { hapusPegawai } from '../publics/redux/actions/pegawai';
import { hapusMikro } from '../publics/redux/actions/mikro';
import { getPengajuan, hapusPengajuan } from '../publics/redux/actions/pengajuan';
import { hapusKendaraan } from '../publics/redux/actions/kendaraan';
import { hapusAngsuran } from '../publics/redux/actions/angsuran';

class PengajuanStatus3 extends Component {
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
            jenis_dp: '',
            angsuran: 0,
            marhunBih: 0,
            lunas: false,
            verifikasi: false,
            status: '',
            tolak: false,
            pengajuan_id: '',
            nasabah_id: '',
            dp_id: '',
            pekerjaan_id: '',
            jumlahdp: 0,
            asuransi: 0,
            ijk: 0,
            totaldp: 0,
            lunas:true
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
        // BackHandler.addEventListener('hardwareBackPress', function() {
        //     return true;
        // });
        this.subs = [
            this.props.navigation.addListener('willFocus', async () => {
                let user_id = await AsyncStorage.getItem("userId")
                await this.props.dispatch(getPengajuan(user_id))
                let adaPengajuan = await this.props.pengajuanProp.dataPengajuanNasabah.length
                // console.warn(this.props.pengajuanProp.dataPengajuanNasabah)
                this.props.pengajuanProp.dataPengajuanNasabah.map((item, i) =>
                    this.setState({ verifikasi: item.verifikasi, lunas:item.lunas })
                )
                if (adaPengajuan > 0 && this.state.verifikasi == true && this.state.lunas == false) {
                    this.props.navigation.navigate('Pembayaran')
                }
                else if (adaPengajuan == 0) {
                    this.props.navigation.navigate('Pengajuan1')
                } else {
                    this.props.pengajuanProp.dataPengajuanNasabah.map((item, i) =>
                        // console.warn(item.verifikasi)
                        this.setState({
                            tipePekerjaan: item.jenis_pekerjaan, nama: item.nmnasabah
                            , verifikasi: item.verifikasi
                            , lunas: item.lunas
                            , tenor: item.tenor
                            , harga: item.harga
                            , marhunBih: item.marhunbih
                            , angsuran: item.angsuran
                            , cabang: item.nmcabang
                            , merkKendaraan: item.merk
                            , tipeKendaraan: item.tipe
                            , statusKendaraan: item.status
                            , warnaKendaraan: item.warna
                            , tolak: item.tolak
                            , jenis_dp: item.jenis_dp
                            , pengajuan_id: item.pengajuan_id
                            , nasabah_id: item.nasabah_id
                            , dp_id: item.dp_id
                            , pekerjaan_id: item.pekerjaan_id
                        })
                    )
                    if (this.state.jenis_dp == 'jaminan') {
                        await this.props.dispatch(getDpJaminan(this.state.nasabah_id))
                        this.props.nasabahProp.dataDpJaminan.map(async (item, i) =>
                            // console.warn(item.verifikasi)
                            this.setState({
                                jumlahdp: item.jumlahdp,
                            }),
                        )
                    }
                    else if (this.state.jenis_dp == 'cash') {
                        await this.props.dispatch(getDpCash(this.state.nasabah_id))
                        this.props.nasabahProp.dataDpCash.map(async (item, i) =>
                            // console.warn(item.verifikasi)
                            this.setState({
                                jumlahdp: item.jumlahdp,
                            }),
                        )
                    }
                    else if (this.state.jenis_dp == 'tabEmas') {
                        await this.props.dispatch(getDpTabEmas(this.state.nasabah_id))
                        this.props.nasabahProp.dataDpEmas.map(async (item, i) =>
                            // console.warn(item.verifikasi)
                            this.setState({
                                jumlahdp: item.jumlahdp,
                            }),
                        )
                    }
                    if (this.state.lunas) {
                        this.setState({ status: 'Lunas' })
                        alert("selamat sudah lunas \npihak pegadaian akan menghubungi kamu")
                    }
                    else if (this.state.tolak) {
                        this.setState({ status: 'Ditolak' })
                    } else {
                        this.setState({ status: 'Belum Lunas' })
                    }
                    if (this.state.tenor == 12) {
                        let asu = (this.state.harga * 0.018) - ((this.state.harga * 0.018) * 0.15) + 1500
                        this.setState({ asuransi: asu })
                    }
                    else if (this.state.tenor == 18 | this.state.tenor == 24) {
                        let asu = ((this.state.harga * 0.018) + ((this.state.harga * 0.018) * 0.9)) - (((this.state.harga * 0.018) + ((this.state.harga * 0.018) * 0.9)) * 0.15) + 15000
                        this.setState({ asuransi: asu });
                    }
                    else if (this.state.tenor == 36) {
                        let asu = ((this.state.harga * 0.018) + ((this.state.harga * 0.018) * 0.9) + ((this.state.harga * 0.018) * 0.8) - (((this.state.harga * 0.018) + ((this.state.harga * 0.018) * 0.9) + ((this.state.harga * 0.018) * 0.8)) * 0.15) + 15000)
                        this.setState({ asuransi: asu });
                    }

                    if (this.state.tenor == 12 && this.state.tipePekerjaan == 'Pegawai') {
                        let ijk = (this.state.harga - this.state.jumlahdp) * 0.0067
                        this.setState({ ijk: ijk })
                    }
                    else if (this.state.tenor == 18 && this.state.tipePekerjaan == 'Pegawai') {
                        let ijk = (this.state.harga - this.state.jumlahdp) * 0.0081
                        this.setState({ ijk: ijk })
                    }
                    else if (this.state.tenor == 24 && this.state.tipePekerjaan == 'Pegawai') {
                        let ijk = (this.state.harga - this.state.jumlahdp) * 0.0093
                        this.setState({ ijk: ijk })
                    }
                    else if (this.state.tenor == 36 && this.state.tipePekerjaan == 'Pegawai') {
                        let ijk = (this.state.harga - this.state.jumlahdp) * 0.0115
                        this.setState({ ijk: ijk })
                    }
                    else if (this.state.tenor == 12 && this.state.tipePekerjaan == 'Mikro') {
                        let ijk = (this.state.harga - this.state.jumlahdp) * 0.0092
                        this.setState({ ijk: ijk })
                    }
                    else if (this.state.tenor == 18 && this.state.tipePekerjaan == 'Mikro') {
                        let ijk = (this.state.harga - this.state.jumlahdp) * 0.0138
                        this.setState({ ijk: ijk })
                    }
                    else if (this.state.tenor == 24 && this.state.tipePekerjaan == 'Mikro') {
                        let ijk = (this.state.harga - this.state.jumlahdp) * 0.0161
                        this.setState({ ijk: ijk })
                    }
                    else if (this.state.tenor == 36 && this.state.tipePekerjaan == 'Mikro') {
                        let ijk = (this.state.harga - this.state.jumlahdp) * 0.0202
                        this.setState({ ijk: ijk })
                    }
                    this.setState({ totaldp: this.state.jumlahdp + 70000 + this.state.asuransi + this.state.ijk + 150000 })

                }
            }),
        ]
    }

    componentWillUnmount() {
        this.subs.forEach(sub => {
            sub.remove()
        })
    }

    pengajuanBaru = async () => {
        alert('menghapus pengajuan sebelumnya...')
        await this.props.dispatch(hapusAngsuran(this.state.pengajuan_id))
        await this.props.dispatch(hapusNasabah(this.state.nasabah_id))
        await this.props.dispatch(hapusPengajuan(this.state.pengajuan_id))
        await this.props.dispatch(hapusKendaraan(this.state.pengajuan_id))

        if (this.state.jenis_dp == 'cash') {
            await this.props.dispatch(hapusCash(this.state.dp_id))
        }
        else if (this.state.jenis_dp == 'jaminan') {
            await this.props.dispatch(hapusJaminan(this.state.dp_id))
        }
        else if (this.state.jenis_dp == 'tabEmas') {
            await this.props.dispatch(hapusEmas(this.state.dp_id))
        }

        if (this.state.tipePekerjaan == 'Mikro') {
            await this.props.dispatch(hapusMikro(this.state.pekerjaan_id))
            this.props.navigation.popToTop()
            this.props.navigation.navigate('PengajuanStatus1')
        }
        else if (this.state.tipePekerjaan == 'Pegawai') {
            await this.props.dispatch(hapusPegawai(this.state.pekerjaan_id))
            this.props.navigation.popToTop()
            this.props.navigation.navigate('PengajuanStatus1')
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
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginLeft: '2%', fontWeight: 'bold' }}>Data Pengajuan </Text>
                            {this.state.tolak ? <Text style={{ color: 'red' }}>({this.state.status})</Text> :
                                <Text style={{ color: this.state.verifikasi == true && this.state.lunas == true ? 'green' : 'red' }}>({this.state.verifikasi == true ? this.state.status : "Belum Disetujui"})</Text>}
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <List>
                                    <ListItem style={{ alignSelf: 'flex-start' }}>
                                        <Text style={{ color: 'grey' }}>Kendaraan</Text>
                                    </ListItem>
                                    <ListItem style={{ alignSelf: 'flex-start' }}>
                                        <Text style={{ color: 'grey' }}>Status Kendaraan</Text>
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
                                        <Text style={{ color: "black", alignSelf: 'flex-end', fontSize:13 }}>: {this.state.merkKendaraan + ' ' + this.state.tipeKendaraan + ' (' + this.state.warnaKendaraan + ')'}</Text>
                                    </ListItem>
                                    <ListItem >
                                        <Text style={{ color: "black" }}>: {this.state.statusKendaraan}</Text>
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
                        <Text style={{ marginLeft: '2%', fontWeight: 'bold' }}>Total Uang Muka</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <List>
                                    <ListItem style={{ alignSelf: 'flex-start' }}>
                                        <Text style={{ color: 'grey' }}>Uang Muka</Text>
                                    </ListItem>
                                    <ListItem style={{ alignSelf: 'flex-start' }}>
                                        <Text style={{ color: 'grey' }}>Biaya Admin</Text>
                                    </ListItem>
                                    <ListItem style={{ alignSelf: 'flex-start' }}>
                                        <Text style={{ color: 'grey' }}>Biaya Notaris</Text>
                                    </ListItem>
                                    <ListItem style={{ alignSelf: 'flex-start' }}>
                                        <Text style={{ color: 'grey' }}>Biaya Asuransi</Text>
                                    </ListItem>
                                    <ListItem style={{ alignSelf: 'flex-start' }}>
                                        <Text style={{ color: 'grey', alignSelf: 'flex-start' }}>Total Biaya</Text>
                                    </ListItem>
                                </List>
                            </View>
                            <View style={{ marginLeft: '-10%', flexDirection: 'column' }}>
                                <List>
                                    <ListItem >
                                        <NumberFormat value={this.state.jumlahdp} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ color: "black", alignSelf: 'flex-end' }}>: {value}</Text>} />
                                    </ListItem>
                                    <ListItem >
                                        <NumberFormat value={70000} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ color: "black", alignSelf: 'flex-end' }}>: {value}</Text>} />
                                    </ListItem><ListItem >
                                        <NumberFormat value={150000} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ color: "black", alignSelf: 'flex-end' }}>: {value}</Text>} />
                                    </ListItem>
                                    <ListItem >
                                        <NumberFormat value={this.state.asuransi} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ color: "black", alignSelf: 'flex-end' }}>: {value}</Text>} />
                                    </ListItem>
                                    <ListItem >
                                        <NumberFormat value={this.state.totaldp} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ color: "black", alignSelf: 'flex-end' }}>: {value}</Text>} />
                                    </ListItem>
                                </List>
                            </View>
                        </View>
                       <Text style={{ marginBottom: '1%', marginTop: '1%', marginLeft: '2%', fontWeight: 'bold' }}>Lokasi Akad</Text>
                        <Text style={{ marginLeft: '5%', marginTop: '2%', color: 'grey' }}>{this.state.cabang}</Text>
                        {this.state.tolak ?
                            <View style={{ marginTop: '5%', marginBottom: '5%' }}>
                                <Button style={{ justifyContent: 'center', alignSelf: 'center', width: '90%' }} success onPress={() => this.pengajuanBaru()}>
                                    <Text>Ajukan Lagi</Text>
                                </Button>
                            </View>
                            : <View></View>
                        }
                    </View>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        pengajuanProp: state.pengajuan,
        nasabahProp: state.nasabah
    }
}

export default connect(mapStateToProps)(PengajuanStatus3);