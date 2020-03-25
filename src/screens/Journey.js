import React, { Component } from 'react';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import { Container, Header, Content, Switch, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import Slider from "react-native-slider";
import Icon2 from 'react-native-vector-icons/dist/AntDesign';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome5';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import ToggleSwitch from 'toggle-switch-react-native';
// import { Switch } from 'react-native-switch';
import { connect } from 'react-redux';
import { getJourney } from '../publics/redux/actions/journey';
import NumberFormat from 'react-number-format';
import AsyncStorage from '@react-native-community/async-storage';
import { getPengajuan } from '../publics/redux/actions/pengajuan';
import { getGcashBalance } from '../publics/redux/actions/gcash';
import { getGcash } from '../publics/redux/actions/gcash';

class Journey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0.3,
      toggled: false,
      sekarang: 0,
      sisabulan: 0,
      sisabayar: 0,
      sudahbayar: 0,
      angsuran: 0,
      tenor: 0,
      step: 0,
      verifikasi: true,
      nomor_gcash: '',
      user_id: '',
      saldo: 0,
      kategori: '',
      lunas:false
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
      headerLeft: null,
      headerStyle: {
        elevation: null,
        backgroundColor: '#2ECC71'
      },
      headerRight: (
        // <Button style={{ elevation: 0, marginTop: 5, backgroundColor: '#2ECC71' }}>
        //   <Icon3 name='history' style={{ fontSize: 20, marginRight: 20, color: 'white' }} />
        // </Button>
        null
      ),
    }
  }

  componentDidMount = async () => {
    this.subs = [
      this.props.navigation.addListener('willFocus', async () => {
        
        let user_id = await AsyncStorage.getItem("userId")
        await this.props.dispatch(getPengajuan(user_id))
        let adaPengajuan = await this.props.pengajuanProp.dataPengajuanNasabah.length
        // console.warn(this.props.pengajuanProp.dataPengajuanNasabah)
        this.props.pengajuanProp.dataPengajuanNasabah.map((item, i) =>
            this.setState({ verifikasi: item.verifikasi, lunas:item.lunas })
        )
        
        if (adaPengajuan > 0 && this.state.verifikasi == false) {
          this.props.navigation.navigate('PengajuanStatus2')
        }
        else if (adaPengajuan > 0 && this.state.lunas == true) {
          this.props.navigation.navigate('PengajuanStatus2')
        }

        else{

        let user_id = await AsyncStorage.getItem("userId")
        await this.props.dispatch(getJourney(user_id))
        // console.warn(this.props.journeyProp.dataJourney)
        await this.props.journeyProp.dataJourney.map((item, i) =>
          // console.warn(item.verifikasi)
          this.setState({
            sekarang: item.sekarang
            , sisabulan: item.sisabulan
            , sisabayar: item.sisabayar
            , sudahbayar: item.sudahbayar
            , angsuran: item.angsuran
            , tenor: item.tenor
            , step: item.step
            , kategori: item.kategori
          })
        )
        let userid = await AsyncStorage.getItem("userId")
        await this.props.dispatch(getGcash(userid))
        await this.props.gcashProp.dataGcash.map(async (item, i) =>
          this.setState({ nomor_gcash: item.nomor_gcash, user_id: userid })
        )
        await this.props.dispatch(getGcashBalance(this.state.user_id, this.state.nomor_gcash))
        await this.props.gcashProp.dataGcashBalance.map(async (item, i) =>
          this.setState({ saldo: item.balance })
        )
        }
      }),
    ]
    // this.setState({step: (this.state.sekarang / this.state.tenor).toFixed(2)})
    // console.warn(this.state.step)
  }

  componentWillUnmount() {
    this.subs.forEach(sub => {
      sub.remove()
    })
  }
  // ubahStep = step => this.setState({ step });

  penyemangat() {
    let persentase = this.state.step * 100
    // console.warn(persentase)
    if (persentase <= 20) {
      return "perjalanan masih panjang"
    }
    else if (persentase > 20 && persentase <= 40) {
      return "kamu sudah bergerak maju lanjutkan"
    }
    else if (persentase > 40 && persentase <= 60) {
      return "Tinggal setengah perjalanan lagi semangat"
    }
    else if (persentase > 60 && persentase <= 80) {
      return "yeay kamu sudah melewati setengah perjalanan"
    }
    else if (persentase > 80 && persentase <= 100) {
      return "teruuuuss pepeeet, kamuu hampiir finish"
    }
  }
  render() {
    // let step= (this.state.sekarang / this.state.tenor).toFixed(2)
    return (
      <Container>
        <Content style={{ backgroundColor: '#e6e6e6', }}>
          <Card >
            <CardItem cardBody style={{ backgroundColor: '#004d4d', }}>
              <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                  {this.state.kategori == 'Motor' ?
                    <Image
                      source={require('../assets/icons8-motorcycle-52.png')}
                      style={{ marginLeft: (this.state.step * 90) + '%', width: 30, height: 30, }} />
                    :
                    <Image
                      source={require('../assets/icons8-people-in-car-side-view-50.png')}
                      style={{ marginLeft: (this.state.step * 90) + '%', width: 30, height: 30, }} />
                  }
                  <Image
                    source={require('../assets/icons8-flag-2-40.png')}
                    style={{ marginLeft: (96 - (this.state.step * 100)) + '%', width: 15, height: 15, }} />
                  {/* {console.warn('jarak'+(100-(this.state.step * 100)))} */}
                </View>
                <Slider
                  thumbTintColor="#d9d9d9"
                  minimumTrackTintColor="white"
                  maximumTrackTintColor="#66ff33"
                  // minimumValue={this.state.step}
                  value={this.state.step}
                  // onValueChange={this.ubahStep}
                  // value={0.17}
                  disabled
                />
                <Text style={{ fontSize: 15, color: 'white' }}>Step: {this.state.sekarang}</Text>
                <Text></Text>
                <Text style={{ fontSize: 20, color: 'white' }}>
                  {this.penyemangat()}
                </Text>
              </View>
            </CardItem>
            <View style={{ flexDirection: 'row', alignSelf: 'center', padding: 10 }}>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Text style={{ color: 'green' }}>{this.state.sekarang}</Text>
                <Text style={{ color: 'grey' }}>Bulan</Text>
              </View>
              <View style={{ flexDirection: 'column', marginLeft: '1%', alignItems: 'center' }}>
                <NumberFormat value={this.state.sudahbayar} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ color: 'green' }}>{value}</Text>} />
                <Text style={{ color: 'grey' }}>Terbayar</Text>
              </View>
              <View style={{ flexDirection: 'column', marginLeft: '1%', alignItems: 'center' }}>
                <Text style={{ color: 'red' }}>{this.state.sisabulan}</Text>
                <Text style={{ color: 'grey' }}>Sisa Bulan</Text>
              </View>
              <View style={{ flexDirection: 'column', marginLeft: '1%', alignItems: 'center' }}>
                <NumberFormat value={this.state.sisabayar} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ color: 'red' }}>{value}</Text>} />
                <Text style={{ color: 'grey' }}>Sisa Bayar</Text>
              </View>
            </View>
          </Card>
          <View style={{ alignSelf: 'center' }}>
            <View style={{ marginTop: '10%', alignItems: 'center' }}>
              <NumberFormat value={this.state.angsuran} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ fontWeight: 'bold', fontSize: 30 }}>{value}</Text>} />
              <Text style={{ fontWeight: 'bold', color: 'grey', fontSize: 15 }}>Cicilan Bulanan Anda</Text>
            </View>
            <View style={{ marginTop: '10%', alignItems: 'center', marginBottom: '5%' }}>
              <View style={{ flexDirection: 'row' }}>
              <Image
                      source={require('../assets/logop.png')}
                      style={{ marginRight:'5%', width: 50, height: 50, }} />
                    <View style={{ flexDirection: 'column' }}>
                  {/* <Text style={{ fontWeight: 'bold', color: 'grey', fontSize: 17 }}> Rp. 650,000</Text> */}
                  <NumberFormat value={this.state.saldo} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ fontWeight: 'bold', color: '#2ECC71', fontSize: 17 }}>{value}</Text>} />
                  {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Transfer')}> */}
                  <Text style={{ color: 'green', fontSize: 15 }}>G-Cash</Text>
                  {/* </TouchableOpacity> */}
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

const mapStateToProps = (state) => {
  return {
    journeyProp: state.journey,
    pengajuanProp: state.pengajuan,
    gcashProp: state.gcash,
  }
}

export default connect(mapStateToProps)(Journey);