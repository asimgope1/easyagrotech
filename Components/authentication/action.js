import {_retrieveData, _storeData, fetchApi} from '../lib/utils';
import {
  ACCESS_TOKEN,
  CURRENT_INDEX,
  LOADING_END,
  LOADING_START,
} from './actionType';
import * as RootNavigation from '../lib/Rootnavigation';
import {BASEURL, CRYPTIC_STRING, REQUEST_METHOD} from '../lib/Constant';
import {Base64} from 'js-base64';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function userLogin(email, password, deviceToken) {
  //   console.log('userLogin', deviceToken);
  return function (dispatch) {
    dispatch({type: LOADING_START});
    fetchApi(
      '/user/auth/',
      Base64.encode(email + ':' + Base64.encode(password)),
      REQUEST_METHOD.POST,
      successResponse => {
        // console.log("successResponse", successResponse)
        // let userToken = successResponse.data.access_token;
        // AsyncStorage.setItem('userDetails', userToken);
        dispatch({
          type: ACCESS_TOKEN,
          payload: successResponse.data.access_token,
        });
        // dispatch(storeData(email, password))
        _storeData('logindetails', successResponse.data.access_token);
        sendDeviceToken(successResponse.data.access_token, deviceToken);
      },
      errorResponse => {
        console.log('errorResponse', errorResponse);
        alert(errorResponse);
        dispatch({type: LOADING_END});
      },
      null,
      CRYPTIC_STRING.AUTHENTICATE,
    );
  };
}
export function onForgotPassword(email) {
  return function (dispatch) {
    dispatch({type: LOADING_START});
    fetchApi(
      `/user/forgotpassword/?email=${email}`,
      null,
      REQUEST_METHOD.GET,
      successResponse => {
        alert(successResponse.msg);
        dispatch({type: LOADING_END});
        // dispatch({ type: THING_DETAILS, payload: successResponse });
      },
      errorResponse => {
        alert('errorResponse', errorResponse);
        dispatch({type: LOADING_END});
      },
      null,
    );
  };
}

export function setAccessToken(data) {
  return function (dispatch) {
    dispatch({type: ACCESS_TOKEN, payload: data});
  };
}

export function setCurrentIndex(currentIndex) {
  console.log('current', currentIndex);
  return function (dispatch) {
    dispatch({type: LOADING_START});
    dispatch({type: CURRENT_INDEX, payload: currentIndex});
    dispatch({type: LOADING_END});
  };
}

// Action creator function to send device token
export const sendDeviceToken = (token, devicetoken) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'text/plain');
  myHeaders.append('Authorization', `Bearer ${token}`);

  const raw = JSON.stringify({
    fire_token: devicetoken,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(`${BASEURL}/user/fire_token_set/`, requestOptions)
    .then(response => response.json())
    .then(result => console.log('token added', result))
    .catch(error => console.error(error));
};
