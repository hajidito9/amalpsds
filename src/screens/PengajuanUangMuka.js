import React, { Component } from 'react';
import {
    Container, Header, Left, Form, Picker, Input, Label, Item, Body, Right, Button, Icon, Title, Segment, Content, Text
} from 'native-base';
import { View } from 'react-native';
import SegmentedControlTab from "react-native-segmented-control-tab";
import Slider from "react-native-slider";
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { getEmas, getKonversiEmas } from '../publics/redux/actions/emas';
import NumericInput from 'react-native-numeric-input'
import NumberFormat from 'react-number-format';

class PengajuanUangMuka extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Uang Muka',
            headerTintColor: "white",
            headerTitleStyle: {
                width: '100%',
                textAlign: 'center',
                color: 'white'
            },
            headerStyle: {
                elevation: null,
                backgroundColor: '#2ECC71'
            },
        }
    }

    // state = {
    //     activePage: 1,
    // }

    // selectComponent = (activePage) => () => this.setState({ activePage })

    constructor() {
        super();
        this.state = {
            selectedIndex: 0,
            persenDp: 0,
            minDp: 0,
            harga: 0,
            uangMuka: 0,
            angsuran: 0,
            negara: '',
            merkKendaraan: '',
            tipeKendaraan: '',
            statusKendaraan: '',
            warnaKendaraan: '',
            tenor: 0,
            saldo: 0,
            gram: 0,
            kadar: 0,
            beratBersih: 0,
            beratKotor: 0,
            jenis: '',
            taksiran: 0,
            konversiGram:0,
            konversiKarat:0
            // diskon:0
        };
    }

    ubahJenis(value) {
        this.setState({
            jenis: value
        });
    }
    
    _renderComponent = () => {
        if (this.state.selectedIndex === 0)
            return (
                <View>
                    {/* <Text>Pembayaran Uang Tunai</Text> */}
                </View>
            )
        else if (this.state.selectedIndex === 1)
            return (
                <View style={{ alignSelf: 'center', marginTop: '2%', borderColor: 'green', borderWidth: 1, padding: 10, flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ alignSelf: 'flex-start', fontSize: 13, color: 'black' }}>No Rekening</Text>
                        <Text style={{ alignSelf: 'flex-start', fontSize: 13, color: 'black' }}>Saldo</Text>
                        <Text style={{ alignSelf: 'flex-start', fontSize: 13, color: 'black' }}>Konversi</Text>
                    </View>
                    <View style={{ marginLeft: '15%', flexDirection: 'column' }}>
                        <Text style={{ alignSelf: 'flex-end', fontSize: 13, color: 'green', fontWeight: 'bold' }}>{this.props.tabEmasProp.dataEmas.map((item, i) => item.no_rek)}</Text>
                        <Text style={{ alignSelf: 'flex-end', fontSize: 13, color: 'green', fontWeight: 'bold' }}>{this.props.tabEmasProp.dataEmas.map((item, i) => item.saldo)} gram</Text>
                        <NumberFormat value={this.state.gram * this.state.konversiGram} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ alignSelf: 'flex-end', fontSize: 13, color: '#2ECC71', fontWeight: 'bold' }}>{value}</Text>}/>
                    </View>
                </View>
                // <Text>emas</Text>
            )
        else if (this.state.selectedIndex === 2)
            return (
                <View >
                    <Form>
                        {/* <Item stackedLabel> */}
                        {/* <View style={{flexDirection:'row'}}> */}
                        {/* <Label>Jenis Perhiasan</Label> */}
                        <Picker
                            mode="dropdown"
                            placeholder="Jenis"
                            iosIcon={<Icon name="arrow-down" />}
                            placeholder="Jenis"
                            textStyle={{ color: "#5cb85c" }}
                            itemStyle={{
                                backgroundColor: "#d3d3d3",
                                marginLeft: 0,
                                paddingLeft: 10
                            }}
                            itemTextStyle={{ color: '#788ad2' }}
                            style={{ width: undefined }}
                            selectedValue={this.state.jenis}
                            onValueChange={this.ubahJenis.bind(this)}
                        >
                            <Picker.Item label="Pilih Jenis Perhiasan" value="" />
                            <Picker.Item label="Anting" value="Anting" />
                            <Picker.Item label="Gelang" value="Gelang" />
                            <Picker.Item label="Cincin" value="Cincin" />
                            <Picker.Item label="Kalung" value="Kalung" />
                        </Picker>
                        {/* </View> */}
                        {/* <Input placeholderTextColor="grey" style={{ color: "grey" }} /> */}
                        {/* </Item> */}
                        <Item stackedLabel>
                        <Label>Kadar (Karat) </Label>
                            <NumericInput minValue={1} maxValue={24} type='up-down' onChange={kadar => this.setState({ kadar })} placeholder="0" placeholderTextColor="grey" borderColor ='white' />
                        </Item>
                        <Item stackedLabel>
                            <Label>Berat Kotor (gram)</Label>
                            <NumericInput minValue={1.0} step={0.1} valueType={'real'} type='up-down' onChange={beratKotor => this.setState({ beratKotor })} placeholder="0" placeholderTextColor="grey" borderColor ='white' />
                        </Item>
                        <Item stackedLabel>
                            <Label>Berat Bersih (gram)</Label>
                            <NumericInput minValue={1.0} step={0.1} valueType={'real'} type='up-down' onChange={beratBersih => this.setState({ beratBersih })} placeholder="0" placeholderTextColor="grey" borderColor ='white' />
                        </Item>
                        <Item stackedLabel>
                            <Label>Perkiraan Taksiran (Plafon 90%)</Label>
                            {/* <Text style={{ color: "#2ECC71" }}>Rp {this.state.kadar * 89486 * this.state.beratBersih} </Text> */}
                            <NumberFormat value={((this.state.kadar * this.state.konversiKarat * this.state.beratBersih) * 0.9).toFixed(0)} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{fontWeight:'bold', color: "#2ECC71" }}>{value}</Text>}/>
                        </Item>
                    </Form>
                </View>
            )
    }

    handleIndexChange = index => {
        this.setState({
            ...this.state,
            selectedIndex: index
        });
    };

    buttonVisible() {
        if (this.state.selectedIndex === 1 && (this.state.saldo < (this.state.harga * this.state.persenDp).toFixed(0))) {
            return (
                <Button
                    disabled
                    style={{ justifyContent: 'center', alignSelf: 'center', width: '90%' }}
                    onPress={() => this.setUangMuka()}>
                    <Text>Lanjut</Text>
                </Button>
            )
        }
        else if (this.state.selectedIndex === 2 && (this.state.kadar * this.state.konversiKarat * this.state.beratBersih < (this.state.harga * this.state.persenDp).toFixed(0))) {
            return (
                <Button
                    disabled
                    style={{ justifyContent: 'center', alignSelf: 'center', width: '90%' }}
                    onPress={() => this.setUangMuka()}>
                    <Text>Lanjut</Text>
                </Button>
            )
        }
        else {
            return (
                <Button
                    style={{ justifyContent: 'center', alignSelf: 'center', width: '90%' }}
                    success 
                    onPress={() => this.setUangMuka()}>
                    <Text>Lanjut</Text>
                </Button>
            )
        }
    }

    getData = async () => {
        let userId = await AsyncStorage.getItem('userId')
        await this.props.dispatch(getEmas(userId))
    }

    componentDidMount = async () => {
        await this.getData();
        await this.props.dispatch(getKonversiEmas('gram'))
        this.props.tabEmasProp.dataKonversi.map((item, i) => this.setState({ konversiGram: item.jual }))
        await this.props.dispatch(getKonversiEmas('karat'))
        this.props.tabEmasProp.dataKonversi.map((item, i) => this.setState({ konversiKarat: (item.jual / 24).toFixed(0) }))
        this.props.tabEmasProp.dataEmas.map((item, i) => this.setState({ saldo: item.saldo * this.state.konversiGram }))
        this.props.tabEmasProp.dataEmas.map((item, i) => this.setState({ gram: item.saldo}))
        let asMinDp = parseFloat(await AsyncStorage.getItem("persenDp"))
        let asHarga = Number(await AsyncStorage.getItem("hargaKendaraan"))
        let asNegara = await AsyncStorage.getItem("asalKendaraan")
        let asTenor = Number(await AsyncStorage.getItem("tenor"))
        let asMerkKendaraan = await AsyncStorage.getItem('merkKendaraan')
        let asTipeKendaraan = await AsyncStorage.getItem('tipeKendaraan')
        let asStatusKendaraan = await AsyncStorage.getItem('statusKendaraan')
        let asWarnaKendaraan = await AsyncStorage.getItem('warnaKendaraan')
        await this.setState({ merkKendaraan: asMerkKendaraan })
        await this.setState({ tipeKendaraan: asTipeKendaraan })
        await this.setState({ statusKendaraan: asStatusKendaraan })
        await this.setState({ warnaKendaraan: asWarnaKendaraan })
        await this.setState({ minDp: asMinDp })
        await this.setState({ persenDp: asMinDp })
        await this.setState({ harga: asHarga })
        await this.setState({ negara: asNegara })
        await this.setState({ tenor: asTenor })
        // let diskonAng = ((0.0056 + (0.0111* (89 - (((this.state.harga - (this.state.harga * this.state.persenDp))/this.state.harga) * 100)))).toFixed(4) * 100).toFixed(2) / 100
    }

    setUangMuka= async()=>{
        if (this.state.selectedIndex === 0){
            await AsyncStorage.setItem("jenisDp","cash")
            await AsyncStorage.setItem("persenDpPengajuan",JSON.stringify(this.state.persenDp))
            await AsyncStorage.setItem("uangDp",JSON.stringify((this.state.harga * this.state.persenDp).toFixed(0)))
            await AsyncStorage.setItem("angsuran",JSON.stringify((((this.state.harga - (this.state.harga * this.state.persenDp)) / this.state.tenor) + ((this.state.harga - (this.state.harga * this.state.persenDp)) * 0.009)* (1-(((0.0056 + (0.0111* (89 - (((this.state.harga - (this.state.harga * this.state.persenDp))/this.state.harga) * 100)))).toFixed(4) * 100).toFixed(2) / 100))).toFixed(0)))
            await AsyncStorage.setItem("diskonAngsuran",JSON.stringify(((0.0056 + (0.0111* (89 - (((this.state.harga - (this.state.harga * this.state.persenDp))/this.state.harga) * 100)))).toFixed(4) * 100).toFixed(2) / 100))
            await AsyncStorage.setItem("marhunBih",JSON.stringify((this.state.harga - (this.state.harga * this.state.persenDp)).toFixed(0)))
            this.props.navigation.navigate('PengajuanNasabah')
        }
        else if (this.state.selectedIndex === 1){
            await AsyncStorage.setItem("jenisDp","tabEmas")
            await AsyncStorage.setItem("persenDpPengajuan",JSON.stringify(this.state.persenDp))
            await AsyncStorage.setItem("uangDp",JSON.stringify((this.state.harga * this.state.persenDp).toFixed(0)))
            await AsyncStorage.setItem("gramDp",JSON.stringify(this.state.gram))
            await AsyncStorage.setItem("hargaEmasDp",JSON.stringify(this.state.saldo))
            await AsyncStorage.setItem("angsuran",JSON.stringify((((this.state.harga - (this.state.harga * this.state.persenDp)) / this.state.tenor) + ((this.state.harga - (this.state.harga * this.state.persenDp)) * 0.009)* (1-(((0.0056 + (0.0111* (89 - (((this.state.harga - (this.state.harga * this.state.persenDp))/this.state.harga) * 100)))).toFixed(4) * 100).toFixed(2) / 100))).toFixed(0)))
            await AsyncStorage.setItem("diskonAngsuran",JSON.stringify(((0.0056 + (0.0111* (89 - (((this.state.harga - (this.state.harga * this.state.persenDp))/this.state.harga) * 100)))).toFixed(4) * 100).toFixed(2) / 100))
            await AsyncStorage.setItem("marhunBih",JSON.stringify(this.state.harga - (this.state.harga * this.state.persenDp)))
            this.props.navigation.navigate('PengajuanNasabah')
        }
        else if (this.state.selectedIndex === 2){
            await AsyncStorage.setItem("jenisDp","jaminan")
            await AsyncStorage.setItem("persenDpPengajuan",JSON.stringify(this.state.persenDp))
            await AsyncStorage.setItem("uangDp",JSON.stringify((this.state.harga * this.state.persenDp).toFixed(0)))
            await AsyncStorage.setItem("jenisPerhiasanDp",this.state.jenis)
            await AsyncStorage.setItem("kadarPerhiasanDp",JSON.stringify(this.state.kadar))
            await AsyncStorage.setItem("brtKotorPerhiasanDp",JSON.stringify(this.state.beratKotor))
            await AsyncStorage.setItem("brtBersihPerhiasanDp",JSON.stringify(this.state.beratBersih))
            await AsyncStorage.setItem("taksiranPerhiasanDp",JSON.stringify(this.state.kadar * this.state.konversiKarat * this.state.beratBersih))
            await AsyncStorage.setItem("angsuran",JSON.stringify((((this.state.harga) / this.state.tenor) + ((this.state.harga) * 0.009)).toFixed(0)))
            await AsyncStorage.setItem("marhunBih",JSON.stringify(this.state.harga - (this.state.harga * this.state.persenDp)))
            this.props.navigation.navigate('PengajuanNasabah')
        }
    }

    ubahPersenDp = persenDp => this.setState({ persenDp });

    render() {
        return (
            <Container>
                <Content>
                    <View style={{ marginLeft: '5%', marginRight: '5%', marginTop: '3%' }}>
                        <SegmentedControlTab
                            values={["Uang Tunai", "Tabungan Emas", "Barang Jaminan"]}
                            tabStyle={{ borderRadius: 10, borderColor: 'white' }}
                            tabTextStyle={{ color: 'black' }}
                            activeTabStyle={{ backgroundColor: '#2ECC71' }}
                            activeTabTextStyle={{ color: 'white' }}
                            selectedIndex={this.state.selectedIndex}
                            onTabPress={this.handleIndexChange}
                        />
                        <View padder>
                            {this._renderComponent()}
                            <View style={{ marginTop: '5%', flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ color: 'green', fontWeight: 'bold' }}>{this.state.merkKendaraan + ' ' + this.state.tipeKendaraan + ' ' + this.state.statusKendaraan + ' Warna ' + this.state.warnaKendaraan}</Text>
                                    <Text></Text>
                                    <View style={{ flexDirection: 'row', marginLeft:'5%' }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={{ alignSelf: 'flex-start', fontSize: 13, color: 'black' }}>Asal Negara Kendaraan</Text>
                                            <Text style={{ alignSelf: 'flex-start', fontSize: 13, color: 'black' }}>Minimal Persen Uang Muka</Text>
                                            <Text style={{ alignSelf: 'flex-start', fontSize: 13, color: 'black' }}>Persen Uang Muka yang Diajukan</Text>
                                            <Text style={{ alignSelf: 'flex-start', fontSize: 13, color: 'black' }}>Harga Kendaraan</Text>
                                            <Text style={{ alignSelf: 'flex-start', fontSize: 13, color: 'black' }}>Tenor</Text>
                                            <Text style={{ alignSelf: 'flex-start', fontSize: 13, color: 'grey' }}>Uang muka untuk pembayaran</Text>
                                            {this.state.selectedIndex === 0 || this.state.selectedIndex === 1 ? <Text style={{ alignSelf: 'flex-start', fontSize: 13, color: 'grey' }}>Diskon mu'nah pemeliharaan</Text> : <Text></Text>}
                                        </View>
                                        <View style={{ marginLeft: '10%', flexDirection: 'column' }}>
                                            <Text style={{ alignSelf: 'flex-end', fontSize: 13, color: 'green', fontWeight: 'bold' }}>{this.state.negara}</Text>
                                            <Text style={{ alignSelf: 'flex-end', fontSize: 13, color: 'green', fontWeight: 'bold' }}>{(this.state.minDp * 100).toFixed(0)}%</Text>
                                            <Text style={{ alignSelf: 'flex-end', fontSize: 13, color: '#2ECC71', fontWeight: 'bold' }}>{(this.state.persenDp * 100).toFixed(0)}%</Text>
                                            <NumberFormat value={this.state.harga} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ alignSelf: 'flex-end', fontSize: 13, color: 'green', fontWeight: 'bold' }}>{value}</Text>}/>
                                            <Text style={{ alignSelf: 'flex-end', fontSize: 13, color: 'green', fontWeight: 'bold' }}>{this.state.tenor} Bulan</Text>
                                            <NumberFormat value={(this.state.harga * this.state.persenDp).toFixed(0)} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ alignSelf: 'flex-end', fontSize: 13, fontWeight: 'bold', color: '#2ECC71' }}>{value}</Text>}/>
                                            {this.state.selectedIndex === 0 || this.state.selectedIndex === 1 ? <Text style={{ alignSelf: 'flex-end', fontSize: 13, color: '#2ECC71', fontWeight: 'bold' }}>{((0.0056 + (0.0111* (89 - (((this.state.harga - (this.state.harga * this.state.persenDp))/this.state.harga) * 100)))).toFixed(4) * 100).toFixed(2) > 0 ? ((0.0056 + (0.0111* (89 - (((this.state.harga - (this.state.harga * this.state.persenDp))/this.state.harga) * 100)))).toFixed(4) * 100).toFixed(2) : 0 }%</Text> : <Text></Text>}
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <Slider
                                thumbTintColor="#d9d9d9"
                                minimumTrackTintColor="green"
                                maximumTrackTintColor="#e6e6e6"
                                minimumValue={this.state.minDp}
                                maximumValue={0.9}
                                step={0.1}
                                value={this.state.persenDp}
                                onValueChange={this.ubahPersenDp}
                            />
                            <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 13 }}>Angsuran per Bulan </Text>
                                {/* <Text style={{ fontSize: 20, color: 'green' }}> */}
                                    {
                                    // this.state.selectedIndex === 1 || this.state.selectedIndex === 2 ?
                                    this.state.selectedIndex === 2 ?
                                    <NumberFormat value={(((this.state.harga) / this.state.tenor) + ((this.state.harga) * 0.009)).toFixed(0)} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ fontSize: 20, color: 'green' }}>{value}</Text>}/>
                                         :
                                        <NumberFormat value={(((this.state.harga - (this.state.harga * this.state.persenDp)) / this.state.tenor) + ((this.state.harga - (this.state.harga * this.state.persenDp)) * 0.009)* (1-(((0.0056 + (0.0111* (89 - (((this.state.harga - (this.state.harga * this.state.persenDp))/this.state.harga) * 100)))).toFixed(4) * 100).toFixed(2) / 100))).toFixed(0)} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ fontSize: 20, color: 'green' }}>{value}</Text>} />
                                        
                                }
                                {/* </Text> */}
                            </View>
                        </View>

                        {/* <Text>{this.state.selectedIndex}</Text> */}
                        <View style={{ marginTop: '5%', marginBottom: '5%' }}>
                            {/* <Button
                    style={{ justifyContent: 'center', alignSelf: 'center', width: '90%' }} 
                    success onPress={() => this.props.navigation.navigate('PengajuanKonfirmasi')}>
                        <Text>Lanjut</Text>
                    </Button> */}
                            {this.buttonVisible()}
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tabEmasProp: state.emas
    }
}

export default connect(mapStateToProps)(PengajuanUangMuka);