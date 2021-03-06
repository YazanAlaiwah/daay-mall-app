import axios from 'axios';
import base64 from 'base-64';
import getHeader from '../header';
import cookie from 'react-cookies';
import {
  fetchLogin,
  LoginSuccess,
  LoginFailed,
  fetchSignup,
  signupSuccess,
  signupFailed,
  logoutSuccess,
} from '../actions/fetch';

// const api = 'http://localhost:3001';
const api = 'https://daaymall-401-project.herokuapp.com';
export const auth = (userInfo) => ({
  type: 'LOGIN',
  payload: userInfo,
});

function getUserData(obj) {
  let acl = obj.acl.acl;
  let { avatar, confirmed, email, role, username, _id, stores, cart,paymentsHistory,views } = obj.data;
  return { avatar, confirmed, email, role, username, _id, acl, stores,cart,paymentsHistory,views };
}

export const loginRemoteUser = function (email, password, history) {
  return (dispatch) => {
    dispatch(fetchLogin({ fetchLogin: true }));
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      authorization: `Basic ${base64.encode(`${email}:${password}`)}`,
    };
    return axios
      .get(api + '/auth', { headers })
      .then((response) => {
        cookie.save('auth', response.data.data.token, { path: '/' });
        console.log(response);
        dispatch(auth(getUserData(response.data)));
        dispatch(LoginSuccess({ loginSuccess: true }));
        dispatch(fetchLogin({ fetchLogin: false }));
        dispatch(({type:'MODAL FOR LOGIN'}));
        history.push('/');
        setTimeout(()=>{dispatch({type:'MODAL FOR LOGIN CLOSE'});},2000);
      })
      .catch((err) => {
        dispatch(
          LoginFailed({
            loginFailed: true,
            loginErrorMsg: err.response,
          }),
        );
        dispatch(fetchLogin({ fetchLogin: false }));
      });
  };
};
export const signUpRemoteUser = function (username, email, password, history) {
  return (dispatch) => {
    dispatch(fetchSignup({ fetchSignup: true }));
    return axios
      .post(
        api + '/auth',
        { username, email, password },
        { headers: getHeader() },
      )
      .then((response) => {
        cookie.save('auth', response.data.data.token, { path: '/' });
        dispatch(auth(getUserData(response.data)));
        dispatch(signupSuccess({ signupSuccess: true }));
        dispatch(fetchSignup({ fetchSignup: false }));
        history.push('/');
      })
      .catch((err) => {
        dispatch(
          signupFailed({
            signupFailed: true,
            signupErrorMsg: err.response.data.err,
          }),
        );
        dispatch(fetchSignup({ fetchSignup: false }));
      });
  };
};

export const checkRemoteUser = function () {
  return (dispatch) => {
    // console.log('helo');
    return axios({
      url: api + '/auth/check',
      headers: getHeader(),
      method: 'get',
    })
      .then((response) => {
        console.log(response);
        dispatch(auth(getUserData(response.data)));
      })
      .catch(console.log);
  };
};
export const changePasswordRequest = function (obj) {
  return (dispatch) => {
    // console.log('helo');
    return axios({
      url: api + '/auth/resetpassword',
      headers: getHeader(),
      method: 'patch',
      data: obj,
    })
      .then((response) => {
        console.log(response.data);
        // dispatch(auth(getUserData(response.data)));
      })
      .catch((err) => console.log(err.response));
  };
};

export const logout = function (history) {
  return (dispatch) => {
    dispatch({ type: 'LOGOUT' });
    cookie.remove('auth');
    history.push('/');
    dispatch(logoutSuccess({ logoutSuccess: true }));
  };
};
