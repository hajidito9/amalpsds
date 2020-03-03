import React, { Component } from 'react';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import { Container, Header, Content, Switch, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import Slider from "react-native-slider";
import Icon2 from 'react-native-vector-icons/dist/AntDesign';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome5';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import ToggleSwitch from 'toggle-switch-react-native';
// import { Switch } from 'react-native-switch';

export default class Journey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0.3,
      toggled: false,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Journey',
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
      headerRight: (
        <Button style={{ elevation: 0, marginTop: 5, backgroundColor: '#004d4d' }}>
          <Icon3 name='history' style={{ fontSize: 20, marginRight: 20, color: 'white' }} />
        </Button>
      ),
    }
  }

  render() {
    return (
      <Container>
        <Content style={{ backgroundColor: '#e6e6e6', }}>
          <Card >
            <CardItem cardBody style={{ backgroundColor: '#004d4d', }}>
              <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
              <Image
                  source={require('../assets/icons8-motorcycle-52.png')}
                  style={{ marginLeft: '30%', width: 30, height: 30, }} />
                  <Image
                  source={require('../assets/icons8-flag-2-40.png')}
                  style={{ marginLeft: '60%', width: 20, height: 20, }} />
                  </View>
                <Slider
                  thumbTintColor="#d9d9d9"
                  minimumTrackTintColor="white"
                  maximumTrackTintColor="#66ff33"
                  value={this.state.value}
                  disabled
                />
                <Text style={{ fontSize: 15, color: 'white' }}>Step: 3</Text>
                <Text></Text>
                <Text style={{ fontSize: 20, color: 'white' }}>Keep Moving!</Text>
              </View>
            </CardItem>
            <CardItem >
              <Left>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={{ color: 'green' }}>3</Text>
                  <Text style={{ color: 'grey' }}>Bulan</Text>
                </View>
              </Left>
              <Left>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={{ color: 'green', fontSize: 12 }}>Rp 4,500,000</Text>
                  <Text style={{ color: 'grey', fontSize: 15 }}>Terbayar</Text>
                </View>
              </Left>
              <Left>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={{ color: 'red' }}>9</Text>
                  <Text style={{ color: 'grey', fontSize: 13 }}>Sisa Bulan</Text>
                </View>
              </Left>
              <Left>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={{ color: 'red', fontSize: 10 }}>Rp 18,500,000</Text>
                  <Text style={{ color: 'grey', fontSize: 12 }}>Sisa Bayar</Text>
                </View>
              </Left>
            </CardItem>
          </Card>
          <View style={{ alignSelf: 'center' }}>
            <View style={{ marginTop: '10%', alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Rp. 1,500,000</Text>
              <Text style={{ fontWeight: 'bold', color: 'grey', fontSize: 15 }}>Cicilan Bulanan Anda</Text>
            </View>
            <View style={{ marginTop: '10%', alignItems: 'center', marginBottom: '5%' }}>
              <View style={{ flexDirection: 'row' }}>
                <Icon2 style={{ color: 'grey', fontSize: 35 }} name="wallet" />
                <View style={{ flexDirection: 'column' }}>
                  <Text style={{ fontWeight: 'bold', color: 'grey', fontSize: 17 }}> Rp. 650,000</Text>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Transfer')}>
                    <Text style={{ color: 'grey', fontSize: 15 }}> Top Up Dompet</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginLeft: '10%', alignItems: 'center', flexDirection: 'column' }}>
                  <Switch
                    onValueChange={(value) => this.setState({ toggled: value })}
                    value={this.state.toggled}
                  />
                  <Text style={{ color: 'grey', fontSize: 15 }}>Auto Debet</Text>
                </View>
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#004d4d',
    flex: 1,
    flexDirection: 'column',
    width: null,
    height: 300,
    marginLeft: "10%",
    marginRight: "10%",
    alignItems: "stretch",
    justifyContent: "center"
  }
});