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
import AsyncStorage from '@react-native-community/async-storage';
import NumericInput from 'react-native-numeric-input';
import moment from "moment";
import { connect } from 'react-redux';
import { getDetailNasabah } from '../publics/redux/actions/nasabah';

class DetailNasabahAdmin extends Component {

  constructor() {
    super();
    this.state = {
      jenisKelamin: '',
      nama: '',
      tempatLahir: '',
      tglLahir: '',
      // tglLahirDb: '',
      email: '',
      noHp: '',
      alamat: '',
      provinsi: '',
      kota: '',
      kecamatan: '',
      kelurahan: '',
      status: '',
      namaIbu: '',
      noKtp: ''
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Biodata Nasabah',
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
        await this.props.dispatch(getDetailNasabah(nasabah_id))

        this.props.nasabahProp.dataDetailNasabahAdmin.map((item, i) =>
          // console.warn(item.verifikasi)
          this.setState({
            jenisKelamin: item.jenis_kelamin,
            nama: item.nama,
            tempatLahir: item.tempat_lahir,
            tglLahir: moment(item.tanggal_lahir).format('D MMMM YYYY'),
            email: item.email,
            noHp: item.no_hp,
            alamat: item.alamat,
            provinsi: item.provinsi,
            kota: item.kota,
            kecamatan: item.kecamatan,
            kelurahan: item.kelurahan,
            status: item.status,
            namaIbu: item.nama_ibu,
            noKtp: item.no_ktp
          })
        )
        await AsyncStorage.setItem("namanasabah", this.state.nama)
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
                <Label style={{ fontWeight: 'bold' }}>No KTP</Label>
                <Input placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.noKtp} keyboardType="numeric" editable={false}/>
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold' }}>Nama</Label>
                <Input placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.nama} editable={false}/>
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold' }}>Tempat Lahir</Label>
                <Input placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.tempatLahir} editable={false}/>
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold' }}>Tanggal Lahir</Label>
                <DatePicker
                  defaultDate={new Date(2018, 4, 4)}
                  minimumDate={new Date(1880, 1, 1)}
                  maximumDate={new Date(2018, 12, 31)}
                  locale={"en"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="Pilih Tanggal"
                  textStyle={{ color: "green" }}
                  placeHolderTextStyle={{ color: "#d3d3d3" }}
                  // value={this.state.tglLahir}
                  disabled={true}
                />
                <Text>{this.state.tglLahir}</Text>
                {/* <Text>DB: {this.state.tglLahirDb != '' ? this.state.tglLahirDb : ''}</Text> */}
              </Item>
              {/* <Item stackedLabel> */}
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
                selectedValue={this.state.jenisKelamin}
                enabled={false}
              >
                <Picker.Item label="Jenis Kelamin" value="" />
                <Picker.Item label="Laki Laki" value="L" />
                <Picker.Item label="Perempuan" value="P" />
              </Picker>
              {/* </Item> */}

              {/* <Item stackedLabel>
                <Label>Status</Label> */}
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
                selectedValue={this.state.status}
                enabled={false}
              >
                <Picker.Item label="Status" value="" />
                <Picker.Item label="Kawin" value="Kawin" />
                <Picker.Item label="Belum Kawin" value="Belum Kawin" />
              </Picker>
              {/* </Item> */}
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold' }}>Nama Ibu</Label>
                <Input placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.namaIbu} editable={false} />
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold' }}>Alamat</Label>
                <Input placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.alamat} editable={false} />
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold' }}>Provinsi</Label>
                <Input placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.provinsi} editable={false} />
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold' }}>Kota</Label>
                <Input placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.kota} editable={false} />
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold' }}>Kecamatan</Label>
                <Input placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.kecamatan} editable={false} />
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold' }}>Kelurahan</Label>
                <Input placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.kelurahan} editable={false} />
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold' }}>Email</Label>
                <Input placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.email} editable={false} />
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold' }}>Nomer HP</Label>
                <Input placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.noHp} keyboardType="numeric" editable={false} />
              </Item>
              <View style={{ marginTop: '5%', marginBottom: '5%' }}>
                <Button style={{ justifyContent: 'center', alignSelf: 'center', width: '90%' }} success onPress={() => this.props.navigation.navigate('DetailKendaraanAdmin')}>
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

export default connect(mapStateToProps)(DetailNasabahAdmin);