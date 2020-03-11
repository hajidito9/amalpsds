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