import axios from 'axios';
import linkApi from './linkApi';

// export const addPengajuan = (pengajuan_id, cabang_id, marhunbih, angsuran, verifikasi, lunas, tgl_transaksi, tenor, nasabah_id, jenis_dp, dp_id, jenis_pekerjaan, pekerjaan_id) => {
    export const addPengajuan = (pengajuan_id, cabang_id, marhunbih, angsuran, verifikasi, lunas, tenor, nasabah_id, jenis_dp, dp_id, jenis_pekerjaan, pekerjaan_id,tolak) => {
        return {
        type: 'POST_PENGAJUAN',
        payload : axios.post(linkApi.ip+'pengajuan', {
            pengajuan_id:pengajuan_id, 
            cabang_id:cabang_id, 
            marhunbih:marhunbih, 
            angsuran:angsuran, 
            verifikasi:verifikasi, 
            lunas:lunas, 
            // tgl_transaksi:tgl_transaksi, 
            tenor:tenor, 
            nasabah_id:nasabah_id, 
            jenis_dp:jenis_dp, 
            dp_id:dp_id, 
            jenis_pekerjaan:jenis_pekerjaan, 
            pekerjaan_id:pekerjaan_id,
            tolak:tolak
        })
    }
}

export const getPengajuan = (userid) => {
    return {
        type: 'GET_PENGAJUAN',
        payload : axios.get(linkApi.ip+'pengajuan/'+userid)
    }
}

export const verifikasiPengajuan = (pengajuan_id) => {
    return {
        type: 'VERIF_PENGAJUAN',
        payload : axios.put(linkApi.ip+'pengajuan/verifikasi', {
            pengajuan_id : pengajuan_id, 
        })
    }
}

export const lunasPengajuan = (pengajuan_id) => {
    return {
        type: 'VERIF_PENGAJUAN',
        payload : axios.put(linkApi.ip+'pengajuan/lunas', {
            pengajuan_id : pengajuan_id, 
        })
    }
}

export const tolakPengajuan = (pengajuan_id) => {
    return {
        type: 'TOLAK_PENGAJUAN',
        payload : axios.put(linkApi.ip+'pengajuan/tolak', {
            pengajuan_id : pengajuan_id, 
        })
    }
}

export const hapusPengajuan = (pengajuan_id) => {
    return {
        type: 'HAPUS_PENGAJUAN',
        payload : axios.post(linkApi.ip+'pengajuan/hapus', {
            pengajuan_id:pengajuan_id, 
        })
    }
}