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
    Left, Right,
} from 'native-base';

import Icon2 from 'react-native-vector-icons/dist/FontAwesome5';
import { connect } from 'react-redux';
import { getMerk, cariMerk } from '../publics/redux/actions/kendaraan';
import AsyncStorage from '@react-native-community/async-storage';

class PengajuanMerk extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: undefined,
            selected1: undefined,
            selected2: undefined,
            selected3: undefined,
            value: 0.1,
            cari:'',
            kategoriKendaraan:''
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
        headerTitle: 'Merk Kendaraan',
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
        let asKategoriKendaraan = await AsyncStorage.getItem('kategoriKendaraan')
        await this.setState({kategoriKendaraan : asKategoriKendaraan})
        await this.props.dispatch(getMerk(this.state.kategoriKendaraan))
    }

    componentDidMount = async () => {
        await this.getData();
        // console.warn("data: " + JSON.stringify(this.props.kendaraanProp.dataMerk))
        // this.subs = [
        //     this.props.navigation.addListener('willFocus',()=>{
        //         this.setState({loading: true})
        //         this.getData();
        //     }),
        // ]
    }

    // componentWillUnmount(){
    //     this.subs.forEach(sub => {
    //         sub.remove()
    //     })
    // }
    ubahCari = cari => this.setState({ cari });

    cari = async (kategoriKendaraan, cari) => {
        await this.props.dispatch(cariMerk(kategoriKendaraan, cari))
    }

    render() {
        // let category = navigation.getParam('category', 'category');
        return (
            // <View>
            <Container>
                <Content>
                    <View style={{ flexDirection: 'row' }}>
                        <Item style={{
                            width: '90%',
                            marginLeft: '5%',
                            borderColor: 'black',
                        }}>
                            <TouchableOpacity onPress={() => this.cari(this.state.kategoriKendaraan, this.state.cari)}>
                                <Icon style={{ color: 'grey', fontSize: 20 }} name='ios-search' />
                            </TouchableOpacity>
                            <TextInput
                                placeholder="Cari"
                                placeholderTextColor='grey'
                                style={{
                                    fontSize: 16,
                                    width: '90%',
                                    color: 'grey',
                                    alignSelf: 'center'
                                }}
                                value={this.state.cari}
                                onChangeText={this.ubahCari}
                            />
                        </Item>
                    </View>

                    <List style={{ marginTop: '5%', marginBottom: '5%' }}>
                        {this.props.kendaraanProp.dataMerk.map((item, i) =>
                            <ListItem >
                                <TouchableOpacity onPress={() => item.nama != '' ? AsyncStorage.setItem("idMerk", item.merk_id).then(AsyncStorage.setItem("merkKendaraan", item.nama).then(this.props.navigation.navigate('PengajuanStatusKendaraan',
                                    {
                                        merkId: item.merk_id,
                                    }))) : ''}>
                                    <Left style={{ flexDirection: 'column' }}>
                                        <Text style={{ alignSelf: 'flex-start' }}>{item.nama}</Text>
                                    </Left>
                                </TouchableOpacity>
                            </ListItem>
                        )}
                    </List>
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

export default connect(mapStateToProps)(PengajuanMerk);
