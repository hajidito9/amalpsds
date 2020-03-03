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

import AsyncStorage from '@react-native-community/async-storage';

import Icon2 from 'react-native-vector-icons/dist/FontAwesome5';
import { connect } from 'react-redux';

class PengajuanKategori extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tipeId: '',
            merkId: ''
        };
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Kategori Kendaraan',
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

    pilihMotor = async () => {
        await AsyncStorage.setItem("kategoriKendaraan",'Motor')
        this.props.navigation.navigate('Pengajuan1')
    }

    pilihMobil = async () => {
        await AsyncStorage.setItem("kategoriKendaraan",'Mobil')
        this.props.navigation.navigate('Pengajuan1')
    }
    
    render() {
            return (
                <Container>
                    <Content>
                    <List style={{ marginTop: '5%', marginBottom: '5%' }}>
                            <ListItem >
                                <TouchableOpacity onPress={this.pilihMotor}>                                
                                    <Left style={{ flexDirection: 'column' }}>
                                        <Text style={{ alignSelf: 'flex-start' }}>Motor</Text>
                                    </Left>
                                </TouchableOpacity>
                            </ListItem>
                            <ListItem >
                                <TouchableOpacity onPress={this.pilihMobil}>                                
                                    <Left style={{ flexDirection: 'column' }}>
                                        <Text style={{ alignSelf: 'flex-start' }}>Mobil</Text>
                                    </Left>
                                </TouchableOpacity>
                            </ListItem>
                    </List>
                    </Content>
                </Container>
            );
        }
}

const mapStateToProps = (state) => {
    return {
        kendaraanProp: state.kendaraan
    }
}

export default connect(mapStateToProps)(PengajuanKategori);
