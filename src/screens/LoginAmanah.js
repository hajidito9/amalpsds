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
  AsyncStorage,
  StatusBar,
} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, View } from 'native-base';

class LoginAmanah extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
        headerTitle: 'Log In',
        headerTintColor: "white",
        headerTitleStyle: {
            width: '100%',
            textAlign: 'center',
            color: 'white'
        },
        headerStyle: {
            elevation: null,
            backgroundColor: '#004d4d'
        },
    }
  }

  login = async () => {
    let dataLogin = {
      username: this.state.username,
      password: this.state.password
    };

    await this.props.dispatch(loginUser(dataLogin));

    AsyncStorage.getItem("token", (error, result) => {
      console.log('aaaaaa');
      console.log(result);
      
      if (result) {
        this.props.navigation.goBack();
        alert("berhasil Login");
      } else {
        alert("salah");
      }
    });
  };
  
  render() {
    return (
      <Container>
        <Content>
            <Image
              source={require('../assets/logo.png')}
              style={{ alignSelf: 'center', marginTop: '5%', height:200, width:200 }}
            />
          <Form style={{ alignItems: 'center', marginTop:'10%' }}>
                <Item rounded style={{
                  marginVertical: 10,
                  paddingHorizontal: 16,
                  width: '70%',
                  borderColor: 'grey',
                  alignSelf: 'center',
                }}>
                  <Input
                    placeholder="Email"
                    placeholderTextColor='grey'
                    style={{
                      textAlign: 'center',
                      fontSize: 16,
                      color: 'grey',
                      alignSelf: 'center'
                    }}
                    // value={this.state.email}
                    // onChangeText={this.onChangeTextEmail}
                  />
                </Item>
                <Item rounded style={{
                  marginVertical: 10,
                  paddingHorizontal: 16,
                  width: '70%',
                  borderColor: 'grey',
                  alignSelf: 'center',
                }}>
                  <Input
                    placeholder="Password"
                    placeholderTextColor='grey'
                    secureTextEntry={true}
                    style={{
                      textAlign: 'center',
                      fontSize: 16,
                      color: 'grey',
                      alignSelf: 'center'
                    }}
                    // onChangeText={this.onChangeTextPassword}
                  />
                </Item>
                <Button
                  onPress={() => this.props.navigation.navigate('More')}
                  style={{
                    justifyContent: 'center', alignSelf: 'center', width: '50%',
                    marginVertical: 10,
                    paddingHorizontal: 16,
                  }}
                  rounded success>
                  <Text >Masuk</Text>
                </Button>
            </Form>
            <View style={{ alignSelf: 'center', marginTop:'1%', flexDirection: 'row' }}>

              <Text style={{ color: 'green' }}>Belum punya akun?</Text>

              <TouchableOpacity  onPress={() => this.props.navigation.navigate('Pengajuan1')}>
                <Text style={{ color: 'green', fontWeight: 'bold' }}> Ajukan kredit</Text>
              </TouchableOpacity>
            </View>
        </Content>
      </Container>
    );
  }
}

export default LoginAmanah;