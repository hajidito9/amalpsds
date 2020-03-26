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
  StatusBar, BackHandler
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Header, Content, Item, Form, Input, Label, Button, Text, View } from 'native-base';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/dist/SimpleLineIcons'
import { connect } from 'react-redux';
import { verifikasiPengajuan } from '../publics/redux/actions/pengajuan';
import { inputBpkb } from '../publics/redux/actions/kendaraan';

class LoginScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Masukkan No BPKB',
      headerTintColor: "white",
      headerTitleStyle: {
          // width: '90%',
          textAlign: 'center',
          color: 'white'
      },
      headerStyle: {
          elevation: null,
          backgroundColor: '#2ECC71'
      },
  }
  }

  constructor() {
    super();
    this.state = {
      pengajuan_id:'',
      bpkb:'',
      nasabah_id:''
    };
  }

  componentDidMount = async () => {
    let aspengajuan_id = await AsyncStorage.getItem("pengajuan_id")
    await this.setState({ pengajuan_id: aspengajuan_id })
    let asnasabah_id = await AsyncStorage.getItem("nasabah_id")
    await this.setState({ nasabah_id: asnasabah_id })
  }

  onChangeBpkb = bpkb => this.setState({ bpkb });

  verifikasi = async () => {
    await this.props.dispatch(verifikasiPengajuan(this.state.pengajuan_id));
    await this.props.dispatch(inputBpkb(this.state.pengajuan_id,this.state.bpkb));
    alert("Pengajuan dengan ID nasabah: "+this.state.nasabah_id+"\nBerhasil Disetujui")
    this.props.navigation.navigate('HomeAdmin');
  };

  render() {
    return (
      <Container>
        <Content>
          <Image
            source={require('../assets/icons8-certificate-64.png')}
            style={{ alignSelf: 'center', marginTop: '20%', height: 64, width: 64 }}
          />
          <Form style={{ alignItems: 'center' }}>
            <Item style={{
              marginVertical: 10,
              width: '70%',
              borderColor: 'black',
            }}>
              <Icon2 style={{ color: 'grey', fontSize: 20 }} name='pencil' />
              <TextInput
                placeholder="No BPKB"
                placeholderTextColor='grey'
                style={{
                  marginLeft: '10%',
                  fontSize: 16,
                  color: 'grey',
                  alignSelf: 'center'
                }}
                onChangeText={this.onChangeBpkb}
              // value={this.state.email}
              // onChangeText={this.onChangeTextEmail}
              />
            </Item>
           </Form>
          <Button
            onPress={this.verifikasi}
            style={{
              justifyContent: 'center', alignSelf: 'center', width: '70%',
              marginVertical: 10,
              paddingHorizontal: 16,
            }}
            success>
            <Text >Setujui</Text>
          </Button>
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