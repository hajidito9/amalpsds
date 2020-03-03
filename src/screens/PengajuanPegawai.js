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
import AsyncStorage from '@react-native-community/async-storage';

export default class PengajuanPegawai extends Component {

  constructor() {
    super();
    this.state = {
      backgroundTetap: true,
      backgroundKontrak: false,
      backgroundBumn: true,
      backgroundBumd: false,
      backgroundSwasta: false,
      nama: '',
      telp: '',
      status: '',
      jenis: '',
      pensiun: '',
      pensiunDb: '',
      lamaKerja: 0,
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
      headerTitle: 'Data Pegawai',
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

  ubahStatusTetap = () => {
    this.setState({
      backgroundTetap: true,
      backgroundKontrak: false,
      status: 'Tetap'
    })
  }

  ubahStatusKontrak = () => {
    this.setState({
      backgroundTetap: false,
      backgroundKontrak: true,
      status: 'Kontrak'
    })
  }

  ubahJenisBumn = () => {
    this.setState({
      backgroundBumn: true,
      backgroundBumd: false,
      backgroundSwasta: false,
      jenis: 'BUMN'
    })
  }

  ubahJenisBumd = () => {
    this.setState({
      backgroundBumn: false,
      backgroundBumd: true,
      backgroundSwasta: false,
      jenis: 'BUMD'
    })
  }

  ubahJenisSwasta = () => {
    this.setState({
      backgroundBumn: false,
      backgroundBumd: false,
      backgroundSwasta: true,
      jenis: 'Swasta'
    })
  }

  ubahNama = nama => this.setState({ nama });
  ubahTelp = telp => this.setState({ telp });
  ubahPensiun = pensiun => this.setState({ pensiun });
  ubahLamaKerja = lamaKerja => this.setState({ lamaKerja });
  ubahAlamat = alamat => this.setState({ alamat });
  ubahProvinsi = provinsi => this.setState({ provinsi });
  ubahKota = kota => this.setState({ kota });
  ubahKecamatan = kecamatan => this.setState({ kecamatan });
  ubahKelurahan = kelurahan => this.setState({ kelurahan });
  ubahKodePos = kodePos => this.setState({ kodePos });

  inputDataPegawai = async () => {
    await AsyncStorage.setItem("pegawaiNama", this.state.nama)
    await AsyncStorage.setItem("pegawaiTelp", this.state.telp)
    await AsyncStorage.setItem("pegawaiStatus", this.state.status)
    await AsyncStorage.setItem("pegawaiJenis", this.state.jenis)
    await AsyncStorage.setItem("pegawaiPensiunDb", JSON.stringify(this.state.pensiun).substr(1, 10))
    await AsyncStorage.setItem("pegawaiPensiun", this.state.pensiun.toString().substr(0, 15))
    await AsyncStorage.setItem("pegawaiLamaKerja", this.state.lamaKerja)
    await AsyncStorage.setItem("pegawaiAlamat", this.state.alamat)
    await AsyncStorage.setItem("pegawaiProvinsi", this.state.provinsi)
    await AsyncStorage.setItem("pegawaiKota", this.state.kota)
    await AsyncStorage.setItem("pegawaiKecamatan", this.state.kecamatan)
    await AsyncStorage.setItem("pegawaiKelurahan", this.state.kelurahan)
    await AsyncStorage.setItem("pegawaiKodePos", this.state.kodePos)
    this.props.navigation.navigate('PengajuanFilePegawai')
  }

  componentDidMount = async () => {
    this.subs = [
      this.props.navigation.addListener('willFocus', async () => {
        let asPegawaiNama = await AsyncStorage.getItem('pegawaiNama')
        let asPegawaiTelp = await AsyncStorage.getItem('pegawaiTelp')
        let asPegawaiStatus = await AsyncStorage.getItem('pegawaiStatus')
        let asPegawaiJenis = await AsyncStorage.getItem('pegawaiJenis')
        let asPegawaiPensiun = await AsyncStorage.getItem('pegawaiPensiun')
        let asPegawaiPensiunDb = await AsyncStorage.getItem('pegawaiPensiunDb')
        let asPegawaiLamaKerja = await AsyncStorage.getItem('pegawaiLamaKerja')
        let asPegawaiAlamat = await AsyncStorage.getItem('pegawaiAlamat')
        // let asPegawaiTglLahirDb = await AsyncStorage.getItem('PegawaiTglLhrDb')
        let asPegawaiProvinsi = await AsyncStorage.getItem('pegawaiProvinsi')
        let asPegawaiKota = await AsyncStorage.getItem('pegawaiKota')
        let asPegawaiKecamatan = await AsyncStorage.getItem('pegawaiKecamatan')
        let asPegawaiKelurahan = await AsyncStorage.getItem('pegawaiKelurahan')
        let asPegawaiKodePos = await AsyncStorage.getItem('pegawaiKodePos')
        await this.setState({ nama: asPegawaiNama ? asPegawaiNama : '' })
        await this.setState({ telp: asPegawaiTelp ? asPegawaiTelp : '' })
        await this.setState({ status: asPegawaiStatus ? asPegawaiStatus : '' })
        await this.setState({ jenis: asPegawaiJenis ? asPegawaiJenis : '' })
        await this.setState({ pensiun: asPegawaiPensiun ? asPegawaiPensiun : '' })
        await this.setState({ pensiunDb: asPegawaiPensiunDb ? asPegawaiPensiunDb : '' })
        await this.setState({ lamaKerja: asPegawaiLamaKerja ? asPegawaiLamaKerja : '' })
        await this.setState({ alamat: asPegawaiAlamat ? asPegawaiAlamat : '' })
        await this.setState({ provinsi: asPegawaiProvinsi ? asPegawaiProvinsi : '' })
        await this.setState({ kota: asPegawaiKota ? asPegawaiKota : '' })
        await this.setState({ kecamatan: asPegawaiKecamatan ? asPegawaiKecamatan : '' })
        await this.setState({ kelurahan: asPegawaiKelurahan ? asPegawaiKelurahan : '' })
        await this.setState({ kodePos: asPegawaiKodePos ? asPegawaiKodePos : '' })
        // this.setState({ tglLahirDb: asNasabahTglLahirDb ? asNasabahTglLahirDb : '' })
        if (this.state.status == 'Tetap') {
          this.setState({
            backgroundTetap: true,
            backgroundKontrak: false,
          })
        }
        else if (this.state.status == 'Kontrak') {
          this.setState({
            backgroundTetap: false,
            backgroundKontrak: true,
          })
        }

        if (this.state.jenis == 'BUMN') {
          this.setState({
            backgroundBumn: true,
            backgroundBumd: false,
            backgroundSwasta: false,
          })
        }
        else if (this.state.jenis == 'BUMD') {
          this.setState({
            backgroundBumn: false,
            backgroundBumd: true,
            backgroundSwasta: false,
          })
        }
        else if (this.state.jenis == 'Swasta') {
          this.setState({
            backgroundBumn: false,
            backgroundBumd: false,
            backgroundSwasta: true,
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
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Nama Perusahaan</Label>
                <Input onChangeText={this.ubahNama} placeholderTextColor="grey" style={{ color:'grey' }} value={this.state.nama} />
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Nomor Telepon Perusahaan</Label>
                <Input onChangeText={this.ubahTelp} placeholderTextColor="grey" style={{ color:'grey' }} value={this.state.telp} keyboardType="numeric" />
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Status Pegawai</Label>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginTop: '5%' }}>
                  <Button style={{ backgroundColor: this.state.backgroundTetap ? 'green' : 'white', borderRadius: 10 }} onPress={() => this.ubahStatusTetap()} ><Text style={{ color: this.state.backgroundTetap ? 'white' : 'grey' }}>Tetap</Text></Button>
                  <Button style={{ backgroundColor: this.state.backgroundKontrak ? 'green' : 'white', borderRadius: 10 }} onPress={() => this.ubahStatusKontrak()}><Text style={{ color: this.state.backgroundKontrak ? 'white' : 'grey' }}>Kontrak</Text></Button>
                </View>
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Jenis Perusahaan</Label>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginTop: '5%' }}>
                  <Button style={{ backgroundColor: this.state.backgroundBumn ? 'green' : 'white', borderRadius: 10 }} onPress={() => this.ubahJenisBumn()} ><Text style={{ color: this.state.backgroundBumn ? 'white' : 'grey' }}>BUMN</Text></Button>
                  <Button style={{ backgroundColor: this.state.backgroundBumd ? 'green' : 'white', borderRadius: 10 }} onPress={() => this.ubahJenisBumd()}><Text style={{ color: this.state.backgroundBumd ? 'white' : 'grey' }}>BUMD</Text></Button>
                  <Button style={{ backgroundColor: this.state.backgroundSwasta ? 'green' : 'white', borderRadius: 10 }} onPress={() => this.ubahJenisSwasta()}><Text style={{ color: this.state.backgroundSwasta ? 'white' : 'grey' }}>SWASTA</Text></Button>
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
                  disabled={false}
                />
                {/* <Input placeholderTextColor="grey" style={{ color: "grey" }} placeholder='Tanggal Lahir' /> */}
                <Text>{this.state.pensiun != '' ? this.state.pensiun.toString().substr(3, 12) : ''}</Text>
                {/* <Text>DB: {this.state.pensiunDb != '' ? this.state.pensiunDb : ''}</Text> */}
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Lama Bekerja (Tahun)</Label>
                <Input onChangeText={this.ubahLamaKerja} placeholderTextColor="grey" style={{ color: "grey" }} keyboardType="numeric" value={this.state.lamaKerja} />
              </Item>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: 'black' }}>Alamat Perusahaan</Label>
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
                <Button style={{ justifyContent: 'center', alignSelf: 'center', width: '90%' }} success onPress={() => this.inputDataPegawai()}>
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
