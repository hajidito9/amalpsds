import axios from 'axios';
import linkApi from './linkApi';

export const addDpCash = (cash_id, jumlahdp, persen, diskonmunah) => {
    return {
        type: 'POST_DPCASH',
        payload : axios.post(linkApi.ip+'uangmuka/cash', {
            cash_id:cash_id, 
            jumlahdp:jumlahdp, 
            persen:persen, 
            diskonmunah:diskonmunah
        })
    }
}

export const hapusCash = (dp_id) => {
    return {
        type: 'HAPUS_CASH',
        payload : axios.post(linkApi.ip+'dpcash/hapus', {
            dp_id:dp_id, 
        })
    }
}