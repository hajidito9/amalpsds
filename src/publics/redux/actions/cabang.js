import axios from 'axios';
import linkApi from './linkApi';

export const getCabang = () => {
    return {
        type: 'GET_CABANG',
        payload : axios.get(linkApi.ip+'cabang/view')
    }
}

export const cariCabang = (cari) => {
    return {
        type: 'CARI_CABANG',
        payload : axios.get(linkApi.ip+'cabang/view/'+cari)
    }
}