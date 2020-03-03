import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  View,
  StatusBar,
  Alert, BackHandler
} from 'react-native';
import { Icon } from 'native-base'
import MapView, { Callout } from 'react-native-maps';
import Polyline from '@mapbox/polyline';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      latitude: -6.270565,
      longitude: 106.759550,
      error: null,
      concat: null,
      coords: [],
      x: 'false',
      cordLatitude: -6.23,
      cordLongitude: 106.75,

    };

    this.mergeLot = this.mergeLot.bind(this);

  }

  _refreshGPS =()=> {
    this.setState({
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      latitude: -6.270565,
      longitude: 106.759550,
    })
    

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        this.mergeLot();
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
  }
  
  mergeLot() {
    if (this.state.latitude != null && this.state.longitude != null) {
      let concatLot = this.state.latitude + "," + this.state.longitude
      this.setState({
        concat: concatLot
      }, () => {
        this.getDirections(concatLot, "-6.270565,106.759550");
      });
    }

  }

  
  componentWillMount = async () => {

    this.props.navigation.setParams({ refreshGPS: this._refreshGPS })
      
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        this.mergeLot();
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Map',
      headerTitleStyle: {
        width: '90%',
        textAlign: 'center',
        color: 'white'
      },
      headerStyle: {
        elevation: null,
        backgroundColor: 'black'
      },
      headerRight: (
        <TouchableOpacity onPress={navigation.getParam('refreshGPS')}>
          <Icon ion-icon name="ios-pin" style={{ color: 'white', marginRight: 10 }} />
        </TouchableOpacity>
      )
    }
  }

  trackingFriend(lat, lon) {
    this.setState({
      region: {
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    })
  }

  async getDirections(startLoc, destinationLoc) {

    try {
      let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`)
      let respJson = await resp.json();
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      this.setState({ coords: coords })
      this.setState({ x: "true" })
      return coords
    } catch (error) {
      this.setState({ x: "error" })
      return error
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <MapView style={styles.map}
          region={this.state.region}
          initialRegion={this.state.region}
        >

          {!!this.state.latitude && !!this.state.longitude &&
            <MapView.Marker
              coordinate={{ "latitude": this.state.latitude, "longitude": this.state.longitude }}
            >
              <View style={{ width: 200 }}>
                <Callout tooltip={true} >
                  <Text style={{ padding: 5, borderRadius: 20, borderWidth: 1, borderColor: 'white', textAlign: 'center', backgroundColor: 'grey', fontSize: 12, fontWeight: 'bold', color: 'white' }}>You</Text>
                </Callout>
              </View>

            </MapView.Marker>}

        </MapView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});