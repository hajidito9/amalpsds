import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Container, Header, Content, Button } from 'native-base';

class Pembayaran extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Pembayaran',
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
  render() {
    return (
      // <View>
      <Container>
        <Content>
          <View style={{ marginLeft: '5%', marginTop: '10%' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'green' }}>
              Data Pelanggan
            </Text>
          </View>
          <View style={{ marginLeft: '5%', marginTop: '5%' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text>Nama</Text>
              <Text style={{ marginLeft: '37%' }}>: Diaz Smith</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginTop: '5%' }}>No. Pelanggan</Text>
              <Text style={{ marginTop: '5%', marginLeft: '20%' }}>
                : 12345678
              </Text>
            </View>
            <View
              style={{
                marginTop: '5%',
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
              }}
            />
          </View>

          <View style={{ marginLeft: '5%', marginTop: '10%' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'green' }}>
              Angsuran Kredit
            </Text>
          </View>
          <View style={{ marginLeft: '5%', marginTop: '5%' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginTop: '5%' }}>Jatuh Tempo</Text>
              <Text style={{ marginTop: '5%', marginLeft: '22%' }}>
                : 29 Oktober 2019
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginTop: '5%' }}>Tagihan-Ke</Text>
              <Text style={{ marginTop: '5%', marginLeft: '26%' }}>: 9</Text>
            </View>
            <View
              style={{
                marginTop: '5%',
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
              }}
            />
          </View>
          {/* </View> */}
          <View style={{ flexDirection: 'row', alignSelf:'center', marginTop: '10%', alignItems:'center' }}>
            <View style={{ flexDirection: 'column', marginLeft: '5%', alignItems: 'center' }}>
              <Text style={{ marginTop: '5%' }}>Total Pembayaran</Text>
              <Text style={{ marginTop: '5%', color: 'green', fontWeight: 'bold' }}>Rp 1.500.000</Text>
            </View>
            <View style={{ alignSelf: 'center', marginLeft: '5%' }}>
              <Button success onPress={() => this.props.navigation.navigate('Transfer')}>
                <Text>Bayar</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Pembayaran;
