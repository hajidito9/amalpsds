import axios from 'axios';
import linkApi from './linkApi';

export const addAngsuran = (pengajuan_id, status,amount,tenor) => {
    return {
        type: 'POST_ANGSURAN',
        payload : axios.post(linkApi.ip+'pengajuan/buatAngsuran', {
            pengajuan_id:pengajuan_id, 
            status:status, 
            amount:amount, 
            tenor:tenor
        })
    }
}