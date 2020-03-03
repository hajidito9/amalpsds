import axios from 'axios';
import linkApi from './linkApi';

export const uploadDokumen = (filePath) => {
    let upload = new FormData();
    upload.append('image', {
        uri: filePath.uri,
        name: filePath.fileName,
        type: 'image/jpg'
    });
    // console.warn(filePath.data)
    return {
        type: 'UPLOAD',
        payload: axios.post(linkApi.ip+'uploadDokumen', upload
        // {
        //     image : filePath
        // }
        )
    }
}