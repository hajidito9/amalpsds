import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('willFocus', () => {
        this._bootstrapAsync();
      }),
    ]
  }

  componentWillUnmount() {
    this.subs.forEach(sub => {
      sub.remove()
    })
  }

  _bootstrapAsync = async () => {
    let token = await AsyncStorage.getItem('userToken');
    let level = await AsyncStorage.getItem('userLevel');
    // console.warn("awal lvel: "+level)
    if (token != null && level === '1') {
      this.props.navigation.navigate('HomeDashboard');
    }
    else if (token != null && level === '2') {
      this.props.navigation.navigate('HomeAdmin');
    }
    else{
      this.props.navigation.navigate('Login');
    }
  };

  static navigationOptions = ({ navigation }) => ({
    headerVisible: false,
    header: null,
    // headerShown:false
  })

  render() {
    return (
      <View>
        {/* <ActivityIndicator /> */}
        <StatusBar barStyle="light-content" backgroundColor="white" />
      </View>
    );
  }
}