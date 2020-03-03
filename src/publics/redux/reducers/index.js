import {combineReducers} from 'redux';

import login from './login';
import kendaraan from './kendaraan';
import upload from './upload';
import cabang from './cabang'
import emas from './emas'

const appReducer = combineReducers({
    login,
    kendaraan,
    upload,
    cabang,
    emas
});

export default appReducer;