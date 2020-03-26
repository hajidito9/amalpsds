import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity,StatusBar, TextInput } from 'react-native';
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
import { getNasabah, cariNasabah } from '../publics/redux/actions/nasabah';
import AsyncStorage from '@react-native-community/async-storage';

class HomeAdmin extends Component {

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
        // headerShown: true,
        headerTitle: 'Daftar Nasabah',
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
        headerLeft:null,
        headerRight: (
            <ListItem>
                <TouchableOpacity onPress={navigation.getParam('logOut')}>
                    <Icon name='md-exit' style={{ fontSize: 30, textAlign: 'right', color:'white', fontWeight: 'bold' }} />
                </TouchableOpacity>
            </ListItem>
        ),
        // headerShown: false,
        // headerVisible: false,
        // header: null,
        // tabBarVisible:false,
    })

    componentWillMount(){
        this.props.navigation.setParams({ logOut: this.logOut })
    }

    logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Login')
      }

    getData = async () => {
        await this.props.dispatch(getNasabah())
    }

    componentDidMount = async () => {
        // await this.getData();
        // console.warn("data: " + JSON.stringify(this.props.kendaraanProp.dataMerk))
        this.subs = [
            this.props.navigation.addListener('willFocus', async()=>{
                // this.setState({loading: true})
                await this.getData();
            }),
        ]
    }

    componentWillUnmount(){
        this.subs.forEach(sub => {
            sub.remove()
        })
    }

    ubahCari = cari => this.setState({ cari });

    cari = async (cari) => {
        // console.warn(cari)
        await this.props.dispatch(cariNasabah(cari))
    }

    render() {
        // let category = navigation.getParam('category', 'category');
        return (
            // <View>
            <Container>
                <StatusBar barStyle="light-content" backgroundColor="#004d4d" />
                <Content>
                    <View style={{ flexDirection: 'row' }}>
                        <Item style={{
                            width: '90%',
                            marginLeft: '5%',
                            borderColor: 'black',
                        }}>
                            <TouchableOpacity onPress={() => this.cari(this.state.cari)}>
                                <Icon style={{ color: 'grey', fontSize: 20 }} name='ios-search' />
                            </TouchableOpacity>
                            <TextInput
                                placeholder="Cari melalui ID"
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
                        {this.props.nasabahProp.dataNasabahAdmin.map((item, i) =>
                            <ListItem >
                                <TouchableOpacity onPress={() => item.nama != '' ? AsyncStorage.setItem("nasabah_id", item.nasabah_id).then(this.props.navigation.navigate('DetailNasabahAdmin')) : ''}>
                                    <Left style={{ flexDirection: 'row' }}>
                                        <Text style={{ alignSelf: 'flex-start', color:'green', fontWeight:'bold' }}>{item.nasabah_id}</Text>
                                        <Text style={{ alignSelf: 'flex-end' }}> | {item.nama}</Text>
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
        nasabahProp: state.nasabah
    }
}

export default connect(mapStateToProps)(HomeAdmin);
