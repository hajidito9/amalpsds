import axios from 'axios';
import linkApi from './linkApi';

export const addPegawai = (pegawai_id, nama_perusahaan, telp, status, jenis_perusahaan, tgl_pensiun, lama_kerja, alamat, provinsi, kota, kecamatan, kelurahan, kode_pos, link_ktp, link_sk, link_kk, link_slip, link_rek) => {
    return {
        type: 'POST_PEGAWAI',
        payload : axios.post(linkApi.ip+'pegawai', {
            pegawai_id:pegawai_id, 
            nama_perusahaan:nama_perusahaan, 
            telp:telp, 
            status:status, 
            jenis_perusahaan:jenis_perusahaan, 
            tgl_pensiun:tgl_pensiun, 
            lama_kerja:lama_kerja, 
            alamat:alamat, 
            provinsi:provinsi, 
            kota:kota, 
            kecamatan:kecamatan, 
            kelurahan:kelurahan, 
            kode_pos:kode_pos, 
            link_ktp:link_ktp, 
            link_sk:link_sk, 
            link_kk:link_kk, 
            link_slip:link_slip, 
            link_rek:link_rek
        })
    }
}

export const hapusPegawai = (pekerjaan_id) => {
    return {
        type: 'HAPUS_PEGAWAI',
        payload : axios.post(linkApi.ip+'pegawai/hapus', {
            pekerjaan_id:pekerjaan_id, 
        })
    }
}