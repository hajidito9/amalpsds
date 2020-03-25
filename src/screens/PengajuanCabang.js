import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  View,
  StatusBar,
  Alert, BackHandler, TextInput
} from 'react-native';
import { Left, Icon, List, ListItem, Container, Content, Item } from 'native-base'
import MapView, { Callout } from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import { connect } from 'react-redux';
import { getCabang, cariCabang, cabangTerdekat } from '../publics/redux/actions/cabang';
import AsyncStorage from '@react-native-community/async-storage';

class pengajuanCabang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      avatar: '',
      region: {
        latitude: -6.182626,
        longitude: 106.778096,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      latitude: -6.182626,
      longitude: 106.778096,
      latitudeCabang: -6.182628,
      longitudeCabang: 106.778098,
      error: null,
      concat: null,
      coords: [],
      x: 'false',
      cordLatitude: -6.23,
      cordLongitude: 106.75,
      idCabang: '',
      namaCabang: 'Pegadaian UPC Patra',
      cari: ''
    };

    this.mergeLot = this.mergeLot.bind(this);

  }

  _refreshGPS = async() => {
    // this.setState({
    //   users: [],
    //   region: {
    //     latitude: 37.78825,
    //     longitude: -122.4324,
    //     latitudeDelta: 0.0922,
    //     longitudeDelta: 0.0421,
    //   },
    //   latitude: -6.270565,
    //   longitude: 106.759550,
    // })

    await navigator.geolocation.getCurrentPosition(
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
    this.getCabangTerdekat(this.state.latitude,this.state.longitude)
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

  getDataCabang = async () => {
    await this.props.dispatch(getCabang())
  }

  getCabangTerdekat = async (lat,long) => {
    await this.props.dispatch(cabangTerdekat(lat,long))
  }

  pilihCabang = async () => {
    await AsyncStorage.setItem("idCabang", this.state.idCabang)
    await AsyncStorage.setItem("namaCabang", this.state.namaCabang)
    this.props.navigation.navigate('Pengajuan1')
  }

  setCabang = async (longitude, latitude, idCabang, namaCabang) => {
    await this.setState({ latitudeCabang: latitude })
    await this.setState({ longitudeCabang: longitude })
    await this.setState({ idCabang: idCabang })
    await this.setState({ namaCabang: namaCabang })
    await this.setState({
      region: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    })
  }

  ubahCari = cari => this.setState({ cari });

  cari = async (cari) => {
    await this.props.dispatch(cariCabang(cari))
  }
  componentWillMount = async () => {
    this.getDataCabang()
    // console.warn(this.props.cabangProp.dataCabang)
    this.props.navigation.setParams({ pilihCabang: this.pilihCabang })

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
      headerTitle: 'Pilih Cabang',
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
      headerRight: (
        <TouchableOpacity onPress={navigation.getParam('pilihCabang')}>
          <Icon ion-icon name="checkmark-circle-outline" style={{ color: 'white', marginRight: 10 }} />
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
      console.log('masuk fungsi')
      this.setState({ x: "error" })
      return error
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <StatusBar barStyle="light-content" backgroundColor="black" /> */}
        <MapView style={styles.map}
          region={this.state.region}
          initialRegion={this.state.region}
        >

          {!!this.state.latitude && !!this.state.longitude &&
            <MapView.Marker
              coordinate={{ "latitude": this.state.latitude, "longitude": this.state.longitude }}
              // description={User.email}
              pinColor='#000000'
            >
              <View style={{ width: 200 }}>
                <Callout tooltip={true} >
                  <Text style={{ padding: 5, borderWidth: 1, textAlign: 'center', backgroundColor: 'white', borderColor: 'green', fontSize: 12, fontWeight: 'bold', color: 'green' }}>Kamu</Text>
                </Callout>
              </View>

            </MapView.Marker>}
          {!!this.state.latitudeCabang && !!this.state.longitudeCabang &&
            <MapView.Marker
              coordinate={{ "latitude": this.state.latitudeCabang, "longitude": this.state.longitudeCabang }}
              // description={User.email}
              pinColor='green'
            >
              <View style={{ width: 200 }}>
                <Callout tooltip={true} >
                  <Text style={{ padding: 5, borderWidth: 1, borderColor: 'green', textAlign: 'center', backgroundColor: 'white', fontSize: 12, fontWeight: 'bold', color: 'green' }}>{this.state.namaCabang}</Text>
                </Callout>
              </View>
            </MapView.Marker>}
        </MapView>
        <View style={{ position: 'absolute', top: '35%', left: '80%' }}>
          <TouchableOpacity onPress={this._refreshGPS}>
            <Image
              source={require('../assets/my-location-icon-png-16-transparent.png')}
              style={{ alignSelf: 'center', marginTop: '20%', height: 70, width: 70 }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ bottom: 0, right: 0, left: 0, top: '50%', position: 'absolute', backgroundColor: 'white' }}>
          <View style={{ flexDirection: 'row' }}>
            <Item style={{
              width: '90%',
              marginLeft: '5%',
              borderColor: 'black',
            }}>
              <TouchableOpacity onPress={()=> this.cari(this.state.cari)}>
                <Icon style={{ color: 'grey', fontSize: 20 }} name='ios-search' />
              </TouchableOpacity>
              <TextInput
                placeholder="Cari"
                placeholderTextColor='grey'
                style={{
                  fontSize: 16,
                  width:'90%',
                  color: 'grey',
                  alignSelf: 'center'
                }}
                value={this.state.cari}
                onChangeText={this.ubahCari}
              />
            </Item>
          </View>

          {this.props.cabangProp.dataCabang.map((item, i) =>
            <ListItem >
              <TouchableOpacity onPress={() => this.setCabang(parseFloat(item.longitude), parseFloat(item.latitude), item.cabang_id, item.nama)}>
                <Left style={{ flexDirection: 'column' }}>
                  <Text style={{ alignSelf: 'flex-start' }}>{item.nama}</Text>
                </Left>
              </TouchableOpacity>
            </ListItem >
          )}
        </ScrollView>
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

const mapStateToProps = (state) => {
  return {
    cabangProp: state.cabang
  }
}

export default connect(mapStateToProps)(pengajuanCabang);
