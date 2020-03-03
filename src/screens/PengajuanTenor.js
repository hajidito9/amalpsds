import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
    Container,
    Header,
    Content,
    Button,
    Form,
    Picker,
    Icon,
    Title,
    Text,
    List,
    ListItem,
    Left, Right,
} from 'native-base';

import Slider from "react-native-slider";
import AsyncStorage from '@react-native-community/async-storage';

class PengajuanTenor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: undefined,
            selected1: undefined,
            selected2: undefined,
            selected3: undefined,
            value: 0.1
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

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Tenor',
            headerTintColor: "white",
            headerTitleStyle: {
                width: '100%',
                textAlign: 'center',
                color: 'white'
            },
            headerStyle: {
                elevation: null,
                backgroundColor: '#2ECC71'
            },
        }
    }
    render() {
        // let category = navigation.getParam('category', 'category');
        return (
            // <View>
            <Container>
                <Content>
                    <List style={{ marginTop: '5%', marginBottom: '5%' }}>
                        <ListItem >
                            <TouchableOpacity onPress={() => AsyncStorage.setItem("tenor",JSON.stringify(12)).then(this.props.navigation.navigate('Pengajuan1'))}>
                                <Left style={{ flexDirection: 'column' }}>
                                    <Text style={{ alignSelf: 'flex-start' }}>12 Bulan</Text>
                                </Left>
                            </TouchableOpacity>
                        </ListItem>
                        <ListItem>
                            <TouchableOpacity onPress={() => AsyncStorage.setItem("tenor",JSON.stringify(18)).then(this.props.navigation.navigate('Pengajuan1'))}>
                                <Left style={{ flexDirection: 'column' }}>
                                    <Text style={{ alignSelf: 'flex-start' }}>18 Bulan</Text>
                                </Left>
                            </TouchableOpacity>
                        </ListItem>
                        <ListItem>
                            <TouchableOpacity onPress={() => AsyncStorage.setItem("tenor",JSON.stringify(24)).then(this.props.navigation.navigate('Pengajuan1'))}>
                                <Left style={{ flexDirection: 'column' }}>
                                    <Text style={{ alignSelf: 'flex-start' }}>24 Bulan</Text>
                                </Left>
                            </TouchableOpacity>
                        </ListItem>
                        <ListItem>
                            <TouchableOpacity onPress={() => AsyncStorage.setItem("tenor",JSON.stringify(36)).then(this.props.navigation.navigate('Pengajuan1'))}>
                                <Left style={{ flexDirection: 'column' }}>
                                    <Text style={{ alignSelf: 'flex-start' }}>36 Bulan</Text>
                                </Left>
                            </TouchableOpacity>
                        </ListItem>
                        <ListItem>
                            <TouchableOpacity onPress={() => AsyncStorage.setItem("tenor",JSON.stringify(48)).then(this.props.navigation.navigate('Pengajuan1'))}>
                                <Left style={{ flexDirection: 'column' }}>
                                    <Text style={{ alignSelf: 'flex-start' }}>48 Bulan</Text>
                                </Left>
                            </TouchableOpacity>
                        </ListItem>
                        <ListItem>
                            <TouchableOpacity onPress={() => AsyncStorage.setItem("tenor",JSON.stringify(60)).then(this.props.navigation.navigate('Pengajuan1'))}>
                                <Left style={{ flexDirection: 'column' }}>
                                    <Text style={{ alignSelf: 'flex-start' }}>60 Bulan</Text>
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

export default PengajuanTenor;
