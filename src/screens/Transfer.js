import React, { Component } from 'react';
import { Image } from 'react-native';
import { Button, Container, Header, Content, ListItem, Text, Radio, Right, Left, View } from 'native-base';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { bayarVa } from '../publics/redux/actions/vaccount';
import { getGcash } from '../publics/redux/actions/gcash';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

class Transfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select1: false,
            select2: false,
            select3: false,
            select4: false,
            select5: false,
            select6: false,
            select7: false,
            nasabah_id: '',
            amount: 0,
            angsuran_id: '',
            pengajuan_id: '',
            nomor_hp: '',
            bank: '',
            penyedia_layanan: '',
            jenis_transaksi: '',
            pembayaran: '',
            no_va: '',
            namaBank: '',
            nomor_gcash: '',
            pin:''
        };
    }

    pressButton1 = () => {
        this.setState({ select1: true })
        this.setState({ select2: false })
        this.setState({ select3: false })
        this.setState({ select7: false })
        this.setState({ bank: '008' })
        this.setState({ penyedia_layanan: 'PT Pegadaian Persero' })
        this.setState({ jenis_transaksi: 'Angsuran Amanah' })
        this.setState({ pembayaran: 'virtual' })
        this.setState({ namaBank: 'MANDIRI' })
    }
    pressButton2 = () => {
        this.setState({ select1: false })
        this.setState({ select2: true })
        this.setState({ select3: false })
        this.setState({ select7: false })
        this.setState({ bank: '009' })
        this.setState({ penyedia_layanan: 'PT Pegadaian Persero' })
        this.setState({ jenis_transaksi: 'Angsuran Amanah' })
        this.setState({ pembayaran: 'virtual' })
        this.setState({ namaBank: 'BNI' })
    }
    pressButton3 = () => {
        this.setState({ select1: false })
        this.setState({ select2: false })
        this.setState({ select3: true })
        this.setState({ select7: false })
        this.setState({ bank: '002' })
        this.setState({ penyedia_layanan: 'PT Pegadaian Persero' })
        this.setState({ pembayaran: 'virtual' })
        this.setState({ namaBank: 'BRI' })
    }

    pressButton7 = () => {
        this.setState({ select1: false })
        this.setState({ select2: false })
        this.setState({ select3: false })
        this.setState({ select7: true })
        this.setState({ pembayaran: 'gcash' })
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Pilih Pembayaran',
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

    componentDidMount = async () => {
        let userid = await AsyncStorage.getItem("userId")
        await this.props.dispatch(getGcash(userid))
        await this.props.gcashProp.dataGcash.map(async (item, i) =>
            this.setState({ nomor_gcash: item.nomor_gcash, pin:item.pin, norekgcash:item.no_rekening })
        )
        // console.warn(this.state.nomor_gcash)
        const { navigation } = this.props;
        await this.setState({
            angsuran_id: navigation.getParam('angsuran_id')
            , nasabah_id: navigation.getParam('nasabah_id')
            , amount: navigation.getParam('amount')
            , pengajuan_id: navigation.getParam('pengajuan_id')
            , nomor_hp: navigation.getParam('nomor_hp')
        })
    }

    pilihPembayaran = async () => {
        let userid = await AsyncStorage.getItem("userId")
        if (this.state.pembayaran == 'virtual') {
            await this.props.dispatch(bayarVa(
                this.state.amount,
                this.state.angsuran_id,
                this.state.pengajuan_id,
                this.state.nomor_hp,
                this.state.bank,
                this.state.penyedia_layanan,
                this.state.jenis_transaksi,
                this.state.nasabah_id
            ))
            // this.props.navigation.navigate('Transfer2')
            await this.props.vaProp.dataVa.map(async (item, i) =>
                this.setState({ no_va: item.no_va })
            )

            this.props.navigation.navigate('Transfer2',
                {
                    no_va: this.state.no_va,
                    bank: this.state.bank,
                    namaBank: this.state.namaBank
                })
            // await this.props.vaProp.dataJourney
            // console.warn(this.props.vaProp.dataVa)
        }
        else if (this.state.pembayaran == 'gcash') {
            // this.props.navigation.navigate('Transfer2')

            this.props.navigation.navigate('Transfer3',
                {
                    amount: this.state.amount,
                    angsuran_id: this.state.angsuran_id,
                    nomor_gcash: this.state.nomor_gcash,
                    user_id: userid,
                    norekgcash: this.state.norekgcash,
                    pin:this.state.pin
                })
            // await this.props.vaProp.dataJourney
            // console.warn(this.props.vaProp.dataVa)
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <Text style={{ marginTop: '2%', marginLeft: '2%', color: 'grey' }}>Pilih Metode Pembayaran</Text>
                    <ListItem selected={true} >
                        <Left>
                            <Image
                                source={require('../assets/Bank-Mandiri-Logo-Vector-Image.png')}
                                style={{ width: 90, marginLeft: '5%', height: 50, resizeMode: 'contain' }} />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ marginLeft: '5%' }}>Bank Mandiri</Text>
                                <Text style={{ fontSize: 15, marginLeft: '5%', color: 'grey' }}>Virtual Account (otomatis)</Text>
                            </View>
                        </Left>
                        <Right>
                            <Radio
                                onPress={() => this.pressButton1()}
                                color={"#f0ad4e"}
                                selectedColor={"#5cb85c"}
                                selected={this.state.select1}
                            />
                        </Right>
                    </ListItem>
                    <ListItem selected={false}>
                        <Left>
                            <Image
                                source={require('../assets/LogoBankBNIPNG.png')}
                                style={{ width: 90, marginLeft: '5%', height: 30, resizeMode: 'contain' }} />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ marginLeft: '5%' }}>Bank BNI</Text>
                                <Text style={{ fontSize: 15, marginLeft: '5%', color: 'grey' }}>Virtual Account (otomatis)</Text>
                            </View>
                        </Left>
                        <Right>
                            <Radio
                                onPress={() => this.pressButton2()}
                                color={"#f0ad4e"}
                                selectedColor={"#5cb85c"}
                                selected={this.state.select2}
                            />
                        </Right>
                    </ListItem>

                    <ListItem selected={false} >
                        <Left>
                            <Image
                                source={require('../assets/logo-bank-bri-link-png-bank-rakyat-indonesia-clipa-e734cf696078af37.png')}
                                style={{ width: 50, marginLeft: '5%', height: 50, resizeMode: 'contain' }} />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ marginLeft: '5%' }}>Bank BRI</Text>
                                <Text style={{ fontSize: 15, marginLeft: '5%', color: 'grey' }}>Virtual Account (otomatis)</Text>
                            </View>
                        </Left>
                        <Right>
                            <Radio
                                onPress={() => this.pressButton3()}
                                color={"#f0ad4e"}
                                selectedColor={"#5cb85c"}
                                selected={this.state.select3}
                            />
                        </Right>
                    </ListItem>
                    <ListItem selected={false}>
                        <Left>
                            <Image
                                source={require('../assets/300px-Pegadaian_logo_(2013).png')}
                                style={{ width: 50, marginLeft: '5%', height: 50, resizeMode: 'contain' }} />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ marginLeft: '5%' }}>G-Cash</Text>
                            </View>
                        </Left>
                        <Right>
                            <Radio
                                onPress={() => this.pressButton7()}
                                color={"#f0ad4e"}
                                selectedColor={"#5cb85c"}
                                selected={this.state.select7}
                            />
                        </Right>
                    </ListItem>
                    <View style={{ alignSelf: 'center', marginTop: '5%', marginBottom: '3%' }}>
                        <Button onPress={() => this.pilihPembayaran()}
                            success >
                            <Text>Konfirmasi</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        vaProp: state.vaccount,
        gcashProp: state.gcash
    }
}

export default connect(mapStateToProps)(Transfer);