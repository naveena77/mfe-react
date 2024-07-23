import {combineReducers} from 'redux';
import errorReducers from './errorReducers';
import loginSecurityReducer from './login/loginSecurityReducer';
import commonreducer from './commonreducer';

export default combineReducers({
    errors: errorReducers,
    loginSecurity : loginSecurityReducer,
    menuIcon:commonreducer
});