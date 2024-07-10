/* eslint-disable prettier/prettier */
import {Dimensions} from 'react-native';

// export const common_color = '#009933';
// export const common_color = '#1ca672';
export const HEIGHT = Dimensions.get('window').height;
export const WIDTH = Dimensions.get('window').width;

// export const BASEURL = "https://backend.epsumthings.com";
export const BASEURL = 'https://backend.epsumthings.com';
export const IRDB_SERVICE_BASEURL = 'https://irdb.epsumthings.com/api';
export const WEBSCADA_WEB_URL = 'https://epsumthings-webscada.netlify.app';
export const WEBSOCKET_BASEURL = 'wss://backend.epsumthings.com';
export const MQTT_URL = 'mqtt://epsumthings.epsumlabs.com:1883';
export const MQTT_CLIENT_ID = 'MQTT_FX_Client';
export const ws_baseurl = 'wss://backend.epsumthings.com';

export const REQUEST_METHOD = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

export const RESPONSE_TYPE = {
  JSON: 'json',
  NULL: null,
  BLOB: 'blob',
};

export const RESPONSE_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
};

export const DEFAULT_DATA = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

export const LAYOUT_TYPE = {
  NULL: null,
  BASELAYOUT: `BASELAYOUT`,
};

export const CRYPTIC_STRING = {
  BEARER: 'Bearer',
  AUTHENTICATE: 'Authenticate',
};
