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
import { getMerk } from '../publics/redux/actions/kendaraan';
import AsyncStorage from '@react-native-community/async-storage';

class PengajuanStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: undefined,
            selected1: undefined,
            selected2: undefined,
            selected3: undefined,
            value: 0.1,
            merkId: ''
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
        headerTitle: 'Kondisi Kendaraan',
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
        await this.props.dispatch(getMerk())
    }

    componentDidMount = () => {
        const { navigation } = this.props;
        this.setState({ merkId: navigation.getParam('merkId') })
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

    render() {
        // let category = navigation.getParam('category', 'category');
        return (
            // <View>
            <Container>
                <Content>
                   
                    <List style={{ marginTop: '5%', marginBottom: '5%' }}>
                        <ListItem >
                            <TouchableOpacity onPress={() => AsyncStorage.setItem("statusKendaraan","Baru").then(this.props.navigation.navigate('PengajuanListKendaraan', 
                                {
                                    merkId : this.state.merkId,
                                    status: 'baru',
                                }))}>
                                <Left style={{ flexDirection: 'column' }}>
                                    <Text style={{ alignSelf: 'flex-start' }}>Baru</Text>
                                </Left>
                            </TouchableOpacity>
                        </ListItem>
                        <ListItem >
                            <TouchableOpacity onPress={() => AsyncStorage.setItem("statusKendaraan","Bekas").then( this.props.navigation.navigate('PengajuanListKendaraan', 
                                {
                                    merkId : this.state.merkId,
                                    status: 'bekas',
                                }))}>
                                <Left style={{ flexDirection: 'column' }}>
                                    <Text style={{ alignSelf: 'flex-start' }}>Bekas</Text>
                                </Left>
                            </TouchableOpacity>
                        </ListItem>
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

export default connect(mapStateToProps)(PengajuanStatus);
