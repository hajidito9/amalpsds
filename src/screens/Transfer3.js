import React, { Component } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, TextInput } from 'react-native';
import {
    Container,
    Header,
    Content,
    Button,
    Form,
    Picker,
    Icon,
    Title,
    Item,
    Text,
    Input,
    Label,
    List,
    ListItem,
    Left, Right,
} from 'native-base';

import Icon2 from 'react-native-vector-icons/dist/FontAwesome5';
import { connect } from 'react-redux';
import { bayarGcash, getGcashBalance } from '../publics/redux/actions/gcash';
import AsyncStorage from '@react-native-community/async-storage';
import NumberFormat from 'react-number-format';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { lunasPengajuan } from '../publics/redux/actions/pengajuan';

class Transfer3 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: undefined,
            selected1: undefined,
            selected2: undefined,
            selected3: undefined,
            value: 0.1,
            merkId: '',
            amount: 0,
            angsuran_id: '',
            nomor_gcash: '',
            user_id: '',
            penyedia_layanan: '',
            jenis_transaksi: '',
            pin: '',
            norekgcash: '',
            saldo: 0,
            pinInput: '',
            password:'',
            akhir: false,
            pengajuan_id:''
        };
    }

    onValueChange(value) {
        this.setState({
            selected: value,
        });
    }

    onValueChange2(value) {
        this.setState({
            selected1: value
        });
    }

    onValueChange3(value) {
        this.setState({
            selected2: value,
        });
    }

    onValueChange4(value) {
        this.setState({
            selected3: value
        });
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Pembayaran G Cash',
        headerTintColor: "white",
        headerTitleStyle: {
            width: '100%',
            textAlign: 'left',
            color: 'white',
            fontWeight: 'bold'
        },
        headerStyle: {
            backgroundColor: '#2ECC71'
        },
    })

    // getData = async () => {
    //     await this.props.dispatch(getMerk())
    // }

    componentDidMount = async () => {
        const { navigation } = await this.props;
        await this.setState({
            amount: navigation.getParam('amount'),
            angsuran_id: navigation.getParam('angsuran_id'),
            nomor_gcash: navigation.getParam('nomor_gcash'),
            user_id: navigation.getParam('user_id'),
            penyedia_layanan: "PT Pegadaian Persero",
            jenis_transaksi: "Angsuran Amanah",
            pin: navigation.getParam('pin'),
            norekgcash: navigation.getParam('norekgcash'),
            akhir: navigation.getParam('akhir'),
            pengajuan_id: navigation.getParam('pengajuan_id')
        })
        // let userid = await AsyncStorage.getItem("userId")
        await this.props.dispatch(getGcashBalance(this.state.user_id, this.state.nomor_gcash))
        // console.warn(this.state.user_id+" "+this.state.nomor_gcash)
        // console.warn(this.props.gcashProp.dataGcashBalance)
        await this.props.gcashProp.dataGcashBalance.map(async (item, i) =>
            this.setState({ saldo: item.balance })
        )
    }

    bayarGcash = async () => {
        if (this.state.password == this.state.pin) {
            await this.props.dispatch(bayarGcash(
                this.state.amount,
                this.state.angsuran_id,
                this.state.nomor_gcash,
                this.state.jenis_transaksi,
                this.state.penyedia_layanan,
                this.state.user_id,
            ))
            if (this.state.akhir == true) {
                await this.props.dispatch(lunasPengajuan(this.state.pengajuan_id))
                alert("selamat sudah lunas \npihak pegadaian akan menghubungi kamu")
                this.props.navigation.popToTop()
                // && 
                this.props.navigation.navigate('Journey')
            }
            else {
                Alert.alert("pembayaran berhasil")
                this.props.navigation.popToTop()
                // && 
                this.props.navigation.navigate('Journey')
            }
        }
        else {
            Alert.alert("pin salah")
        }
    }
    // componentWillUnmount(){
    //     this.subs.forEach(sub => {
    //         sub.remove()
    //     })
    // }

    render() {
        // let category = navigation.getParam('category', 'category');
        const { password } = this.state;
        return (
            // <View>
            <Container>
                <Content>
                    <View style={{ alignSelf: 'center', marginTop: '2%', borderColor: 'green', borderWidth: 1, padding: 10, flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ alignSelf: 'flex-start', fontSize: 13, color: 'black' }}>No Rekening</Text>
                            <Text style={{ alignSelf: 'flex-start', fontSize: 13, color: 'black' }}>Saldo</Text>
                            <Text style={{ alignSelf: 'flex-start', fontSize: 13, color: 'black' }}>Biaya Angsuran</Text>
                        </View>
                        <View style={{ marginLeft: '15%', flexDirection: 'column' }}>
                            <Text style={{ alignSelf: 'flex-end', fontSize: 13, color: 'green', fontWeight: 'bold' }}>{this.state.norekgcash}</Text>
                            <NumberFormat value={this.state.saldo} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ alignSelf: 'flex-end', fontSize: 13, color: '#2ECC71', fontWeight: 'bold' }}>{value}</Text>} />
                            <NumberFormat value={this.state.amount} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ alignSelf: 'flex-end', fontSize: 13, color: 'red', fontWeight: 'bold' }}>{value}</Text>} />
                        </View>
                    </View>
                    <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: '5%' }}>
                        <Text>Masukkan Pin G-cash</Text>
                        <SmoothPinCodeInput
                            password mask="﹡"
                            maskDelay={0}
                            cellSize={36}
                            codeLength={6}
                            value={password }
                            onTextChange={password => this.setState({ password })} />
                    </View>
                    <View style={{ alignSelf: 'center', marginTop: '5%', width: '33%', marginBottom: '3%' }}>
                        {this.state.saldo > this.state.amount ?
                            <Button onPress={() => this.bayarGcash()}
                                success
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Konfirmasi</Text>
                            </Button>
                            :
                            <Button onPress={() => this.bayarGcash()}
                                disabled
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Konfirmasi</Text>
                            </Button>
                        }
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: "10%",
        marginRight: "10%",
        alignItems: "stretch",
        justifyContent: "center"
    }
});

const mapStateToProps = (state) => {
    return {
        gcashProp: state.gcash
    }
}

export default connect(mapStateToProps)(Transfer3);
