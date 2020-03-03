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

export default class PengajuanMikro extends Component {

  constructor() {
    super();
    this.state = {
      backgroundDagang: true,
      backgroundIndustri: false,
      backgroundJasa: false,
      bidang:'',
      nama: '',
      telp: '',
      lamaUsaha: 0,
      status: '',
      jarak: 0,
      jenis: '',
      alamat: '',
      provinsi: '',
      kota: '',
      kecamatan: '',
      kelurahan: '',
      kodePos: ''
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Data Mikro',
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

  ubahJenisDagang = () => {
    this.setState({
      backgroundDagang: true,
      backgroundIndustri: false,
      backgroundJasa: false,
      bidang: 'Dagang'
    })
  }

  ubahJenisIndustri = () => {
    this.setState({
      backgroundDagang: false,
      backgroundIndustri: true,
      backgroundJasa: false,
      bidang: 'Industri'
    })
  }

  ubahJenisJasa = () => {
    this.setState({
      backgroundDagang: false,
      backgroundIndustri: false,
      backgroundJasa: true,
      bidang: 'Jasa'
    })
  }

  ubahNama = nama => this.setState({ nama });
  ubahTelp = telp => this.setState({ telp });
  ubahLamaUsaha = lamaUsaha => this.setState({ lamaUsaha });
  ubahStatus = status => this.setState({ status });
  ubahJarak = jarak => this.setState({ jarak });
  ubahJenis = jenis => this.setState({ jenis });
  ubahAlamat = alamat => this.setState({ alamat });
  ubahProvinsi = provinsi => this.setState({ provinsi });
  ubahKota = kota => this.setState({ kota });
  ubahKecamatan = kecamatan => this.setState({ kecamatan });
  ubahKelurahan = kelurahan => this.setState({ kelurahan });
  ubahKodePos = kodePos => this.setState({ kodePos });

  inputDataMikro = async () => {
    await AsyncStorage.setItem("mikroNama", this.state.nama)
    await AsyncStorage.setItem("mikroTelp", this.state.telp)
    await AsyncStorage.setItem("mikroLamaUsaha", this.state.lamaUsaha)
    await AsyncStorage.setItem("mikroStatus", this.state.status)
    await AsyncStorage.setItem("mikroJarak", this.state.jarak)
    await AsyncStorage.setItem("mikroJenis", this.state.jenis)
    await AsyncStorage.setItem("mikroAlamat", this.state.alamat)
    await AsyncStorage.setItem("mikroProvinsi", this.state.provinsi)
    await AsyncStorage.setItem("mikroKota", this.state.kota)
    await AsyncStorage.setItem("mikroKecamatan", this.state.kecamatan)
    await AsyncStorage.setItem("mikroKelurahan", this.state.kelurahan)
    await AsyncStorage.setItem("mikroKodePos", this.state.kodePos)
    await AsyncStorage.setItem("mikroBidang", this.state.bidang)
    this.props.navigation.navigate('PengajuanFileMikro')
  }

  componentDidMount = async () => {
    this.subs = [
      this.props.navigation.addListener('willFocus', async () => {
        let asMikroNama = await AsyncStorage.getItem('mikroNama')
        let asMikroTelp = await AsyncStorage.getItem('mikroTelp')
        let asMikroStatus = await AsyncStorage.getItem('mikroStatus')
        let asMikroJenis = await AsyncStorage.getItem('mikroJenis')
        let asMikroLamaUsaha = await AsyncStorage.getItem('mikroLamaUsaha')
        let asMikroBidang = await AsyncStorage.getItem('mikroBidang')
        let asMikroJarak = await AsyncStorage.getItem('mikroJarak')
        let asMikroAlamat = await AsyncStorage.getItem('mikroAlamat')
        // let asMikroTglLahirDb = await AsyncStorage.getItem('MikroTglLhrDb')
        let asMikroProvinsi = await AsyncStorage.getItem('mikroProvinsi')
        let asMikroKota = await AsyncStorage.getItem('mikroKota')
        let asMikroKecamatan = await AsyncStorage.getItem('mikroKecamatan')
        let asMikroKelurahan = await AsyncStorage.getItem('mikroKelurahan')
        let asMikroKodePos = await AsyncStorage.getItem('mikroKodePos')
        await this.setState({ nama: asMikroNama ? asMikroNama : '' })
        await this.setState({ telp: asMikroTelp ? asMikroTelp : '' })
        await this.setState({ status: asMikroStatus ? asMikroStatus : '' })
        await this.setState({ jenis: asMikroJenis ? asMikroJenis : '' })
        await this.setState({ lamaUsaha: asMikroLamaUsaha ? asMikroLamaUsaha : '' })
        await this.setState({ bidang: asMikroBidang ? asMikroBidang : '' })
        await this.setState({ jarak: asMikroJarak ? asMikroJarak : '' })
        await this.setState({ alamat: asMikroAlamat ? asMikroAlamat : '' })
        await this.setState({ provinsi: asMikroProvinsi ? asMikroProvinsi : '' })
        await this.setState({ kota: asMikroKota ? asMikroKota : '' })
        await this.setState({ kecamatan: asMikroKecamatan ? asMikroKecamatan : '' })
        await this.setState({ kelurahan: asMikroKelurahan ? asMikroKelurahan : '' })
        await this.setState({ kodePos: asMikroKodePos ? asMikroKodePos : '' })
        // this.setState({ tglLahirDb: asNasabahTglLahirDb ? asNasabahTglLahirDb : '' })
        if (this.state.bidang == 'Dagang') {
          this.setState({
            backgroundDagang: true,
            backgroundIndustri: false,
            backgroundJasa: false,
          })
        }
        else if (this.state.bidang == 'Industri') {
          this.setState({
            backgroundDagang: false,
            backgroundIndustri: true,
            backgroundJasa: false,
          })
        }
        else if (this.state.bidang == 'Jasa') {
          this.setState({
            backgroundDagang: false,
            backgroundIndustri: false,
            backgroundJasa: true,
          })
        }
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
                <Input onChangeText={this.ubahNama} placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.nama} />
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Bidang Usaha</Label>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginTop: '5%' }}>
                  <Button style={{ backgroundColor: this.state.backgroundDagang ? 'green' : 'white', borderRadius: 10 }} onPress={() => this.ubahJenisDagang()} ><Text style={{ color: this.state.backgroundDagang ? 'white' : 'grey' }}>Dagang</Text></Button>
                  <Button style={{ backgroundColor: this.state.backgroundIndustri ? 'green' : 'white', borderRadius: 10 }} onPress={() => this.ubahJenisIndustri()}><Text style={{ color: this.state.backgroundIndustri ? 'white' : 'grey' }}>Industri</Text></Button>
                  <Button style={{ backgroundColor: this.state.backgroundJasa ? 'green' : 'white', borderRadius: 10 }} onPress={() => this.ubahJenisJasa()}><Text style={{ color: this.state.backgroundJasa ? 'white' : 'grey' }}>Jasa</Text></Button>
                </View>
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Lama Usaha (Tahun)</Label>
                <Input onChangeText={this.ubahLamaUsaha} placeholderTextColor="grey" style={{ color: "grey" }} keyboardType="numeric" value={this.state.lamaUsaha} />
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
                selectedValue={this.state.status}
                onValueChange={this.ubahStatus.bind(this)}
              >
                <Picker.Item label="Status Tempat Usaha" value="" />
                <Picker.Item label="Milik Sendiri" value="Milik Sendiri" />
                <Picker.Item label="Milik Keluarga" value="Milik Keluarga" />
                <Picker.Item label="Sewa/Kontrak" value="Sewa/Kontrak" />
              </Picker>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Jarak Tempat Usaha (KM)</Label>
                <Input onChangeText={this.ubahJarak} placeholderTextColor="grey" style={{ color: "grey" }} keyboardType="numeric" value={this.state.jarak} />
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
                onValueChange={this.ubahJenis.bind(this)}
              >
                <Picker.Item label="Jenis Tempat Usaha" value="" />
                <Picker.Item label="Toko/Ruko" value="Toko/Ruko" />
                <Picker.Item label="Kios/Los/Lapak/Lahan" value="Kios/Los/Lapak/lahan" />
                <Picker.Item label="Warung Tenda" value="Warung Tenda" />
                <Picker.Item label="Gerobak Berpindah" value="Gerobak Berpindah" />
              </Picker>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Alamat Tempat Usaha</Label>
                <Input onChangeText={this.ubahAlamat} placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.alamat}/>
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Provinsi</Label>
                <Input onChangeText={this.ubahProvinsi} placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.provinsi} />
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Kota</Label>
                <Input onChangeText={this.ubahKota} placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.kota}/>
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Kecamatan</Label>
                <Input onChangeText={this.ubahKecamatan} placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.kecamatan}/>
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Kelurahan</Label>
                <Input onChangeText={this.ubahKelurahan} placeholderTextColor="grey" style={{ color: "grey" }} value={this.state.kelurahan}/>
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Kode Pos</Label>
                <Input onChangeText={this.ubahKodePos} placeholderTextColor="grey" style={{ color: "grey" }} keyboardType="numeric" value={this.state.kodePos}/>
              </Item>
              <View style={{ marginTop: '5%', marginBottom: '5%' }}>
                <Button style={{ justifyContent: 'center', alignSelf: 'center', width: '90%' }} success onPress={() => this.inputDataMikro()}>
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
