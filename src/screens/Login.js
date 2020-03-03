import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Modal,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Header, Content, Item, Form, Input, Label, Button, Text, View } from 'native-base';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/dist/SimpleLineIcons'
import { connect } from 'react-redux';
import { toLogin } from '../publics/redux/actions/login';

class LoginScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
    }
  }

  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }

  onChangeTextUsername = username => this.setState({ username });
  onChangeTextPassword = password => this.setState({ password });

  login = async () => {
    await this.props.dispatch(toLogin(this.state.username, this.state.password));

    if (this.props.loginProp.dataLogin.message != "Berhasil Masuk") {
      alert(this.props.loginProp.dataLogin.message);
    }
    else {
      await AsyncStorage.setItem("userToken", this.props.loginProp.dataLogin.token);
      await AsyncStorage.setItem("userId", this.props.loginProp.dataLogin.id);
      AsyncStorage.getItem("userToken", (error, result) => {
       
        if (result) {
          this.props.navigation.navigate('HomeDashboard');
          // console.warn('userToken: '+result);
          // alert(this.props.loginProp.dataLogin.message);
        } 
        // else {
          // alert(this.props.loginProp.dataLogin.message);
        // }
      });
    }
  };

  render() {
    return (
      <Container>
        <Content>
          <Image
            source={require('../assets/logo-pegadaian-syariah.80af3a88.png')}
            style={{ alignSelf: 'center', marginTop: '20%', height: 50, width: 200 }}
          />
          <Text style={{ marginTop: '10%', fontSize: 20, marginLeft: '15%', fontWeight: 'bold' }}>Masuk</Text>
          <Form style={{ alignItems: 'center' }}>
            <Item style={{
              marginVertical: 10,
              width: '70%',
              borderColor: 'black',
            }}>
              <Icon2 style={{ color: 'grey', fontSize: 20 }} name='user' />
              <TextInput
                placeholder="Email atau Telepon"
                placeholderTextColor='grey'
                style={{
                  marginLeft: '10%',
                  fontSize: 16,
                  color: 'grey',
                  alignSelf: 'center'
                }}
                onChangeText={this.onChangeTextUsername}
              // value={this.state.email}
              // onChangeText={this.onChangeTextEmail}
              />
            </Item>
            <Item style={{
              marginVertical: 10,
              width: '70%',
              borderColor: 'black',
            }}
            >
              <Icon style={{ color: 'grey', fontSize: 20 }} name='lock-outline' />
              <Input
                placeholder="Kata Sandi"
                placeholderTextColor='grey'
                secureTextEntry={true}
                style={{
                  marginLeft: '10%',
                  fontSize: 16,
                  color: 'grey',
                  alignSelf: 'center'
                }}
                onChangeText={this.onChangeTextPassword}
              // onChangeText={this.onChangeTextPassword}
              />
            </Item>
          </Form>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Pengajuan1')}>
            <Text style={{ color: 'green', alignSelf: 'flex-end', marginTop: '5%', marginRight: '15%' }}> Lupa Kata Sandi?</Text>
          </TouchableOpacity>
          <Button
            onPress={this.login}
            style={{
              justifyContent: 'center', alignSelf: 'center', width: '70%',
              marginVertical: 10,
              paddingHorizontal: 16,
            }}
            success>
            <Text >Masuk</Text>
          </Button>
          <View style={{ alignSelf: 'center', marginTop: '3%', flexDirection: 'row' }}>
            <Text >Belum punya akun?</Text>
            <TouchableOpacity onPress={this.login}>
              <Text style={{ color: 'green', fontWeight: 'bold' }}> DAFTAR</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginProp: state.login
  }
}

export default connect(mapStateToProps)(LoginScreen);