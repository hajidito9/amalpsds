import axios from 'axios';
import linkApi from './linkApi';

export const addMikro = (mikro_id, nama, bidang_usaha, lama_usaha, status_usaha, jarak, jenis, alamat, provinsi, kota, kecamatan, kelurahan, kode_pos, link_ktp, link_kk, link_depan, link_dalam) => {
    return {
        type: 'POST_MIKRO',
        payload : axios.post(linkApi.ip+'mikro', {
            mikro_id:mikro_id, 
            nama:nama, 
            bidang_usaha:bidang_usaha, 
            lama_usaha:lama_usaha, 
            status_usaha:status_usaha, 
            jarak:jarak, 
            jenis:jenis, 
            alamat:alamat, 
            provinsi:provinsi, 
            kota:kota, 
            kecamatan:kecamatan, 
            kelurahan:kelurahan, 
            kode_pos:kode_pos, 
            link_ktp:link_ktp, 
            link_kk:link_kk, 
            link_depan:link_depan, 
            link_dalam:link_dalam
        })
    }
}

export const hapusMikro = (pekerjaan_id) => {
    return {
        type: 'HAPUS_MIKRO',
        payload : axios.post(linkApi.ip+'mikro/hapus', {
            pekerjaan_id:pekerjaan_id, 
        })
    }
}