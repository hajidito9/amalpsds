import {combineReducers} from 'redux';

import login from './login';
import kendaraan from './kendaraan';
import upload from './upload';
import cabang from './cabang'
import emas from './emas'
import angsuran from './angsuran';
import cash from './cash';
import jaminan from './jaminan';
import mikro from './mikro'
import nasabah from './nasabah'
import pegawai from './pegawai'
import pengajuan from './pengajuan'

const appReducer = combineReducers({
    login,
    kendaraan,
    upload,
    cabang,
    emas,
    angsuran,
    cash,
    jaminan,
    mikro,
    nasabah,
    pegawai,
    pengajuan
});

export default appReducer;