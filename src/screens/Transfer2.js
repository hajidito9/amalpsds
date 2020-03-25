import React, { Component } from "react";
import { Image, View, Text, Alert, TouchableOpacity, Clipboard } from 'react-native';
import { Container, Header, Content, Button, Accordion } from "native-base";
const dataArray = [
    { title: "Petunjuk Transfer ATM ", content: "1. Pilih Transfer > Virtual Account Billing \n2. Pilih Rekening Debet > Masukkan nomor Virtual Account yang tertera di halaman Pembayaran (terdiri dari 3 kode bank + no. handphone pengguna/no. acak) pada menu Input Baru \n3. Tagihan yang harus dibayar akan muncul pada layar konfirmasi \n4. Periksa informasi yang tertera di layar. Pastikan Merchant adalah Shopee, Total tagihan sudah benar dan username Anda {username}.  Jika benar, masukkan password transaksi dan klik Lanjut" },
    { title: "Petunjuk Transfer mBanking", content: "1. Pilih Transfer > Virtual Account Billing \n2. Pilih Rekening Debet > Masukkan nomor Virtual Account yang tertera di halaman Pembayaran (terdiri dari 3 kode bank + no. handphone pengguna/no. acak) pada menu Input Baru \n3. Tagihan yang harus dibayar akan muncul pada layar konfirmasi \n4. Periksa informasi yang tertera di layar. Pastikan Merchant adalah Shopee, Total tagihan sudah benar dan username Anda {username}.  Jika benar, masukkan password transaksi dan klik Lanjut" },
    { title: "Petunjuk iBanking", content: "1. Pilih Transfer > Virtual Account Billing \n2. Pilih Rekening Debet > Masukkan nomor Virtual Account yang tertera di halaman Pembayaran (terdiri dari 3 kode bank + no. handphone pengguna/no. acak) pada menu Input Baru \n3. Tagihan yang harus dibayar akan muncul pada layar konfirmasi \n4. Periksa informasi yang tertera di layar. Pastikan Merchant adalah Shopee, Total tagihan sudah benar dan username Anda {username}.  Jika benar, masukkan password transaksi dan klik Lanjut" }
];
import { connect } from 'react-redux';

export default class Transfer2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            no_va: '',
            bank: '',
            namaBank: ''
        };
    }
    copyVa() {
        // console.warn(this.state.no_va)
        Clipboard.setString(this.state.no_va)
        Alert.alert(
            'Copied To Clipboard'
        );

    }

    componentDidMount = async () => {
        const { navigation } = this.props;
        await this.setState({
            no_va: navigation.getParam('no_va')
            , bank: navigation.getParam('bank')
            ,namaBank: navigation.getParam('namaBank')
        })
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Pembayaran',
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

    logo() {
        if (this.state.bank == '008') 
            return (
                <View style={{ flexDirection: 'row', marginTop: '4%' }}>
                    <Image
                        source={require('../assets/Bank-Mandiri-Logo-Vector-Image.png')}
                        style={{ width: 90, marginLeft: '5%', height: 30, resizeMode:'contain'}} />
                        <Text style={{ marginLeft: '5%', fontSize: 20, color: 'grey' }}>Bank {this.state.namaBank}</Text>
                </View>
            )
        else if (this.state.bank == '009') 
            return (
                <View style={{ flexDirection: 'row', marginTop: '4%' }}>
                    <Image
                        source={require('../assets/LogoBankBNIPNG.png')}
                        style={{ width: 90, marginLeft: '5%', height: 30, resizeMode:'contain'}} />
                        <Text style={{ marginLeft: '5%', fontSize: 20, color: 'grey' }}>Bank {this.state.namaBank}</Text>
                </View>
            )
        
        else if (this.state.bank == '002') 
            return (
                <View style={{ flexDirection: 'row', marginTop: '4%' }}>
                    <Image
                        source={require('../assets/logo-bank-bri-link-png-bank-rakyat-indonesia-clipa-e734cf696078af37.png')}
                        style={{ width: 90, marginLeft: '5%', height: 30, resizeMode:'contain' }} />
                        <Text style={{ marginLeft: '5%', fontSize: 20, color: 'grey' }}>Bank {this.state.namaBank}</Text>
                </View>
            )
    }

    render() {
        return (
            <Container>
                    {this.logo()}
                <View
                    style={{
                        marginTop: '5%',
                        borderBottomColor: 'grey',
                        borderBottomWidth: 1,
                    }}
                />
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <View style={{ marginTop: '3%', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: 'grey', fontSize: 20 }}>{this.state.no_va}</Text>
                        <Text style={{ color: 'grey', fontSize: 15 }}>No Virtual Account</Text>
                    </View>
                    <View style={{ marginLeft: '5%', marginTop: '3%' }}>
                        <TouchableOpacity onPress={() => this.copyVa()}>
                            <Text style={{ color: 'orange' }}>SALIN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Content padder>
                    <Accordion
                        dataArray={dataArray}
                        icon="add"
                        expandedIcon="remove"
                        headerStyle={{ backgroundColor: 'white', height: 100 }}
                        contentStyle={{ backgroundColor: 'white' }}
                        iconStyle={{ color: "grey" }}
                        expandedIconStyle={{ color: "red" }}
                    />

                    <View style={{ alignSelf: 'center', marginTop: '5%', width: '20%', marginBottom: '3%' }}>
                        <Button onPress={() => this.props.navigation.navigate('Pembayaran')}
                            success >
                            <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: '35%', }}>OK</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}


// const mapStateToProps = (state) => {
//     return {
//         vaProp: state.vaccount,
//     }
// }

// export default connect(mapStateToProps)(Transfer2);