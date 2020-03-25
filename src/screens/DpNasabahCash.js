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
import { getDpCash } from '../publics/redux/actions/nasabah';
import AsyncStorage from '@react-native-community/async-storage';

class DpCashNasabah extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: undefined,
            selected1: undefined,
            selected2: undefined,
            selected3: undefined,
            value: 0.1,
            jumlahdp: 0,
            persen: 0,
            diskonmunah: 0
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
        headerTitle: 'Uang Muka Cash',
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
                await this.props.dispatch(getDpCash(nasabah_id))

                this.props.nasabahProp.dataDpCash.map(async (item, i) =>
                    // console.warn(item.verifikasi)
                    this.setState({
                        jumlahdp: item.jumlahdp,
                        persen: item.persen,
                        diskonmunah: item.diskonmunah,
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
                                    <Text style={{ color: 'grey' }}>Persen Uang Muka: </Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-start' }}>
                                    <Text style={{ color: 'grey' }}>Diskon Munah: </Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-start' }}>
                                    <Text style={{ color: 'grey' }}>Total Uang Muka: </Text>
                                </ListItem>
                            </List>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <List>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: "black", alignSelf: 'flex-end' }}>{(this.state.persen * 100).toFixed(2)}%</Text>
                                </ListItem>
                                <ListItem style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: "black", alignSelf: 'flex-end' }}>{(this.state.diskonmunah * 100).toFixed(2)}%</Text>
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

export default connect(mapStateToProps)(DpCashNasabah);
