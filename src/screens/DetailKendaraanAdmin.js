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
import { getDetailKendaraan } from '../publics/redux/actions/nasabah';
import AsyncStorage from '@react-native-community/async-storage';

class DetailKendaraanAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: undefined,
            selected1: undefined,
            selected2: undefined,
            selected3: undefined,
            value: 0.1,
            merk: '',
            negara: '',
            persenDp: 0,
            tipe: '',
            status: '',
            cc: '',
            warna: '',
            keterangan: '',
            tahun: '',
            harga: 0,
            jenis_dp:'',
            jenis_pekerjaan:'',
            tenor:0,
            marhunbih:0,
            angsuran:0,
            cabang:'',
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
        headerTitle: 'Kendaraan Yang Diajukan',
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

    componentDidMount = async () => {
        // BackHandler.addEventListener('hardwareBackPress', function() {
        //     return true;
        // });
        this.subs = [
          this.props.navigation.addListener('willFocus', async () => {
    
            let nasabah_id = await AsyncStorage.getItem("nasabah_id")
            await this.props.dispatch(getDetailKendaraan(nasabah_id))
    
            this.props.nasabahProp.dataDetailKendaraanNasabah.map((item, i) =>
              // console.warn(item.verifikasi)
              this.setState({
                merk: item.merk,
                negara: item.negara,
                tipe: item.tipe,
                status: item.status,
                cc: item.cc,
                warna: item.warna,
                keterangan: item.keterangan,
                tahun: item.tahun,
                harga: item.harga,
                jenis_pekerjaan: item.jenis_pekerjaan,
                jenis_dp:item.jenis_dp,
                tenor:item.tenor,
                marhunbih:item.marhunbih,
                angsuran:item.angsuran,
                cabang:item.cabang,
                pengajuan_id:item.pengajuan_id
              }),
            )
            await AsyncStorage.setItem("pengajuan_id", this.state.pengajuan_id)
            await AsyncStorage.setItem("cabang", this.state.cabang)
            await AsyncStorage.setItem("angsuran", this.state.angsuran.toString())
            await AsyncStorage.setItem("marhunbih", this.state.marhunbih.toString())
            await AsyncStorage.setItem("harga", this.state.harga.toString())
            await AsyncStorage.setItem("tenor", this.state.tenor.toString())
            await AsyncStorage.setItem("merk", this.state.merk)
            await AsyncStorage.setItem("tipe", this.state.tipe)
            await AsyncStorage.setItem("status", this.state.status)
            await AsyncStorage.setItem("warna", this.state.warna)
            await AsyncStorage.setItem("jenis_dp", this.state.jenis_dp)
            await AsyncStorage.setItem("jenis_pekerjaan", this.state.jenis_pekerjaan)
          }),
        ]
      }
    
      componentWillUnmount() {
        this.subs.forEach(sub => {
          sub.remove()
        })
      }

      dpNasabah=async()=>{
        let jenis_dp = await AsyncStorage.getItem("jenis_dp")
        if (jenis_dp == 'jaminan'){
            this.props.navigation.navigate('DpNasabahJaminan')
        } 
        else if (jenis_dp == 'cash'){
            this.props.navigation.navigate('DpNasabahCash')
        } 
        else if (jenis_dp == 'tabEmas'){
            this.props.navigation.navigate('DpNasabahTabEmas')
        } 
      }
    
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
                                    <Text style={{ color: "black", alignSelf: 'flex-end' }}>{this.state.merk}</Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: "black", alignSelf: 'flex-end' }}>{this.state.negara}</Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: "black", alignSelf: 'flex-end' }}>{this.state.tipe}</Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: "black", alignSelf: 'flex-end' }}>{this.state.cc}</Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: "black", alignSelf: 'flex-end' }}>{this.state.warna}</Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: "black", alignSelf: 'flex-end' }}>{this.state.keterangan}</Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: "black", alignSelf: 'flex-end' }}>{this.state.status}</Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                    <NumberFormat value={this.state.harga} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ color: "black", alignSelf: 'flex-end' }}>{value}</Text>} />
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: "black", alignSelf: 'flex-end' }}>{this.state.tahun}</Text>
                                </ListItem>
                            </List>
                        </View>
                    </View>
                    <Button style={{ justifyContent: 'center', alignSelf: 'center', width: '90%' }} success onPress={() =>
                        this.dpNasabah()
                    }>
                        <Text >Lanjut</Text>
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
      nasabahProp: state.nasabah
    }
  }
  
export default connect(mapStateToProps)(DetailKendaraanAdmin);
