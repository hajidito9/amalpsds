import axios from 'axios';
import linkApi from './linkApi';

export const addNasabah = (nasabah_id, nama, tempat_lahir, tanggal_lahir, jenis_kelamin, status, nama_ibu, no_ktp, alamat, provinsi, kota, kecamatan, kelurahan, email, no_hp, user_id) => {
    return {
        type: 'POST_NASABAH',
        payload : axios.post(linkApi.ip+'nasabah', {
            nasabah_id : nasabah_id, 
            nama:nama, 
            tempat_lahir:tempat_lahir, 
            tanggal_lahir:tanggal_lahir, 
            jenis_kelamin:jenis_kelamin, 
            status:status, 
            nama_ibu:nama_ibu, 
            no_ktp:no_ktp, 
            alamat:alamat, 
            provinsi:provinsi, 
            kota:kota, 
            kecamatan:kecamatan, 
            kelurahan:kelurahan, 
            email:email, 
            no_hp:no_hp, 
            user_id:user_id
        })
    }
}

export const getNasabah = () => {
    return {
        type: 'GET_NASABAH',
        payload : axios.get(linkApi.ip+'nasabah')
    }
}

export const getDetailNasabah = (nasabah_id) => {
    return {
        type: 'GET_DETAILNASABAH',
        payload : axios.get(linkApi.ip+'nasabah/'+nasabah_id)
    }
}

export const getDetailKendaraan = (nasabah_id) => {
    return {
        type: 'GET_DETAILKENDARAANNASABAH',
        payload : axios.post(linkApi.ip+'nasabah/get/kendaraan', {
            nasabah_id : nasabah_id, 
        })
    }
}

export const getDpCash = (nasabah_id) => {
    return {
        type: 'GET_DPCASH',
        payload : axios.post(linkApi.ip+'nasabah/get/cash', {
            nasabah_id : nasabah_id, 
        })
    }
}
export const getDpJaminan = (nasabah_id) => {
    return {
        type: 'GET_DPJAMINAN',
        payload : axios.post(linkApi.ip+'nasabah/get/jaminan', {
            nasabah_id : nasabah_id, 
        })
    }
}
export const getDpTabEmas = (nasabah_id) => {
    return {
        type: 'GET_DPTABEMAS',
        payload : axios.post(linkApi.ip+'nasabah/get/emas', {
            nasabah_id : nasabah_id, 
        })
    }
}
export const getMikroNasabah = (nasabah_id) => {
    return {
        type: 'GET_MIKRONASABAH',
        payload : axios.post(linkApi.ip+'nasabah/get/mikro', {
            nasabah_id : nasabah_id, 
        })
    }
}
export const getPegawaiNasabah = (nasabah_id) => {
    return {
        type: 'GET_PEGAWAINASABAH',
        payload : axios.post(linkApi.ip+'nasabah/get/pegawai', {
            nasabah_id : nasabah_id, 
        })
    }
}

export const hapusNasabah = (nasabah_id) => {
    return {
        type: 'HAPUS_NASABAH',
        payload : axios.post(linkApi.ip+'nasabah/hapus', {
            nasabah_id:nasabah_id, 
        })
    }
}