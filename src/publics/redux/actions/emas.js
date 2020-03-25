import axios from 'axios';
import linkApi from './linkApi';

export const getEmas = (userid) => {
    return {
        type: 'GET_EMAS',
        payload : axios.get(linkApi.ip+'emas/user/'+userid)
    }
}

export const getKonversiEmas = (satuan) => {
    return {
        type: 'KONVERSI_EMAS',
        payload : axios.get(linkApi.ip+'emas/konversi/'+satuan)
    }
}

export const addDpEmas = (dptabemas_id, gram, persen, konversi, jumlahdp, diskonmunah) => {
    return {
        type: 'POST_DPEMAS',
        payload : axios.post(linkApi.ip+'uangmuka/tabemas', {
            dptabemas_id:dptabemas_id, 
            gram:gram, 
            persen:persen, 
            konversi:konversi, 
            jumlahdp:jumlahdp, 
            diskonmunah:diskonmunah
        })
    }
}

export const hapusEmas = (dp_id) => {
    return {
        type: 'HAPUS_EMAS',
        payload : axios.post(linkApi.ip+'dptabemas/hapus', {
            dp_id:dp_id, 
        })
    }
}