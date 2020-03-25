import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Icon, Container, Header, Content, Button, Title, ListItem, Text, Left, Body, Right, Switch } from 'native-base';
import Icon1 from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Entypo';
import AsyncStorage from '@react-native-community/async-storage';

export default class More extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'More',
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

  logOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Login')
  }
  render() {
    return (
      <Container>
        {/* <View style={{ alignItems: 'center', marginTop:'10%' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color:'grey' }} >More</Text>
        </View> */}
        <Content >
          {/* <ListItem icon style={{ marginTop: '5%' }}>
            <Left>
              <Button style={{ backgroundColor: "grey" }} onPress={() => this.props.navigation.navigate('Profile')}>
                <Icon1 style={{ color: 'white' }} name="user" />
              </Button>
            </Left>
            <Body>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} >
                <Text style={{ color: 'grey' }}>Profil</Text>
              </TouchableOpacity>
            </Body>
            <Right style={{ marginTop: '2%' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} >
                <Icon name="arrow-forward" />
              </TouchableOpacity>
            </Right>
          </ListItem> */}
          <ListItem icon style={{ marginTop: '5%' }}>
            <Left>
              <Button style={{ backgroundColor: "green" }} onPress={() => this.props.navigation.navigate('HomeDashboard')}>
                <Icon1 style={{ color: 'white' }} name="home" />
              </Button>
            </Left>
            <Body>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeDashboard')} >
                <Text style={{ color: 'grey' }}>Beranda</Text>
              </TouchableOpacity>
            </Body>
            <Right style={{ marginTop: '2%' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeDashboard')} >
                <Icon name="arrow-forward" />
              </TouchableOpacity>
            </Right>
          </ListItem>
          {/* <ListItem icon style={{ marginTop: '5%' }}>
            <Left>
              <Button style={{ backgroundColor: "grey" }}>
                <Icon1 style={{ color: 'white' }} name="question" />
              </Button>
            </Left>
            <Body>
              <Text style={{ color: 'grey' }}>FAQ</Text>
            </Body>
            <Right style={{ marginTop: '2%' }}>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon style={{ marginTop: '5%' }}>
            <Left>
              <Button style={{ backgroundColor: "grey" }}>
                <Icon1 style={{ color: 'white' }} name="phone" />
              </Button>
            </Left>
            <Body>
              <Text style={{ color: 'grey' }}>Contact Us</Text>
            </Body>
            <Right style={{ marginTop: '2%' }}>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem> */}
          <ListItem icon style={{ marginTop: '5%' }}>
            <Left>
              <Button style={{ backgroundColor: "red" }}>
                <Icon2 style={{ color: 'white' }} name="log-out" />
              </Button>
            </Left>
            <Body>
              <TouchableOpacity onPress={this.logOut}>
                <Text style={{ color: 'grey' }}>Keluar</Text>
              </TouchableOpacity>
            </Body>
            <Right style={{ marginTop: '2%' }}>
              <TouchableOpacity onPress={this.logOut}>
                <Icon name="arrow-forward" />
              </TouchableOpacity>
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}