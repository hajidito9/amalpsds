import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Text,
  Input,
  Label,
  Button,
  DatePicker,
  View
} from 'native-base';
import {Image,
  Linking, TouchableHighlight,} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from "moment";
import { connect } from 'react-redux';
import { getPegawaiNasabah } from '../publics/redux/actions/nasabah';

class PegawaiNasabah extends Component {

  constructor() {
    super();
    this.state = {
      nama_perusahaan: '',
      telp: '',
      status: '',
      jenis_perusahaan: '',
      tgl_pensiun: '',
      lama_kerja: '',
      alamat: '',
      provinsi: '',
      kota: '',
      kecamatan: '',
      kelurahan: '',
      kode_pos: '',
      link_ktp: '',
      link_sk: '',
      link_kk: '',
      link_slip: '',
      link_rek: ''
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Nasabah Seorang Pegawai',
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
    }
  }

  componentDidMount = async () => {
    // BackHandler.addEventListener('hardwareBackPress', function() {
    //     return true;
    // });
    this.subs = [
      this.props.navigation.addListener('willFocus', async () => {

        let nasabah_id = await AsyncStorage.getItem("nasabah_id")
        await this.props.dispatch(getPegawaiNasabah(nasabah_id))

        this.props.nasabahProp.dataPegawaiNasabah.map((item, i) =>
          // console.warn(item.verifikasi)
          this.setState({
            nama_perusahaan: item.nama_perusahaan,
            telp: item.telp,
            status: item.status,
            jenis_perusahaan: item.jenis_perusahaan,
            tgl_pensiun: moment(item.tgl_pensiun).format('D MMMM YYYY'),
            lama_kerja: item.lama_kerja,
            alamat: item.alamat,
            provinsi: item.provinsi,
            kota: item.kota,
            kecamatan: item.kecamatan,
            kelurahan: item.kelurahan,
            kode_pos: item.kode_pos,
            link_ktp: item.link_ktp,
            link_sk: item.link_sk,
            link_kk: item.link_kk,
            link_slip: item.link_slip,
            link_rek: item.link_rek
          }),
        )
      }),
    ]
  }

  componentWillUnmount() {
    this.subs.forEach(sub => {
      sub.remove()
    })
  }

  render() {
    return (
      <Container>
        <Content>
          <View >
            <Form>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Nama Perusahaan</Label>
                <Input placeholderTextColor="grey" style={{ color: 'grey' }} value={this.state.nama_perusahaan} editable={false}/>
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Nomor Telepon Perusahaan</Label>
                <Input placeholderTextColor="grey" style={{ color: 'grey' }} value={this.state.telp} keyboardType="numeric" editable={false}/>
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Status Pegawai</Label>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginTop: '5%' }}>
                  <Button style={{ backgroundColor: 'green', borderRadius: 10 }} ><Text style={{ color: 'white' }}>{this.state.status}</Text></Button>
                </View>
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Jenis Perusahaan</Label>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginTop: '5%' }}>
                  <Button style={{ backgroundColor: 'green', borderRadius: 10 }} ><Text style={{ color: 'white' }}>{this.state.jenis_perusahaan}</Text></Button>
                </View>
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Tanggal Pensiun</Label>
                <DatePicker
                  defaultDate={new Date(2018, 4, 4)}
                  minimumDate={new Date(1800, 1, 1)}
                  maximumDate={new Date(2200, 12, 31)}
                  locale={"en"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="Pilih Tanggal"
                  textStyle={{ color: "green" }}
                  placeHolderTextStyle={{ color: "#d3d3d3" }}
                  onDateChange={this.ubahPensiun}
                  disabled={true}
                />
                {/* <Input placeholderTextColor="grey" style={{ color: "grey" }} placeholder='Tanggal Lahir' /> */}
                <Text>{this.state.tgl_pensiun}</Text>
                {/* <Text>DB: {this.state.pensiunDb != '' ? this.state.pensiunDb : ''}</Text> */}
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Lama Bekerja (Tahun) </Label>
                <Input placeholderTextColor="grey" style={{ color: "grey" }} keyboardType="numeric" value={this.state.lama_kerja.toString()} editable={false}/>
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Alamat Perusahaan</Label>
                <Input placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.alamat} editable={false}/>
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Provinsi</Label>
                <Input placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.provinsi} editable={false}/>
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Kota</Label>
                <Input placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.kota} editable={false}/>
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Kecamatan</Label>
                <Input placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.kecamatan} editable={false}/>
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Kelurahan</Label>
                <Input placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.kelurahan} editable={false}/>
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Kode Pos</Label>
                <Input placeholderTextColor="grey" style={{ color: "grey" }} keyboardType="numeric" value={this.state.kode_pos} editable={false}/>
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Gambar KTP</Label>
                <TouchableHighlight
                  style={{ alignSelf: 'flex-end', color: 'green', fontWeight: 'bold' }}
                  activeOpacity={0.5}
                  onPress={() => Linking.openURL(this.state.link_ktp)}
                >
                  <Image style={{ width: 26, height: 26, marginRight:'5%' }}
                    source={require('../assets/icons8-download-30.png')}
                  />
                  {/* <Text>Download KTP</Text> */}
                </TouchableHighlight>
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Gambar KK</Label>
                <TouchableHighlight
                  style={{ alignSelf: 'flex-end', color: 'green', fontWeight: 'bold' }}
                  activeOpacity={0.5}
                  onPress={() => Linking.openURL(this.state.link_kk)}
                >
                  <Image style={{ width: 26, height: 26, marginRight:'5%' }}
                    source={require('../assets/icons8-download-30.png')}
                  />
                  {/* <Text>Download KTP</Text> */}
                </TouchableHighlight>
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Gambar SK Pegawai</Label>
                <TouchableHighlight
                  style={{ alignSelf: 'flex-end', color: 'green', fontWeight: 'bold' }}
                  activeOpacity={0.5}
                  onPress={() => Linking.openURL(this.state.link_sk)}
                >
                  <Image style={{ width: 26, height: 26, marginRight:'5%' }}
                    source={require('../assets/icons8-download-30.png')}
                  />
                  {/* <Text>Download KTP</Text> */}
                </TouchableHighlight>
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Gambar Slip Gaji</Label>
                <TouchableHighlight
                  style={{ alignSelf: 'flex-end', color: 'green', fontWeight: 'bold' }}
                  activeOpacity={0.5}
                  onPress={() => Linking.openURL(this.state.link_slip)}
                >
                  <Image style={{ width: 26, height: 26, marginRight:'5%' }}
                    source={require('../assets/icons8-download-30.png')}
                  />
                  {/* <Text>Download KTP</Text> */}
                </TouchableHighlight>
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Gambar Rekomendasi Atasan</Label>
                <TouchableHighlight
                  style={{ alignSelf: 'flex-end', color: 'green', fontWeight: 'bold' }}
                  activeOpacity={0.5}
                  onPress={() => Linking.openURL(this.state.link_rek)}
                >
                  <Image style={{ width: 26, height: 26, marginRight:'5%' }}
                    source={require('../assets/icons8-download-30.png')}
                  />
                  {/* <Text>Download KTP</Text> */}
                </TouchableHighlight>
              </Item>
              <View style={{ marginTop: '5%', marginBottom: '5%' }}>
                <Button style={{ justifyContent: 'center', alignSelf: 'center', width: '90%' }} success onPress={() => this.props.navigation.navigate('DetailPengajuanNasabah')}>
                  <Text>Lanjut</Text>
                </Button>
              </View>
            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nasabahProp: state.nasabah
  }
}

export default connect(mapStateToProps)(PegawaiNasabah);