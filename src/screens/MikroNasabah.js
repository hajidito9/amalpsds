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
  View,
  Picker,
  Icon
} from 'native-base';
import {Image,
  Linking, TouchableHighlight,} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { getMikroNasabah } from '../publics/redux/actions/nasabah';

class MikroNasabah extends Component {

  constructor() {
    super();
    this.state = {
      backgroundDagang: true,
      backgroundIndustri: false,
      backgroundJasa: false,
      bidang_usaha: '',
      nama: '',
      lama_usaha: 0,
      status_usaha: '',
      jarak: 0,
      jenis: '',
      alamat: '',
      provinsi: '',
      kota: '',
      kecamatan: '',
      kelurahan: '',
      kode_pos: '',
      link_ktp: '',
      link_kk: '',
      link_depan: '',
      link_dalam: ''
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Nasabah Pengusaha Mikro',
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
        await this.props.dispatch(getMikroNasabah(nasabah_id))

        this.props.nasabahProp.dataMikroNasabah.map((item, i) =>
          // console.warn(item.verifikasi)
          this.setState({
            bidang_usaha: item.bidang_usaha,
            nama: item.nama,
            lama_usaha: item.lama_usaha,
            status_usaha: item.status_usaha,
            jarak: item.jarak,
            jenis: item.jenis,
            alamat: item.alamat,
            provinsi: item.provinsi,
            kota: item.kota,
            kecamatan: item.kecamatan,
            kelurahan: item.kelurahan,
            kode_pos: item.kode_pos,
            link_ktp: item.link_ktp,
            link_kk: item.link_kk,
            link_depan: item.link_depan,
            link_dalam: item.link_dalam
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
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Nama Usaha</Label>
                <Input placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.nama} editable={false} />
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Bidang Usaha</Label>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginTop: '5%' }}>
                  <Button style={{ backgroundColor: 'green', borderRadius: 10 }} ><Text style={{ color: 'white' }}>{this.state.bidang_usaha}</Text></Button>
                </View>
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Lama Usaha (Tahun)</Label>
                <Input placeholderTextColor="grey" style={{ color: "grey" }} keyboardType="numeric" value={this.state.lama_usaha.toString()} editable={false} />
              </Item>
              <Picker
                mode="dropdown"
                placeholder="Jenis"
                iosIcon={<Icon name="arrow-down" />}
                textStyle={{ color: "#5cb85c" }}
                itemStyle={{
                  backgroundColor: "#d3d3d3",
                  marginLeft: 0,
                  paddingLeft: 10
                }}
                itemTextStyle={{ color: '#788ad2' }}
                style={{ width: undefined }}
                selectedValue={this.state.status_usaha}
                enabled={false}
              >
                <Picker.Item label="Status Tempat Usaha" value="" />
                <Picker.Item label="Milik Sendiri" value="Milik Sendiri" />
                <Picker.Item label="Milik Keluarga" value="Milik Keluarga" />
                <Picker.Item label="Sewa/Kontrak" value="Sewa/Kontrak" />
              </Picker>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Jarak Tempat Usaha (KM)</Label>
                <Input placeholderTextColor="grey" style={{ color: "grey" }} keyboardType="numeric" value={this.state.jarak.toString()} editable={false} />
              </Item>

              <Picker
                mode="dropdown"
                placeholder="Jenis"
                iosIcon={<Icon name="arrow-down" />}
                textStyle={{ color: "#5cb85c" }}
                itemStyle={{
                  backgroundColor: "#d3d3d3",
                  marginLeft: 0,
                  paddingLeft: 10
                }}
                itemTextStyle={{ color: '#788ad2' }}
                style={{ width: undefined }}
                selectedValue={this.state.jenis}
                enabled={false}
              >
                <Picker.Item label="Jenis Tempat Usaha" value="" />
                <Picker.Item label="Toko/Ruko" value="Toko/Ruko" />
                <Picker.Item label="Kios/Los/Lapak/Lahan" value="Kios/Los/Lapak/lahan" />
                <Picker.Item label="Warung Tenda" value="Warung Tenda" />
                <Picker.Item label="Gerobak Berpindah" value="Gerobak Berpindah" />
              </Picker>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Alamat Tempat Usaha</Label>
                <Input placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.alamat} editable={false} />
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Provinsi</Label>
                <Input placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.provinsi} editable={false} />
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Kota</Label>
                <Input placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.kota} editable={false} />
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Kecamatan</Label>
                <Input placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.kecamatan} editable={false} />
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Kelurahan</Label>
                <Input placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.kelurahan} editable={false} />
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Kode Pos</Label>
                <Input placeholderTextColor="grey" style={{ color: "grey" }} keyboardType="numeric" value={this.state.kode_pos} editable={false} />
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
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Gambar Depan Tempat Usaha</Label>
                <TouchableHighlight
                  style={{ alignSelf: 'flex-end', color: 'green', fontWeight: 'bold' }}
                  activeOpacity={0.5}
                  onPress={() => Linking.openURL(this.state.link_depan)}
                >
                  <Image style={{ width: 26, height: 26, marginRight:'5%' }}
                    source={require('../assets/icons8-download-30.png')}
                  />
                  {/* <Text>Download KTP</Text> */}
                </TouchableHighlight>
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Gambar Dalam Tempat Usaha</Label>
                <TouchableHighlight
                  style={{ alignSelf: 'flex-end', color: 'green', fontWeight: 'bold' }}
                  activeOpacity={0.5}
                  onPress={() => Linking.openURL(this.state.link_dalam)}
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

export default connect(mapStateToProps)(MikroNasabah);