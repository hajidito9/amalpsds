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
    // console.warn("awal token: "+token)
    this.props.navigation.navigate(token ? 'HomeDashboard' : 'Login');
  };

  static navigationOptions = ({ navigation }) => ({
    headerVisible: false,
    header: null
    
})

  render() {
    return (
      <View>
       <ActivityIndicator />
       <StatusBar barStyle="light-content" backgroundColor="white" />
      </View>
    );
  }
}