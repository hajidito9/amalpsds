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

export default class PengajuanNasabah extends Component {

  constructor() {
    super();
    this.state = {
      jenisKelamin: '',
      nama: '',
      tempatLahir: '',
      tglLahir: new Date(),
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
      headerTitle: 'Data Nasabah',
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

  ubahNama = nama => this.setState({ nama });
  ubahKtp = noKtp => this.setState({ noKtp });
  ubahNoHp = noHp => this.setState({ noHp });
  ubahEmail = email => this.setState({ email });
  ubahJenisKelamin(value) {
    this.setState({
      jenisKelamin: value
    });
  }
  ubahTempatLahir = tempatLahir => this.setState({ tempatLahir });
  ubahTglLahir = tglLahir => this.setState({ tglLahir });
  ubahAlamat = alamat => this.setState({ alamat });
  ubahProvinsi = provinsi => this.setState({ provinsi });
  ubahKota = kota => this.setState({ kota });
  ubahKecamatan = kecamatan => this.setState({ kecamatan });
  ubahKelurahan = kelurahan => this.setState({ kelurahan });
  ubahStatus(value) {
    this.setState({
      status: value
    });
  }
  ubahNamaIbu = namaIbu => this.setState({ namaIbu });

  inputDataNasabah = async () => {
    await AsyncStorage.setItem("nasabahNama", this.state.nama)
    await AsyncStorage.setItem("nasabahKtp", this.state.noKtp)
    await AsyncStorage.setItem("nasabahHp", this.state.noHp)
    await AsyncStorage.setItem("nasabahEmail", this.state.email)
    await AsyncStorage.setItem("nasabahJk", this.state.jenisKelamin)
    await AsyncStorage.setItem("nasabahTl", this.state.tempatLahir)
    await AsyncStorage.setItem("nasabahTglLhrDb", JSON.stringify(moment(this.state.tglLahir).add(1, 'day')).substr(1, 10))
    await AsyncStorage.setItem("nasabahTglLhr", this.state.tglLahir.toString().substr(0, 15))
    // await AsyncStorage.setItem("nasabahTglLhrDb", this.state.tglLahir.toString().substr(0, 15))
    // await AsyncStorage.setItem("nasabahTglLhr", JSON.stringify(this.state.tglLahir))
    await AsyncStorage.setItem("nasabahAlamat", this.state.alamat)
    await AsyncStorage.setItem("nasabahProvinsi", this.state.provinsi)
    await AsyncStorage.setItem("nasabahKota", this.state.kota)
    await AsyncStorage.setItem("nasabahKecamatan", this.state.kecamatan)
    await AsyncStorage.setItem("nasabahKelurahan", this.state.kelurahan)
    await AsyncStorage.setItem("nasabahStatus", this.state.status)
    await AsyncStorage.setItem("nasabahNmIbu", this.state.namaIbu)
    this.props.navigation.navigate('PengajuanTipePekerjaan')
  }

  componentDidMount = async () => {
    // console.warn(await AsyncStorage.getItem("linkJaminan"))
    this.subs = [
      this.props.navigation.addListener('willFocus', async () => {
        let asNasabahNama = await AsyncStorage.getItem('nasabahNama')
        let asNasabahKtp = await AsyncStorage.getItem('nasabahKtp')
        let asNasabahHp = await AsyncStorage.getItem('nasabahHp')
        let asNasabahEmail = await AsyncStorage.getItem('nasabahEmail')
        let asNasabahJk = await AsyncStorage.getItem('nasabahJk')
        let asNasabahTl = await AsyncStorage.getItem('nasabahTl')
        let asNasabahTglLahir = await AsyncStorage.getItem('nasabahTglLhr')
        // let asNasabahTglLahirDb = await AsyncStorage.getItem('nasabahTglLhrDb')
        let asNasabahAlamat = await AsyncStorage.getItem('nasabahAlamat')
        let asNasabahProvinsi = await AsyncStorage.getItem('nasabahProvinsi')
        let asNasabahKota = await AsyncStorage.getItem('nasabahKota')
        let asNasabahKecamatan = await AsyncStorage.getItem('nasabahKecamatan')
        let asNasabahKelurahan = await AsyncStorage.getItem('nasabahKelurahan')
        let asNasabahStatus = await AsyncStorage.getItem('nasabahStatus')
        let asNasabahNmIbu = await AsyncStorage.getItem('nasabahNmIbu')
        this.setState({ nama: asNasabahNama ? asNasabahNama : '' })
        this.setState({ noKtp: asNasabahKtp ? asNasabahKtp : '' })
        this.setState({ noHp: asNasabahHp ? asNasabahHp : '' })
        this.setState({ email: asNasabahEmail ? asNasabahEmail : '' })
        this.setState({ jenisKelamin: asNasabahJk ? asNasabahJk : '' })
        this.setState({ tempatLahir: asNasabahTl ? asNasabahTl : '' })
        this.setState({ tglLahir: asNasabahTglLahir ? asNasabahTglLahir : '' })
        this.setState({ alamat: asNasabahAlamat ? asNasabahAlamat : '' })
        this.setState({ provinsi: asNasabahProvinsi ? asNasabahProvinsi : '' })
        this.setState({ kota: asNasabahKota ? asNasabahKota : '' })
        this.setState({ kecamatan: asNasabahKecamatan ? asNasabahKecamatan : '' })
        this.setState({ kelurahan: asNasabahKelurahan ? asNasabahKelurahan : '' })
        this.setState({ status: asNasabahStatus ? asNasabahStatus : '' })
        this.setState({ namaIbu: asNasabahNmIbu ? asNasabahNmIbu : '' })
        // this.setState({ tglLahirDb: asNasabahTglLahirDb ? asNasabahTglLahirDb : '' })
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
                <Label style={{fontWeight:'bold'}}>No KTP</Label>
                <Input onChangeText={this.ubahKtp} placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.noKtp} keyboardType="numeric" />
              </Item>
              <Item stackedLabel>
                <Label style={{fontWeight:'bold'}}>Nama</Label>
                <Input onChangeText={this.ubahNama} placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.nama}/>
              </Item>
              <Item stackedLabel>
                <Label style={{fontWeight:'bold'}}>Tempat Lahir</Label>
                <Input onChangeText={this.ubahTempatLahir} placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.tempatLahir}/>
              </Item>
              <Item stackedLabel>
                <Label style={{fontWeight:'bold'}}>Tanggal Lahir</Label>
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
                  onDateChange={this.ubahTglLahir}
                  // value={this.state.tglLahir}
                  disabled={false}
                />
                <Text>{this.state.tglLahir != '' ? this.state.tglLahir.toString().substr(3,12) : ''}</Text>
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
                onValueChange={this.ubahJenisKelamin.bind(this)}
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
                onValueChange={this.ubahStatus.bind(this)}
              >
                <Picker.Item label="Status" value="" />
                <Picker.Item label="Kawin" value="Kawin" />
                <Picker.Item label="Belum Kawin" value="Belum Kawin" />
              </Picker>
              {/* </Item> */}
              <Item stackedLabel>
                <Label style={{fontWeight:'bold'}}>Nama Ibu</Label>
                <Input onChangeText={this.ubahNamaIbu} placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.namaIbu}/>
              </Item>
              <Item stackedLabel>
                <Label style={{fontWeight:'bold'}}>Alamat</Label>
                <Input onChangeText={this.ubahAlamat} placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.alamat}/>
              </Item>
              <Item stackedLabel>
                <Label style={{fontWeight:'bold'}}>Provinsi</Label>
                <Input onChangeText={this.ubahProvinsi} placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.provinsi}/>
              </Item>
              <Item stackedLabel>
                <Label style={{fontWeight:'bold'}}>Kota</Label>
                <Input onChangeText={this.ubahKota} placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.kota}/>
              </Item>
              <Item stackedLabel>
                <Label style={{fontWeight:'bold'}}>Kecamatan</Label>
                <Input onChangeText={this.ubahKecamatan} placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.kecamatan}/>
              </Item>
              <Item stackedLabel>
                <Label style={{fontWeight:'bold'}}>Kelurahan</Label>
                <Input onChangeText={this.ubahKelurahan} placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.kelurahan}/>
              </Item>
              <Item stackedLabel>
                <Label style={{fontWeight:'bold'}}>Email</Label>
                <Input onChangeText={this.ubahEmail} placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.email}/>
              </Item>
              <Item stackedLabel>
                <Label style={{fontWeight:'bold'}}>Nomer HP</Label>
                <Input onChangeText={this.ubahNoHp} placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.noHp} keyboardType="numeric"/>
              </Item>
              <View style={{ marginTop: '5%', marginBottom: '5%' }}>
                <Button style={{ justifyContent: 'center', alignSelf: 'center', width: '90%' }} success onPress={() => this.inputDataNasabah()}>
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
