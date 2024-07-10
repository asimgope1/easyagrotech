import AsyncStorage from "@react-native-async-storage/async-storage";
import { PermissionsAndroid } from "react-native";
import { BASEURL, BASE_URL, CRYPTIC_STRING, DEFAULT_DATA, REQUEST_METHOD, RESPONSE_TYPE } from "./Constant";
import * as RootNavigation from './Rootnavigation';

export function getRequestHeader() {
    let headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    };
    return headers;
}

export const fetchApi = (url, accessToken, method, successCallBack, errorCallBack, body = null, crypticString = CRYPTIC_STRING.BEARER) => {
    let options = null;
    let requestUrl = `${BASEURL}${url}`;
    let headers = {
        "Authorization": `${crypticString} ${accessToken}`,
        "Content-Type": "application/json",
        "accept": "application/json"
    };
    if (method === REQUEST_METHOD.GET && body !== null) {
        errorCallBack("GET request does not support body")
        return null
    } else if (method === REQUEST_METHOD.GET) {
        options = {
            method: method,
            headers: headers
        }
    } else {
        options = {
            method: method,
            body: JSON.stringify(body),
            headers: headers
        }
    }
    fetch(requestUrl, options)
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.status === "success") {
                successCallBack(responseJson)
            } else {
                errorCallBack(responseJson.msg)
            }
        }).catch(error => {
            console.log(error);
            alert(`Something Went Wrong. error : ${error}`);
            errorCallBack(error)
        })
}

export function apiErrorHandler(response, errorCallBack) {
    switch (response.status) {
        case RESPONSE_CODE.INTERNAL_SERVER_ERROR:
            alert(`Something Went Wrong, please try again later.`);
            errorCallBack(response)
            break;
        case RESPONSE_CODE.FORBIDDEN:
            alert(`You do not have permission to perform this action. Please Login and try Again`);
            errorCallBack(response)
            break;
        case RESPONSE_CODE.UNAUTHORIZED:
            errorCallBack(response)
            break;
        case RESPONSE_CODE.NOT_FOUND:
            errorCallBack(response)
            break;
        default:
            alert("Error");
            break;
    }
}

export const _storeData = async (key, data) => {
    try {
        await AsyncStorage.setItem( key, data );
        RootNavigation.navigate('TabNavigatior')

    } catch (error) {
        // Error saving data
    }
};

export const _retrieveData = async (key, returnedValue) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            returnedValue(value)
        }
        else {
            returnedValue('null')
        }
    } catch (error) {
        // Error retrieving data
    }
}
