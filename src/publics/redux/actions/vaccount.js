import axios from 'axios';
import linkApi from './linkApi';

export const bayarVa = ( amount,
angsuran_id,
pengajuan_id,
nomor_hp,
bank,
penyedia_layanan,
jenis_transaksi,
nasabah_id) => {
    return {
        type: 'POST_VA',
        payload : axios.post(linkApi.ip+'pembayaran/inquiryva', {
            amount : amount,
            angsuran_id : angsuran_id,
            pengajuan_id : pengajuan_id,
            nomor_hp : nomor_hp,
            bank : bank,
            penyedia_layanan : penyedia_layanan,
            jenis_transaksi : jenis_transaksi,
            nasabah_id : nasabah_id
        })
    }
}