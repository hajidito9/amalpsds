import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
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
    List,
    ListItem,
    ActivityIndicator,
    Left, Right,
} from 'native-base';
import NumberFormat from 'react-number-format';

import Icon2 from 'react-native-vector-icons/dist/FontAwesome5';
import { connect } from 'react-redux';
import { getDetailKendaraan, getDetailMerk } from '../publics/redux/actions/kendaraan';
import AsyncStorage from '@react-native-community/async-storage';

class PengajuanDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: undefined,
            selected1: undefined,
            selected2: undefined,
            selected3: undefined,
            value: 0.1,
            tipeId: '',
            merkId: '',
            negara: '',
            persenDp: 0,
            tipe: '',
            status: '',
            cc: '',
            warna: '',
            keterangan: '',
            tahun: '',
            harga: 0
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
        headerTitle: 'Detail Kendaraan',
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

    getData = async () => {
        const { navigation } = this.props;
        await this.setState({ tipeId: navigation.getParam('tipeId') })
        await this.setState({ merkId: navigation.getParam('merkId') })
        // console.warn(this.state.merkId)
        await this.props.dispatch(getDetailMerk(this.state.merkId))
        await this.props.dispatch(getDetailKendaraan(this.state.tipeId))
    }

    componentDidMount = async () => {
        await this.getData();
        this.props.kendaraanProp.dataDetailMerk.map((item, i) => this.setState({ negara: item.negara }))
        this.props.kendaraanProp.dataDetailMerk.map((item, i) => this.setState({ persenDp: item.persendp }))
        this.props.kendaraanProp.dataDetailKendaraan.map((item, i) => this.setState({ harga: item.harga }))
        this.props.kendaraanProp.dataDetailKendaraan.map((item, i) => this.setState({ tipe: item.tipe }))
        this.props.kendaraanProp.dataDetailKendaraan.map((item, i) => this.setState({ status: item.status }))
        this.props.kendaraanProp.dataDetailKendaraan.map((item, i) => this.setState({ cc: item.cc }))
        this.props.kendaraanProp.dataDetailKendaraan.map((item, i) => this.setState({ warna: item.warna }))
        this.props.kendaraanProp.dataDetailKendaraan.map((item, i) => this.setState({ keterangan: item.keterangan }))
        this.props.kendaraanProp.dataDetailKendaraan.map((item, i) => this.setState({ tahun: item.tahun }))

        // console.warn("data: " +  JSON.stringify(this.props.kendaraanProp.dataDetailKendaraan))
        // console.warn("merk: "+this.props.kendaraanProp.dataDetailMerk[0].nama)
        // this.subs = [
        //     this.props.navigation.addListener('willFocus',()=>{
        //         this.setState({loading: true})
        //         this.getData();
        //     }),
        // ]
    }
    pilihKendaraan = async () => {
        await AsyncStorage.setItem("persenDp", JSON.stringify(this.state.persenDp))
        await AsyncStorage.setItem("asalKendaraan", this.state.negara)
        await AsyncStorage.setItem("hargaKendaraan", JSON.stringify(this.state.harga))
        await AsyncStorage.setItem("idKendaraan", this.state.tipeId)
        await AsyncStorage.setItem("tipeKendaraan", this.state.tipe)
        await AsyncStorage.setItem("statusKendaraan", this.state.status)
        await AsyncStorage.setItem("ccKendaraan", this.state.cc)
        await AsyncStorage.setItem("warnaKendaraan", this.state.warna)
        await AsyncStorage.setItem("keteranganKendaraan", this.state.keterangan)
        await AsyncStorage.setItem("tahunKendaraan", this.state.tahun)
        this.props.navigation.navigate('Pengajuan1')
    }

    // componentWillUnmount(){
    //     this.subs.forEach(sub => {
    //         sub.remove()
    //     })
    // }

    render() {
        // let category = navigation.getParam('category', 'category');
        // if (this.props.kendaraanProp.isLoading == true) { 
        //     return(
        //     <ActivityIndicator/>
        //     )
        //  }
        // else {
        return (
            // <View>
            <Container>
                <Content>
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <List>
                                <ListItem style={{ alignSelf: 'flex-start' }}>
                                    <Text style={{ color: 'grey' }}>Merk: </Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-start' }}>
                                    <Text style={{ color: 'grey' }}>Asal Negara: </Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-start' }}>
                                    <Text style={{ color: 'grey' }}>Minimal DP: </Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-start' }}>
                                    <Text style={{ color: 'grey' }}>Tipe: </Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-start' }}>
                                    <Text style={{ color: 'grey' }}>CC: </Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-start' }}>
                                    <Text style={{ color: 'grey' }}>Warna: </Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-start' }}>
                                    <Text style={{ color: 'grey' }}>Keterangan: </Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-start' }}>
                                    <Text style={{ color: 'grey' }}>Status: </Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-start' }}>
                                    <Text style={{ color: 'grey' }}>Harga: </Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-start' }}>
                                    <Text style={{ color: 'grey' }}>Tahun: </Text>
                                </ListItem>
                            </List>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <List>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: "black", alignSelf: 'flex-end' }}>{this.props.kendaraanProp.dataDetailMerk.map((item, i) => item.nama)}</Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: "black", alignSelf: 'flex-end' }}>{this.state.negara}</Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: "black", alignSelf: 'flex-end' }}>{this.state.persenDp * 100}%</Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: "black", alignSelf: 'flex-end' }}>{this.props.kendaraanProp.dataDetailKendaraan.map((item, i) => item.tipe)}</Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: "black", alignSelf: 'flex-end' }}>{this.props.kendaraanProp.dataDetailKendaraan.map((item, i) => item.cc)}</Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: "black", alignSelf: 'flex-end' }}>{this.props.kendaraanProp.dataDetailKendaraan.map((item, i) => item.warna)}</Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: "black", alignSelf: 'flex-end' }}>{this.props.kendaraanProp.dataDetailKendaraan.map((item, i) => item.keterangan)}</Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: "black", alignSelf: 'flex-end' }}>{this.props.kendaraanProp.dataDetailKendaraan.map((item, i) => item.status)}</Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                    <NumberFormat value={this.state.harga} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ color: "black", alignSelf: 'flex-end' }}>{value}</Text>} />
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: "black", alignSelf: 'flex-end' }}>{this.props.kendaraanProp.dataDetailKendaraan.map((item, i) => item.tahun)}</Text>
                                </ListItem>
                            </List>
                        </View>
                    </View>
                    <Button style={{ justifyContent: 'center', alignSelf: 'center', width: '90%' }} success onPress={() =>
                        this.pilihKendaraan()
                    }>
                        <Text >Pilih Kendaraan</Text>
                    </Button>
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
        kendaraanProp: state.kendaraan
    }
}

export default connect(mapStateToProps)(PengajuanDetail);
