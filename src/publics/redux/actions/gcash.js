import axios from 'axios';
import linkApi from './linkApi';

export const bayarGcash = (amount,
    angsuran_id,
    nomor_gcash,
    jenis_transaksi,
    penyedia_layanan,
    user_id) => {
    return {
        type: 'POST_GCASH',
        payload: axios.post(linkApi.ip + 'pembayaran/inquirygc', {
            amount: amount,
            angsuran_id: angsuran_id,
            penyedia_layanan: penyedia_layanan,
            jenis_transaksi: jenis_transaksi,
            nomor_gcash: nomor_gcash,
            user_id: user_id
        })
    }
}

export const getGcashBalance = (
    user_id,
    nomor_gcash
) => {
    return {
        type: 'GET_GCASHBALANCE',
        payload: axios.post(linkApi.ip + 'gcash/getbalance', {
            user_id:user_id,
            nomor_gcash: nomor_gcash
        })
    }
}

export const autodebet = (nomor_gcash, value) => {
    return {
        type: 'AUTODEBET',
        payload : axios.put(linkApi.ip+'pembayaran/autodebet', {
            nomor_gcash : nomor_gcash,
            value:value 
        })
    }
}

export const getGcash = (user_id) => {
    return {
        type: 'GET_GCASH',
        payload: axios.get(linkApi.ip + 'gcash/' + user_id)
    }
}