/* eslint-disable prettier/prettier */

import {
  DASHBOARD_DETAILS,
  GROUPWISE_THINGLIST,
  THING_DETAILS,
  USER_DETAILS,
} from './actionType';

const initialState = {
  dashboard_details: {},
  thing_details: {},
  user_details: {},
  groupwise_thinglist: {},
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_DETAILS:
      return {
        ...state,
        dashboard_details: action.payload,
      };
    case THING_DETAILS:
      return {
        ...state,
        thing_details: action.payload,
      };
    case USER_DETAILS:
      return {
        ...state,
        user_details: action.payload,
      };
    case USER_DETAILS:
      return {
        ...state,
        user_details: action.payload,
      };
    case GROUPWISE_THINGLIST:
      return {
        ...state,
        groupwise_thinglist: action.payload,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
