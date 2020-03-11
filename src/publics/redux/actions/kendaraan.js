import axios from 'axios';
import linkApi from './linkApi';

export const getMerk = (kategori) => {
    return {
        type: 'GET_MERK',
        payload : axios.get(linkApi.ip+'kendaraan/merk/'+kategori)
    }
}

export const cariMerk = (kategori,cari) => {
    return {
        type: 'CARI_MERK',
        payload : axios.get(linkApi.ip+'kendaraan/merk/cari/'+kategori+'/'+cari)
    }
}

export const getList = (merkId,status) => {
    return {
        type: 'GET_LIST',
        payload : axios.get(linkApi.ip+'kendaraan/list/'+merkId+'/'+status)
    }
}

export const cariTipe = (merkId,status,cari) => {
    return {
        type: 'CARI_TIPE',
        payload : axios.get(linkApi.ip+'kendaraan/list/cari/'+merkId+'/'+status+'/'+cari)
    }
}

export const getWarna = (tipe,status) => {
    return {
        type: 'GET_WARNA',
        payload : axios.get(linkApi.ip+'kendaraan/list/warna/'+tipe+'/'+status)
    }
}

export const getDetailKendaraan = (tipeId) => {
    return {
        type: 'GET_DETAILKENDARAAN',
        payload : axios.get(linkApi.ip+'kendaraan/list/'+tipeId)
    }
}

export const getDetailMerk = (merkId) => {
    return {
        type: 'GET_DETAILMERK',
        payload : axios.get(linkApi.ip+'kendaraan/merk/detail/'+merkId)
    }
}

export const addKendaraanNasabah = (kendaraan_id, merk_id, tipe, status, cc, warna, keterangan, harga, tahun, nobpkb, pengajuan_id) => {
    return {
        type: 'POST_KENDARAANNASABAH',
        payload : axios.post(linkApi.ip+'kendaraan/nasabah', {
            kendaraan_id:kendaraan_id, 
            merk_id:merk_id, 
            tipe:tipe, 
            status:status, 
            cc:cc, 
            warna:warna, 
            keterangan:keterangan, 
            harga:harga, 
            tahun:tahun, 
            nobpkb:nobpkb, 
            pengajuan_id:pengajuan_id
        })
    }
}