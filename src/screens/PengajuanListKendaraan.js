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
import { getList } from '../publics/redux/actions/kendaraan';
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
            merkId:'',
            status:''
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
        headerTitle: 'Tipe Kendaraan',
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
        await this.setState({ merkId: navigation.getParam('merkId') })
        await this.setState({ status: navigation.getParam('status') })
        await this.props.dispatch(getList(this.state.merkId,this.state.status))
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

    render() {
        // let category = navigation.getParam('category', 'category');
        return (
            // <View>
            <Container>
                <Content>
                    <View style={{ flexDirection: 'row' }}>
                        <Item style={{
                            width: '65%',
                            marginLeft: '5%',
                            borderColor: 'black',
                        }}>
                            <Icon style={{ color: 'grey', fontSize: 20 }} name='ios-search' />
                            <TextInput
                                placeholder="Cari"
                                placeholderTextColor='grey'
                                style={{
                                    fontSize: 16,
                                    color: 'grey',
                                    alignSelf: 'center'
                                }}
                            // value={this.state.email}
                            // onChangeText={this.onChangeTextEmail}
                            />
                        </Item>
                        <Icon2 style={{ marginLeft: '5%', marginTop: '4%', fontSize: 20 }} name="sort-amount-down"></Icon2>
                        <Text style={{ marginLeft: '1%', marginTop: '3%', fontSize: 15 }}>Urutkan</Text>
                    </View>
                    <List style={{ marginTop: '5%', marginBottom: '5%' }}>
                        {this.props.kendaraanProp.dataList.map((item, i) =>
                            <ListItem >
                                <TouchableOpacity onPress={() => AsyncStorage.setItem("tipeKendaraan",item.tipe).then(this.props.navigation.navigate('PengajuanWarnaKendaraan', 
                                {
                                    merkId:this.state.merkId,
                                    tipe: item.tipe,
                                    status: this.state.status
                                }))}>
                                    <Left style={{ flexDirection: 'column' }}>
                                        <Text style={{ alignSelf: 'flex-start' }}>{item.tipe}</Text>
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
