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
import journey from './journey'
import vaccount from './vaccount'
import gcash from './gcash'

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
    pengajuan,
    journey,
    vaccount,
    gcash
});

export default appReducer;