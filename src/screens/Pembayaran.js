import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Container, Header, Content, Button } from 'native-base';
import { getJourney } from '../publics/redux/actions/journey';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import AsyncStorage from '@react-native-community/async-storage';
import moment from "moment";

class Pembayaran extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Tagihan',
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
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      nonasabah: '',
      nama: '',
      angsuran: 0,
      jthTempo: '',
      selisihHari: 0,
      tagihanKe: 0,
      denda: 0,
      tipeDp: '',
      total: 0,
      today: new Date(),
      angsuranid: '',
      pengajuanid: '',
      nohp: '',
    };
  }

  componentDidMount = async () => {
    this.subs = [
      this.props.navigation.addListener('willFocus', async () => {
        let user_id = await AsyncStorage.getItem("userId")
        await this.props.dispatch(getJourney(user_id))
        // console.warn(this.props.journeyProp.dataJourney)
        await this.props.journeyProp.dataJourney.map(async (item, i) =>
          // console.warn(item.verifikasi)
          await this.setState({
            nonasabah: item.nonasabah
            , nama: item.nama
            , angsuran: item.angsuran
            , jthTempo: moment(item.jatuhtempo).format('D MMMM YYYY')
            , tagihanKe: item.tagihanke
            , tipeDp: item.jenis_dp
            , selisihHari: item.selisihhari
            , angsuranid: item.angsuranid
            , pengajuanid: item.pengajuan_id
            , nohp: item.no_hp
            // , denda : (((0.02 * item.angsuran)/30) * (this.state.today - item.jatuhtempo)).toFixed(0)
          })
        )
        await this.setState({ denda: (((0.02 * this.state.angsuran) / 30) * (this.state.selisihHari)).toFixed(0) })
        if (this.state.denda > 0) {
          await this.setState({ total: (Number(this.state.angsuran) + Number(this.state.denda)) })
        }
        else {
          await this.setState({ total: Number(this.state.angsuran) })
        }
      }),
    ]
    // console.warn(this.state.denda)
  }

  componentWillUnmount() {
    this.subs.forEach(sub => {
      sub.remove()
    })
  }

  bayar = async () => {
    this.props.navigation.navigate('Transfer',
      {
        amount: this.state.total,
        angsuran_id: this.state.angsuranid,
        pengajuan_id: this.state.pengajuanid,
        nomor_hp: this.state.nohp,
        nasabah_id: this.state.nonasabah
      })
  }

  render() {
    return (
      // <View>
      <Container>
        <Content>
          <View style={{ marginLeft: '5%', marginTop: '5%' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'green' }}>
              Data Pelanggan
            </Text>
          </View>
          <View style={{ marginLeft: '5%', marginTop: '5%' }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'column' }}>
                <Text >ID Nasabah</Text>
                <Text style={{ marginTop: '5%' }}>Nama</Text>
                <Text style={{ marginTop: '5%' }}>Biaya Angsuran</Text>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ marginLeft: '5%' }} >: {this.state.nonasabah}</Text>
                <Text style={{ marginLeft: '5%' }} >: {this.state.nama}</Text>
                <NumberFormat value={this.state.angsuran} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ marginTop: '5%', marginLeft: '5%' }}>: {value}</Text>} />
              </View>
            </View>
            <View
              style={{
                marginTop: '5%',
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
              }}
            />
          </View>
          <View style={{ marginLeft: '5%', marginTop: '5%' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'green' }}>
              Angsuran Pembiayaan
            </Text>
          </View>
          <View style={{ marginLeft: '5%', marginTop: '5%' }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'column' }}>
                <Text>Jatuh Tempo</Text>
                <Text style={{ marginTop: '5%' }}>Tagihan Ke</Text>
                <Text style={{ marginTop: '5%' }}>Denda</Text>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ marginLeft: '5%' }} >: {this.state.jthTempo}</Text>
                <Text style={{ marginTop: '5%', marginLeft: '5%' }}>
                  : {this.state.tagihanKe}
                </Text>
                {/* <NumberFormat value={(((0.02 * this.state.angsuran)/30) * (this.state.today - this.state.tempo)).toFixed(0) > 0 ? (((0.02 * this.state.angsuran)/30) * (this.state.today - this.state.tempo)).toFixed(0) : 0} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ marginTop: '5%', marginLeft: '5%' }}>: {value}</Text>} /> */}
                <NumberFormat value={this.state.denda > 0 ? this.state.denda : 0} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ marginTop: '5%', marginLeft: '5%' }}>: {value}</Text>} />
              </View>
            </View>
            <View
              style={{
                marginTop: '5%',
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
              }}
            />
          </View>
          <View style={{ marginLeft: '5%', marginTop: '5%' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'green' }}>
              Tipe Uang Muka
            </Text>
          </View>
          <View style={{ marginLeft: '5%', marginTop: '5%' }}>
            <Text style={{ marginLeft: '5%', }}>{this.state.tipeDp}</Text>
            <View
              style={{
                marginTop: '5%',
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
              }}
            />
          </View>
          {/* </View> */}
          <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: '10%', alignItems: 'center' }}>
            <View style={{ flexDirection: 'column', marginLeft: '5%', alignItems: 'center' }}>
              <Text style={{ marginTop: '5%', fontSize: 15, color: 'grey' }}>Total Pembayaran</Text>
              <NumberFormat value={this.state.total} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ marginTop: '5%', color: 'green', fontWeight: 'bold' }}>{value}</Text>} />
            </View>
            <View style={{ alignSelf: 'center', marginLeft: '5%' }}>
              <Button success onPress={() => this.bayar()}>
                <Text>Bayar</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    journeyProp: state.journey,
  }
}

export default connect(mapStateToProps)(Pembayaran);
