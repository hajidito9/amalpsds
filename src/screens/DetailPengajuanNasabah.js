import React, { Component } from 'react';
import { View } from 'react-native';
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
import { tolakPengajuan } from '../publics/redux/actions/pengajuan';

class DetailPengajuanNasabah extends Component {
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
            pengajuan_id:''
        };
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Ringkasan Pengajuan',
            headerTintColor: "white",
            headerTitleStyle: {
                // width: '90%',
                textAlign: 'center',
                color: 'white'
            },
            headerStyle: {
                elevation: null,
                backgroundColor: '#2ECC71'
            },
        }
    }

    componentDidMount = async () => {
        let asmerk = await AsyncStorage.getItem("merk")
        let astipe = await AsyncStorage.getItem("tipe")
        let asstatus = await AsyncStorage.getItem("status")
        let aswarna = await AsyncStorage.getItem("warna")
        let ascabang = await AsyncStorage.getItem("cabang")
        let asangsuran = await AsyncStorage.getItem("angsuran")
        let asmarhunbih = await AsyncStorage.getItem("marhunbih")
        let asharga = await AsyncStorage.getItem("harga")
        let astenor = await AsyncStorage.getItem("tenor")
        let asjenis_pekerjaan = await AsyncStorage.getItem("jenis_pekerjaan")
        let asnamansabah = await AsyncStorage.getItem("namanasabah")
        await this.setState({ merkKendaraan: asmerk })
        await this.setState({ tipeKendaraan: astipe })
        await this.setState({ statusKendaraan: asstatus })
        await this.setState({ warnaKendaraan: aswarna })
        await this.setState({ harga: asharga })
        await this.setState({ tenor: astenor })
        await this.setState({ nama: asnamansabah })
        await this.setState({ cabang: ascabang })
        await this.setState({ tipePekerjaan: asjenis_pekerjaan })
        await this.setState({ marhunBih: asmarhunbih })
        await this.setState({ angsuran: asangsuran })
        let aspengajuan_id = await AsyncStorage.getItem("pengajuan_id")
        await this.setState({ pengajuan_id: aspengajuan_id })    
        // let diskonAng = ((0.0056 + (0.0111* (89 - (((this.state.harga - (this.state.harga * this.state.persenDp))/this.state.harga) * 100)))).toFixed(4) * 100).toFixed(2) / 100
    }

    tolak = async () => {
        // console.warn(this.state.pengajuan_id)
        await this.props.dispatch(tolakPengajuan(this.state.pengajuan_id))
        alert("Pengajuan dengan ID "+this.state.pengajuan_id+"\nBerhasil Ditolak")
        this.props.navigation.navigate('HomeAdmin')
      };

    render() {
        return (
            <Container>
                <Content>
                    <View style={{ marginTop: '3%' }} >
                        <Item stackedLabel>
                            <Label style={{ marginLeft: '1%', fontSize: 16 }}>Nama Nasabah</Label>
                            <Input style={{ color: "black", fontWeight: 'bold' }} editable={false} value={this.state.nama} />
                        </Item>
                        <Text style={{ marginLeft: '2%', fontWeight: 'bold' }}>Data Pengajuan</Text>
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
                                        <Text style={{ color: "black", alignSelf: 'flex-end', fontSize:13 }}>: {this.state.merkKendaraan + ' ' + this.state.tipeKendaraan +' (' + this.state.warnaKendaraan + ')'}</Text>
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
                        <Text style={{ marginLeft: '2%', fontWeight: 'bold' }}>Lokasi Akad</Text>
                        <Text style={{ marginLeft: '5%', marginTop: '2%', color: 'grey' }}>{this.state.cabang}</Text>
                        <View style={{ marginTop: '5%', alignSelf: 'center',flexDirection:'row' }}>
                        <Button style={{ justifyContent: 'center', marginRight:'2%', alignSelf: 'center', width: '30%' }} danger onPress={() => this.tolak()}>
                                <Text>Tolak</Text>
                            </Button>
                            <Button style={{ justifyContent: 'center', alignSelf: 'center', width: '30%' }} success onPress={() => this.props.navigation.navigate('inputBpkb')}>
                                <Text>Verifikasi</Text>
                            </Button>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        nasabahProp: state.nasabah
    }
}

export default connect(mapStateToProps)(DetailPengajuanNasabah);