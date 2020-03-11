import React, { Component } from 'react';
import { View } from 'react-native';
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
    List,
    ListItem,
    DatePicker,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import NumberFormat from 'react-number-format';
let uuid = require('react-native-uuid');
import { connect } from 'react-redux';
import { addNasabah } from '../publics/redux/actions/nasabah';
import { addDpEmas } from '../publics/redux/actions/emas';
import { addJaminan } from '../publics/redux/actions/jaminan';
import { addDpCash } from '../publics/redux/actions/cash';
import { addPegawai } from '../publics/redux/actions/pegawai';
import { addMikro } from '../publics/redux/actions/mikro';
import { addPengajuan } from '../publics/redux/actions/pengajuan';
import { addKendaraanNasabah } from '../publics/redux/actions/kendaraan';
import { addAngsuran } from '../publics/redux/actions/angsuran';

class PengajuanKonfirmasi extends Component {
    constructor() {
        super();
        this.state = {
            harga: 0,
            angsuran: 0,
            merkKendaraan: '',
            tipeKendaraan: '',
            statusKendaraan: '',
            warnaKendaraan: '',
            tenor: 0,
            nama: '',
            cabang: '',
            tipePekerjaan: '',
            angsuran: 0,
            marhunBih: 0
        };
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Data Pengajuan',
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
        let asNasabahNama = await AsyncStorage.getItem("nasabahNama")
        let asNamaCabang = await AsyncStorage.getItem("namaCabang")
        let asHarga = Number(await AsyncStorage.getItem("hargaKendaraan"))
        let asTipePekerjaan = await AsyncStorage.getItem("tipePekerjaan")
        let asTenor = Number(await AsyncStorage.getItem("tenor"))
        let asMerkKendaraan = await AsyncStorage.getItem('merkKendaraan')
        let asTipeKendaraan = await AsyncStorage.getItem('tipeKendaraan')
        let asStatusKendaraan = await AsyncStorage.getItem('statusKendaraan')
        let asWarnaKendaraan = await AsyncStorage.getItem('warnaKendaraan')
        let asMarhunBih = await AsyncStorage.getItem('marhunBih')
        let asAngsuran = await AsyncStorage.getItem('angsuran')
        await this.setState({ merkKendaraan: asMerkKendaraan })
        await this.setState({ tipeKendaraan: asTipeKendaraan })
        await this.setState({ statusKendaraan: asStatusKendaraan })
        await this.setState({ warnaKendaraan: asWarnaKendaraan })
        await this.setState({ harga: asHarga })
        await this.setState({ tenor: asTenor })
        await this.setState({ nama: asNasabahNama })
        await this.setState({ cabang: asNamaCabang })
        await this.setState({ tipePekerjaan: asTipePekerjaan })
        await this.setState({ marhunBih: asMarhunBih })
        await this.setState({ angsuran: asAngsuran })
        // let diskonAng = ((0.0056 + (0.0111* (89 - (((this.state.harga - (this.state.harga * this.state.persenDp))/this.state.harga) * 100)))).toFixed(4) * 100).toFixed(2) / 100
    }

    addPengajuan = async () => {
        let nasabah_id = uuid.v4().slice(24, 36)
        let asNasabahNama = await AsyncStorage.getItem('nasabahNama')
        let asNasabahKtp = await AsyncStorage.getItem('nasabahKtp')
        let asNasabahHp = await AsyncStorage.getItem('nasabahHp')
        let asNasabahEmail = await AsyncStorage.getItem('nasabahEmail')
        let asNasabahJk = await AsyncStorage.getItem('nasabahJk')
        let asNasabahTl = await AsyncStorage.getItem('nasabahTl')
        // let asNasabahTglLahir = await AsyncStorage.getItem('nasabahTglLhr')
        let asNasabahTglLahirDb = await AsyncStorage.getItem('nasabahTglLhrDb')
        let asNasabahAlamat = await AsyncStorage.getItem('nasabahAlamat')
        let asNasabahProvinsi = await AsyncStorage.getItem('nasabahProvinsi')
        let asNasabahKota = await AsyncStorage.getItem('nasabahKota')
        let asNasabahKecamatan = await AsyncStorage.getItem('nasabahKecamatan')
        let asNasabahKelurahan = await AsyncStorage.getItem('nasabahKelurahan')
        let asNasabahStatus = await AsyncStorage.getItem('nasabahStatus')
        let asNasabahNmIbu = await AsyncStorage.getItem('nasabahNmIbu')
        let user_id = await AsyncStorage.getItem("userId")
        await this.props.dispatch(addNasabah(nasabah_id, asNasabahNama, asNasabahTl, asNasabahTglLahirDb, asNasabahJk, asNasabahStatus, asNasabahNmIbu, asNasabahKtp, asNasabahAlamat, asNasabahProvinsi, asNasabahKota, asNasabahKecamatan, asNasabahKelurahan, asNasabahEmail, asNasabahHp, user_id))

        let jenisDp = await AsyncStorage.getItem("jenisDp")
        let cash_id = uuid.v4().slice(24, 36)
        let dptabemas_id = uuid.v4().slice(24, 36)
        let jaminan_id = uuid.v4().slice(24, 36)

        if (jenisDp == "cash") {
            let persen = parseFloat(await AsyncStorage.getItem("persenDpPengajuan")).toFixed(4)
            let jumlahdp = await AsyncStorage.getItem("uangDp")
            let diskonmunah = parseFloat(await AsyncStorage.getItem("diskonAngsuran")).toFixed(4)
            await this.props.dispatch(addDpCash(cash_id, jumlahdp, persen, diskonmunah))
        }
        else if (jenisDp == "tabEmas") {
            let persen = parseFloat(await AsyncStorage.getItem("persenDpPengajuan")).toFixed(4)
            let jumlahdp = await AsyncStorage.getItem("uangDp")
            let gram = parseFloat(await AsyncStorage.getItem("gramDp"))
            let konversi = await AsyncStorage.getItem("hargaEmasDp")
            let diskonmunah = parseFloat(await AsyncStorage.getItem("diskonAngsuran")).toFixed(4)
            await this.props.dispatch(addDpEmas(dptabemas_id, gram, persen, konversi, jumlahdp, diskonmunah))
        }
        else if (jenisDp == "jaminan") {
            let link = await AsyncStorage.getItem("linkJaminan")
            let persen = parseFloat(await AsyncStorage.getItem("persenDpPengajuan")).toFixed(4)
            let jumlahdp = await AsyncStorage.getItem("uangDp")
            let jenis = await AsyncStorage.getItem("jenisPerhiasanDp")
            let karat = Number(await AsyncStorage.getItem("kadarPerhiasanDp"))
            let berat_kotor = parseFloat(await AsyncStorage.getItem("brtKotorPerhiasanDp"))
            let berat_bersih = parseFloat(await AsyncStorage.getItem("brtBersihPerhiasanDp"))
            let taksiran = await AsyncStorage.getItem("taksiranPerhiasanDp")
            await this.props.dispatch(addJaminan(jaminan_id, jenis, berat_kotor, berat_bersih, karat, taksiran, persen, jumlahdp, link))
        }

        let tipePekerjaan = await AsyncStorage.getItem("tipePekerjaan")
        let pegawai_id = uuid.v4().slice(24, 36)
        let mikro_id = uuid.v4().slice(24, 36)

        if (tipePekerjaan == "Pegawai") {

            let asKtpPegawai = await AsyncStorage.getItem('linkKtpPegawai')
            let asKKPegawai = await AsyncStorage.getItem('linkKKPegawai')
            let asSKPegawai = await AsyncStorage.getItem('linkSKPegawai')
            let asSlipPegawai = await AsyncStorage.getItem('linkSlipPegawai')
            let asRekPegawai = await AsyncStorage.getItem('linkRekPegawai')

            let asPegawaiNama = await AsyncStorage.getItem('pegawaiNama')
            let asPegawaiTelp = await AsyncStorage.getItem('pegawaiTelp')
            let asPegawaiStatus = await AsyncStorage.getItem('pegawaiStatus')
            let asPegawaiJenis = await AsyncStorage.getItem('pegawaiJenis')
            // let asPegawaiPensiun = await AsyncStorage.getItem('pegawaiPensiun')
            let asPegawaiPensiunDb = await AsyncStorage.getItem('pegawaiPensiunDb')
            // console.warn(asPegawaiPensiunDb)
            let asPegawaiLamaKerja = await AsyncStorage.getItem('pegawaiLamaKerja')
            let asPegawaiAlamat = await AsyncStorage.getItem('pegawaiAlamat')
            // let asPegawaiTglLahirDb = await AsyncStorage.getItem('PegawaiTglLhrDb')
            let asPegawaiProvinsi = await AsyncStorage.getItem('pegawaiProvinsi')
            let asPegawaiKota = await AsyncStorage.getItem('pegawaiKota')
            let asPegawaiKecamatan = await AsyncStorage.getItem('pegawaiKecamatan')
            let asPegawaiKelurahan = await AsyncStorage.getItem('pegawaiKelurahan')
            let asPegawaiKodePos = await AsyncStorage.getItem('pegawaiKodePos')
            await this.props.dispatch(addPegawai(pegawai_id, asPegawaiNama, asPegawaiTelp, asPegawaiStatus, asPegawaiJenis, asPegawaiPensiunDb, asPegawaiLamaKerja, asPegawaiAlamat, asPegawaiProvinsi, asPegawaiKota, asPegawaiKecamatan, asPegawaiKelurahan, asPegawaiKodePos, asKtpPegawai, asSKPegawai, asKKPegawai, asSlipPegawai, asRekPegawai))
        }
        else if (tipePekerjaan == "Mikro") {
            let asKtpMikro = await AsyncStorage.getItem('linkKtpMikro')
            let asKKMikro = await AsyncStorage.getItem('linkKKMikro')
            let asDepanMikro = await AsyncStorage.getItem('linkDepanMikro')
            let asDalamMikro = await AsyncStorage.getItem('linkDalamMikro')
            let asMikroNama = await AsyncStorage.getItem('mikroNama')
            // let asMikroTelp = await AsyncStorage.getItem('mikroTelp')
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
            await this.props.dispatch(addMikro(mikro_id, asMikroNama, asMikroBidang, asMikroLamaUsaha, asMikroStatus, asMikroJarak, asMikroJenis, asMikroAlamat, asMikroProvinsi, asMikroKota, asMikroKecamatan, asMikroKelurahan, asMikroKodePos, asKtpMikro, asKKMikro, asDepanMikro, asDalamMikro))
        }

        let dp_id = ''
        if (jenisDp == "cash") {
            dp_id = cash_id
        }
        else if (jenisDp == "tabEmas") {
            dp_id = dptabemas_id
        }
        else if (jenisDp == "jaminan") {
            dp_id = jaminan_id
        }

        let pekerjaan_id = ''
        if (tipePekerjaan == "Pegawai") {
            pekerjaan_id = pegawai_id
        }
        else if (tipePekerjaan == "Mikro") {
            pekerjaan_id = mikro_id
        }

        let asIdCabang = await AsyncStorage.getItem('idCabang')
        let marhunbih = await AsyncStorage.getItem("marhunBih")
        let angsuran = await AsyncStorage.getItem("angsuran")
        let verifikasi = false
        let lunas = false
        let tgl_transaksi = new Date()
        let asTenor = await AsyncStorage.getItem("tenor")
        let pengajuan_id = uuid.v4().slice(24, 36)

        await this.props.dispatch(addPengajuan(pengajuan_id, asIdCabang, marhunbih, angsuran, verifikasi, lunas, tgl_transaksi, asTenor, nasabah_id, jenisDp, dp_id, tipePekerjaan, pekerjaan_id))

        let asIdKendaraan = await AsyncStorage.getItem('idKendaraan')
        let merk_id = await AsyncStorage.getItem("idMerk")
        let tipe = await AsyncStorage.getItem("tipeKendaraan")
        let status = await AsyncStorage.getItem("statusKendaraan")
        let cc = await AsyncStorage.getItem("ccKendaraan")
        let warna = await AsyncStorage.getItem("warnaKendaraan")
        let keterangan = await AsyncStorage.getItem("keteranganKendaraan")
        let tahun = await AsyncStorage.getItem("tahunKendaraan")
        let harga = Number(await AsyncStorage.getItem("hargaKendaraan"))
        await this.props.dispatch(addKendaraanNasabah(asIdKendaraan, merk_id, tipe, status, cc, warna, keterangan, harga, tahun, null, pengajuan_id))

        let statusAngsuran = "Belum Bayar"
        await this.props.dispatch(addAngsuran(pengajuan_id, statusAngsuran, angsuran, asTenor))
        alert('pengajuan tersimpan')
    }

    render() {
        return (
            <Container>
                <Content>
                    <View style={{ marginTop: '3%' }} >
                        <Item stackedLabel>
                            <Label style={{ marginLeft: '1%', fontSize: 16 }}>Nama Nasabah</Label>
                            <Input style={{ color: "black", fontWeight: 'bold' }} editable={false} value={this.state.nama} />
                        </Item>
                        <Text style={{ marginLeft: '2%', fontWeight: 'bold' }}>Data Pengajuan</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <List>
                                    <ListItem style={{ alignSelf: 'flex-start' }}>
                                        <Text style={{ color: 'grey' }}>Kendaraan</Text>
                                    </ListItem>
                                    <ListItem style={{ alignSelf: 'flex-start' }}>
                                        <Text style={{ color: 'grey' }}>Tipe Nasabah</Text>
                                    </ListItem>
                                    <ListItem style={{ alignSelf: 'flex-start' }}>
                                        <Text style={{ color: 'grey' }}>Jangka Waktu</Text>
                                    </ListItem>
                                    <ListItem style={{ alignSelf: 'flex-start' }}>
                                        <Text style={{ color: 'grey' }}>Harga Kendaraan</Text>
                                    </ListItem>
                                    <ListItem style={{ alignSelf: 'flex-start' }}>
                                        <Text style={{ color: 'grey' }}>Marhun Bih</Text>
                                    </ListItem>
                                    <ListItem style={{ alignSelf: 'flex-start' }}>
                                        <Text style={{ color: 'grey', alignSelf: 'flex-start' }}>Biaya Angsuran</Text>
                                    </ListItem>
                                </List>
                            </View>
                            <View style={{ marginLeft: '-10%', flexDirection: 'column' }}>
                                <List>
                                    <ListItem >
                                        <Text style={{ color: "black", alignSelf: 'flex-end' }}>: {this.state.merkKendaraan + ' ' + this.state.tipeKendaraan + ' ' + this.state.statusKendaraan + ' (' + this.state.warnaKendaraan + ')'}</Text>
                                    </ListItem>
                                    <ListItem >
                                        <Text style={{ color: "black" }}>: {this.state.tipePekerjaan}</Text>
                                    </ListItem>
                                    <ListItem >
                                        <Text style={{ color: "black", alignSelf: 'flex-end' }}>: {this.state.tenor}</Text>
                                    </ListItem>
                                    <ListItem >
                                        <NumberFormat value={this.state.harga} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ color: "black", alignSelf: 'flex-end' }}>: {value}</Text>} />
                                    </ListItem>
                                    <ListItem >
                                        <NumberFormat value={this.state.marhunBih} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ color: "black", alignSelf: 'flex-end' }}>: {value}</Text>} />
                                    </ListItem>
                                    <ListItem >
                                        <NumberFormat value={this.state.angsuran} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ color: "black", alignSelf: 'flex-end' }}>: {value}</Text>} />
                                    </ListItem>
                                </List>
                            </View>
                        </View>
                        <Text style={{ marginLeft: '2%', fontWeight: 'bold' }}>Lokasi Akad</Text>
                        <Text style={{ marginLeft: '5%', marginTop: '2%', color: 'grey' }}>{this.state.cabang}</Text>
                        <View style={{ marginTop: '5%', marginBottom: '5%' }}>
                            <Button style={{ justifyContent: 'center', alignSelf: 'center', width: '90%' }} success onPress={() => this.addPengajuan()}>
                                <Text>Lanjut</Text>
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
        kendaraanProp: state.kendaraan,
        nasabahProp: state.nasabah,
        emasProp: state.emas,
        jaminanProp: state.jaminan,
        cashProp: state.cash,
        pegawaiProp: state.pegawai,
        mikroProp: state.mikro,
        pengajuanProp: state.pengajuan,
        angsuranProp: state.angsuran,
    }
}

export default connect(mapStateToProps)(PengajuanKonfirmasi);