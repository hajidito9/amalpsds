import axios from 'axios';
import linkApi from './linkApi';

export const getMerk = (kategori) => {
    return {
        type: 'GET_MERK',
        payload : axios.get(linkApi.ip+'kendaraan/merk/'+kategori)
    }
}

export const getList = (merkId,status) => {
    return {
        type: 'GET_LIST',
        payload : axios.get(linkApi.ip+'kendaraan/list/'+merkId+'/'+status)
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