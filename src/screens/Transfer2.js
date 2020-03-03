import React, { Component } from "react";
import { Image, View, Text,Alert,TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, Accordion } from "native-base";
const dataArray = [
    { title: "Petunjuk Transfer ATM ", content: "1. Pilih Transfer > Virtual Account Billing \n 2. Pilih Rekening Debet > Masukkan nomor Virtual Account yang tertera di halaman Pembayaran (terdiri dari 3 kode bank + no. handphone pengguna/no. acak) pada menu Input Baru \n 3. Tagihan yang harus dibayar akan muncul pada layar konfirmasi \n 4. Periksa informasi yang tertera di layar. Pastikan Merchant adalah Shopee, Total tagihan sudah benar dan username Anda {username}.  Jika benar, masukkan password transaksi dan klik Lanjut" },
    { title: "Petunjuk Transfer mBanking", content: "1. Pilih Transfer > Virtual Account Billing \n 2. Pilih Rekening Debet > Masukkan nomor Virtual Account yang tertera di halaman Pembayaran (terdiri dari 3 kode bank + no. handphone pengguna/no. acak) pada menu Input Baru \n 3. Tagihan yang harus dibayar akan muncul pada layar konfirmasi \n 4. Periksa informasi yang tertera di layar. Pastikan Merchant adalah Shopee, Total tagihan sudah benar dan username Anda {username}.  Jika benar, masukkan password transaksi dan klik Lanjut" },
    { title: "Petunjuk iBanking", content: "1. Pilih Transfer > Virtual Account Billing \n 2. Pilih Rekening Debet > Masukkan nomor Virtual Account yang tertera di halaman Pembayaran (terdiri dari 3 kode bank + no. handphone pengguna/no. acak) pada menu Input Baru \n 3. Tagihan yang harus dibayar akan muncul pada layar konfirmasi \n 4. Periksa informasi yang tertera di layar. Pastikan Merchant adalah Shopee, Total tagihan sudah benar dan username Anda {username}.  Jika benar, masukkan password transaksi dan klik Lanjut" }
];
export default class Transfer2 extends Component {

    showAlert1() {  
        Alert.alert(  
            'Copied To Clipboard'
        );  
    }  

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Pembayaran',
            headerTintColor: "white",
            headerTitleStyle: {
                width: '90%',
                textAlign: 'center',
                color: 'white'
            },
            headerStyle: {
                elevation: null,
                backgroundColor: '#004d4d'
            },
        }
    }

    render() {
        return (
            <Container>
                <View style={{ flexDirection: 'row', marginTop: '4%' }}>
                    <Image
                        source={require('../assets/LogoBankBNIPNG.png')}
                        style={{ width: 90, marginLeft: '5%', height: 30, }} />
                    <Text style={{ marginLeft: '5%', fontSize: 20, color: 'grey' }}>Bank BNI</Text>
                </View>
                <View
                    style={{
                        marginTop: '5%',
                        borderBottomColor: 'grey',
                        borderBottomWidth: 1,
                    }}
                />
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <View style={{ marginTop: '3%', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: 'grey', fontSize: 20 }}>122 3454 346 36</Text>
                        <Text style={{ color: 'grey', fontSize: 15 }}>No Virtual Account</Text>
                    </View>
                    <View style={{ marginLeft: '5%', marginTop: '3%' }}>
                        <TouchableOpacity onPress={() => this.showAlert1()}>
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