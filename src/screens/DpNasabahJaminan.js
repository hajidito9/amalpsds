import React, { Component } from 'react';
import { View, StyleSheet, Image,Linking, TouchableHighlight, TouchableOpacity, TextInput } from 'react-native';
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
import { getDpJaminan } from '../publics/redux/actions/nasabah';
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
            jenis: '',
            berat_kotor: 0,
            berat_bersih: 0,
            karat: 0,
            taksiran: 0,
            persen: 0,
            jumlahdp: 0,
            link: ''
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
        headerTitle: 'Uang Muka Jaminan',
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
                await this.props.dispatch(getDpJaminan(nasabah_id))

                this.props.nasabahProp.dataDpJaminan.map(async (item, i) =>
                    // console.warn(item.verifikasi)
                    this.setState({
                        jenis: item.jenis,
                        berat_kotor: item.berat_kotor,
                        berat_bersih: item.berat_bersih,
                        karat: item.karat,
                        taksiran: item.taksiran,
                        persen: item.persen,
                        jumlahdp: item.jumlahdp,
                        link: item.link,
                    }),
                )
            }),
        ]
    }

    componentWillUnmount() {
        this.subs.forEach(sub => {
            sub.remove()
        })
    }

    pekerjaanNasabah = async () => {
        let jenis_pekerjaan = await AsyncStorage.getItem("jenis_pekerjaan")
        if (jenis_pekerjaan == 'Pegawai') {
            this.props.navigation.navigate('PegawaiNasabah')
        }
        else if (jenis_pekerjaan == 'Mikro') {
            this.props.navigation.navigate('MikroNasabah')
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
                                    <Text style={{ color: 'grey' }}>Gambar Perhiasan: </Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-start' }}>
                                    <Text style={{ color: 'grey' }}>Jenis Perhiasan: </Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-start' }}>
                                    <Text style={{ color: 'grey' }}>Berat Kotor: </Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-start' }}>
                                    <Text style={{ color: 'grey' }}>Berat Bersih: </Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-start' }}>
                                    <Text style={{ color: 'grey' }}>Kadar Karat: </Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-start' }}>
                                    <Text style={{ color: 'grey' }}>Taksiran: </Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-start' }}>
                                    <Text style={{ color: 'grey' }}>Persen Uang Muka: </Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-start' }}>
                                    <Text style={{ color: 'grey' }}>Total Uang Muka: </Text>
                                </ListItem>
                            </List>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <List>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                    <TouchableHighlight
                                        style={{ alignSelf: 'flex-end', color: 'green', fontWeight: 'bold' }}
                                        activeOpacity={0.5}
                                        onPress={() => Linking.openURL(this.state.link)}
                                    >
                                        <Image style={{ width: 23, height: 23}}
                                            source={require('../assets/icons8-download-30.png')}
                                        />
                                        {/* <Text>Download KTP</Text> */}
                                    </TouchableHighlight>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: "black", alignSelf: 'flex-end' }}>{this.state.jenis}</Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: "black", alignSelf: 'flex-end' }}>{this.state.berat_kotor}g</Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: "black", alignSelf: 'flex-end' }}>{this.state.berat_bersih}g</Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: "black", alignSelf: 'flex-end' }}>{this.state.karat}</Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                <NumberFormat value={this.state.taksiran} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ color: "black", alignSelf: 'flex-end' }}>{value}</Text>} />
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: "black", alignSelf: 'flex-end' }}>{(this.state.persen * 100).toFixed(2)}%</Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                <NumberFormat value={this.state.jumlahdp} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ color: "black", alignSelf: 'flex-end' }}>{value}</Text>} />
                                </ListItem>
                            </List>
                        </View>
                    </View>
                    <Button style={{ justifyContent: 'center', alignSelf: 'center', width: '90%' }} success onPress={() =>
                        this.pekerjaanNasabah()
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
