import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Container,
  Header,
  Content,
  Button,
  Form,
  Picker,
  Icon,
  Title,
  Text,
  List,
  ListItem,
  Left, Right,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

import Slider from "react-native-slider";
import { getPengajuan } from '../publics/redux/actions/pengajuan';
import { connect } from 'react-redux';

class Pengajuan1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      kategoriKendaraan: '',
      idKendaraan: '',
      tenor: 0,
      idCabang: '',
      merkKendaraan: '',
      tipeKendaraan: '',
      statusKendaraan: '',
      warnaKendaraan: '',
      namaCabang: '',
      lunas: true
    };
  }

  componentDidMount = async () => {
    this.subs = [
      this.props.navigation.addListener('willFocus', async () => {
        let user_id = await AsyncStorage.getItem("userId")
        await this.props.dispatch(getPengajuan(user_id))
        let adaPengajuan = await this.props.pengajuanProp.dataPengajuanNasabah.length
        // console.warn(this.props.pengajuanProp.dataPengajuanNasabah)
        if (adaPengajuan > 0) {
          this.props.navigation.navigate('PengajuanStatus1')
        }
        else {
          // this.props.navigation.popToTop()
          let asKategori = await AsyncStorage.getItem('kategoriKendaraan')
          // console.warn(asKategori)
          let asIdKendaraan = await AsyncStorage.getItem('idKendaraan')
          let asMerkKendaraan = await AsyncStorage.getItem('merkKendaraan')
          let asTipeKendaraan = await AsyncStorage.getItem('tipeKendaraan')
          let asStatusKendaraan = await AsyncStorage.getItem('statusKendaraan')
          let asWarnaKendaraan = await AsyncStorage.getItem('warnaKendaraan')
          let asTenor = await AsyncStorage.getItem('tenor')
          let asIdCabang = await AsyncStorage.getItem('idCabang')
          let asNamaCabang = await AsyncStorage.getItem('namaCabang')
          this.setState({ kategoriKendaraan: asKategori ? asKategori : '' })
          this.setState({ idKendaraan: asIdKendaraan ? asIdKendaraan : '' })
          this.setState({ tenor: asTenor ? asTenor : 0 })
          this.setState({ idCabang: asIdCabang ? asIdCabang : '' })
          this.setState({ merkKendaraan: asMerkKendaraan ? asMerkKendaraan : '' })
          this.setState({ tipeKendaraan: asTipeKendaraan ? asTipeKendaraan : '' })
          this.setState({ statusKendaraan: asStatusKendaraan ? asStatusKendaraan : '' })
          this.setState({ warnaKendaraan: asWarnaKendaraan ? asWarnaKendaraan : '' })
          this.setState({ namaCabang: asNamaCabang ? asNamaCabang : '' })
        }
      }),
    ]
  }

  // shouldComponentUpdate= async () => {
  //   console.warn('update')
  //   this.subs = [
  //     this.props.navigation.addListener('willFocus', async () => {
  //       let asKategori = await AsyncStorage.getItem('kategoriKendaraan')
  //       // console.warn(asKategori)
  //       let asIdKendaraan = await AsyncStorage.getItem('idKendaraan')
  //       let asMerkKendaraan = await AsyncStorage.getItem('merkKendaraan')
  //       let asTipeKendaraan = await AsyncStorage.getItem('tipeKendaraan')
  //       let asStatusKendaraan = await AsyncStorage.getItem('statusKendaraan')
  //       let asWarnaKendaraan = await AsyncStorage.getItem('warnaKendaraan')
  //       let asTenor = await AsyncStorage.getItem('tenor')
  //       let asIdCabang = await AsyncStorage.getItem('idCabang')
  //       this.setState({ kategoriKendaraan: asKategori ? asKategori : '' })
  //       this.setState({ idKendaraan: asIdKendaraan ? asIdKendaraan : '' })
  //       this.setState({ tenor: asTenor ? asTenor : 0 })
  //       this.setState({ idCabang: asIdCabang ? asIdCabang : '' })
  //       this.setState({ MerkKendaraan: asMerkKendaraan ? asMerkKendaraan : '' })
  //       this.setState({ TipeKendaraan: asTipeKendaraan ? asTipeKendaraan : '' })
  //       this.setState({ StatusKendaraan: asStatusKendaraan ? asStatusKendaraan : '' })
  //       this.setState({ WarnaKendaraan: asWarnaKendaraan ? asWarnaKendaraan : '' })
  //     }),
  //   ]
  // }

  componentWillUnmount() {
    this.subs.forEach(sub => {
      sub.remove()
    })
  }

  // componentWillUnmount() {
  //   this.setState({ kategoriKendaraan: '' })
  //   this.setState({ idKendaraan: '' })
  //   this.setState({ tenor: 0 })
  //   this.setState({ idCabang: '' })
  // }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Pengajuan',
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
  render() {
    // let asKategori = AsyncStorage.getItem('kategoriKendaraan')
    // console.warn(asKategori)

    // let category = navigation.getParam('category', 'category');
    return (
      // <View>
      <Container>
        <Content>
          <View style={{ marginLeft: '5%', marginTop: '5%' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'green' }}>
              Persyaratan
            </Text>
          </View>
          <View style={{ marginLeft: '5%', marginTop: '2%' }}>
            <Text>- KTP (Suami/Istri)</Text>
            <Text style={{ marginTop: '2%' }}>- Kartu Keluarga</Text>
            <Text style={{ marginTop: '2%' }}>
              - SK pengangkatan sebagai pegawai/karyawan
            </Text>
            <Text style={{ marginTop: '2%' }}>- Slip gaji 2 bulan terakhir</Text>
            <Text style={{ marginTop: '2%' }}>- Rekomendasi atasan langsung</Text>
          </View>
          <List style={{ marginTop: '5%', marginBottom: '3%' }}>
            <ListItem >
              <Left style={{ flexDirection: 'column' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('PengajuanKategoriKendaraan')}>
                <Text style={{ color: 'green', fontWeight: 'bold', alignSelf: 'flex-start' }}>Kategori Kendaraan</Text>
                <Text style={{ color: 'grey', fontSize: 12, alignSelf: 'flex-start' }}> {this.state.kategoriKendaraan == '' ? 'Pilihan Jenis Kendaraan' : this.state.kategoriKendaraan}</Text>
                </TouchableOpacity>
              </Left>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('PengajuanKategoriKendaraan')}>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </TouchableOpacity>
            </ListItem>
            <ListItem>
              <Left style={{ flexDirection: 'column' }}>
              <TouchableOpacity onPress={() => this.state.kategoriKendaraan == '' ? alert('Pilih Kategori Kendaraan Terlebih dahulu') : this.props.navigation.navigate('PengajuanMerkKendaraan')}>
                <Text style={{ color: 'green', fontWeight: 'bold', alignSelf: 'flex-start' }}>Pilih Kendaraan</Text>
                <Text style={{ color: 'grey', fontSize: 12, alignSelf: 'flex-start' }}>{this.state.idKendaraan == '' ? 'Pilihan Merk dan Nama Kendaraan Bermotor' : this.state.merkKendaraan + ' ' + this.state.tipeKendaraan + ' ' + this.state.statusKendaraan + ' Warna ' + this.state.warnaKendaraan}</Text>
                </TouchableOpacity>
              </Left>
              <TouchableOpacity onPress={() => this.state.kategoriKendaraan == '' ? alert('Pilih Kategori Kendaraan Terlebih dahulu') : this.props.navigation.navigate('PengajuanMerkKendaraan')}>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </TouchableOpacity>
            </ListItem>
            <ListItem>
              <Left style={{ flexDirection: 'column' }}>
              <TouchableOpacity onPress={() => this.state.idKendaraan == '' ? alert('Pilih Merk dan Nama Kendaraan Terlebih dahulu') : this.props.navigation.navigate('PengajuanTenor')}>
                <Text style={{ color: 'green', fontWeight: 'bold', alignSelf: 'flex-start' }}>Tenor</Text>
                <Text style={{ color: 'grey', fontSize: 12, alignSelf: 'flex-start' }}>{this.state.tenor == 0 ? 'Jangka Waktu Peminjaman' : this.state.tenor + " Bulan"}</Text>
                </TouchableOpacity>
              </Left>
              <TouchableOpacity onPress={() => this.state.idKendaraan == '' ? alert('Pilih Merk dan Nama Kendaraan Terlebih dahulu') : this.props.navigation.navigate('PengajuanTenor')}>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </TouchableOpacity>
            </ListItem>
            <ListItem>
              <Left style={{ flexDirection: 'column' }}>
              <TouchableOpacity onPress={() => this.state.tenor == 0 ? alert('Pilih Tenor Terlebih Dahulu') : this.props.navigation.navigate('PengajuanCabang')}>
                <Text style={{ color: 'green', fontWeight: 'bold', alignSelf: 'flex-start' }}>Cabang Pegadaian (Akad)</Text>
                <Text style={{ color: 'grey', fontSize: 12, alignSelf: 'flex-start' }}>{this.state.idCabang == '' ? 'Pilihan Cabang Untuk Melaksanakan Akad' : this.state.namaCabang}</Text>
                </TouchableOpacity>
              </Left>
              <TouchableOpacity onPress={() => this.state.tenor == 0 ? alert('Pilih Tenor Terlebih Dahulu') : this.props.navigation.navigate('PengajuanCabang')}>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </TouchableOpacity>
            </ListItem>
          </List>
          <Button style={{ justifyContent: 'center', alignSelf: 'center', width: '90%' }} success onPress={() => this.props.navigation.navigate('PengajuanUangMuka')}>
            <Text >Lanjut</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: "10%",
    marginRight: "10%",
    alignItems: "stretch",
    justifyContent: "center"
  }
});


const mapStateToProps = (state) => {
  return {
    pengajuanProp: state.pengajuan,
  }
}

export default connect(mapStateToProps)(Pengajuan1);
