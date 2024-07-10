/* eslint-disable prettier/prettier */
import {fetchApi} from '../lib/utils';
import * as RootNavigation from '../lib/Rootnavigation';
import {CRYPTIC_STRING, REQUEST_METHOD} from '../lib/Constant';
import {LOADING_END, LOADING_START} from '../authentication/actionType';
import {DASHBOARD_DETAILS, THING_DETAILS, USER_DETAILS} from './actionType';

export function getDashboardDetails(accessToken) {
  console.log('accessToken', accessToken);
  return function (dispatch) {
    dispatch({type: LOADING_START});
    fetchApi(
      `/resource/details?resources=things,active_things,inactive_things`,
      accessToken,
      REQUEST_METHOD.GET,
      successResponse => {
        dispatch({type: LOADING_END});
        dispatch({type: DASHBOARD_DETAILS, payload: successResponse});
      },
      errorResponse => {
        alert('errorResponse', errorResponse);
        dispatch({type: LOADING_END});
      },
    );
  };
}
// export function getThingsgroupwise(accessToken) {
//     return function (dispatch) {
//         dispatch({ type: LOADING_START })
//         fetchApi(
//             `/things//groupsubgroup/`,
//             accessToken,
//             REQUEST_METHOD.GET,
//             (successResponse) => {
//                 console.log("successResponse", successResponse)
//                 dispatch({ type: LOADING_END })
//                 dispatch({ type: GROUPWISE_THINGLIST, payload: successResponse });
//             },
//             (errorResponse) => {
//                 console.log("errorResponse", errorResponse, accessToken)
//                 alert("errorResponse", errorResponse)
//                 dispatch({ type: LOADING_END })
//             }
//         )
//     };
// }

export function getThingDetails(accessToken, body) {
  console.log(accessToken, body);
  return function (dispatch) {
    dispatch({type: LOADING_START});
    fetchApi(
      `/things/datalog/`,
      accessToken,
      REQUEST_METHOD.POST,
      successResponse => {
        dispatch({type: LOADING_END});
        dispatch({type: THING_DETAILS, payload: successResponse});
      },
      errorResponse => {
        alert(errorResponse);
        dispatch({type: LOADING_END});
      },
      body,
    );
  };
}

export function getUserDetails(accessToken) {
  return function (dispatch) {
    dispatch({type: LOADING_START});
    fetchApi(
      '/user/profile/',
      accessToken,
      REQUEST_METHOD.GET,
      successResponse => {
        dispatch({type: LOADING_END});
        dispatch({type: USER_DETAILS, payload: successResponse});
      },
      errorResponse => {
        alert('errorResponse', errorResponse);
        dispatch({type: LOADING_END});
      },
    );
  };
}
export function onUpdateProfile(accessToken, body) {
  return function (dispatch) {
    dispatch({type: LOADING_START});
    fetchApi(
      '/user/profile/',
      accessToken,
      REQUEST_METHOD.POST,
      successResponse => {
        dispatch(getUserDetails(accessToken));
        dispatch({type: LOADING_END});
      },
      errorResponse => {
        alert('errorResponse', errorResponse);
        dispatch({type: LOADING_END});
      },
      body,
    );
  };
}
export function onChangePassword(accessToken, body) {
  return function (dispatch) {
    dispatch({type: LOADING_START});
    fetchApi(
      '/user/profile/',
      accessToken,
      REQUEST_METHOD.PATCH,
      successResponse => {
        alert('Password Updated Sucessfully');
        dispatch({type: LOADING_END});
      },
      errorResponse => {
        console.log(errorResponse);
        alert('errorResponse', errorResponse);
        dispatch({type: LOADING_END});
      },
      body,
    );
  };
}
