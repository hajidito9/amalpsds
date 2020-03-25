import axios from 'axios';
import linkApi from './linkApi';

export const addJaminan = (jaminan_id, jenis, berat_kotor, berat_bersih, karat, taksiran, persen, jumlahdp, link) => {
    return {
        type: 'POST_JAMINAN',
        payload : axios.post(linkApi.ip+'uangmuka/jaminan', {
            jaminan_id:jaminan_id, 
            jenis:jenis, 
            berat_kotor:berat_kotor, 
            berat_bersih:berat_bersih, 
            karat:karat, 
            taksiran:taksiran, 
            persen:persen, 
            jumlahdp:jumlahdp, 
            link:link
        })
    }
}

export const hapusJaminan = (dp_id) => {
    return {
        type: 'HAPUS_JAMINAN',
        payload : axios.post(linkApi.ip+'dpjaminan/hapus', {
            dp_id:dp_id, 
        })
    }
}