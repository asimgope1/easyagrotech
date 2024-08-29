/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HEIGHT, WIDTH} from '../../constants/config';
import ForgotPasswordModal from '../../components/ForgotPasswordModal';
import {BLACK} from '../../constants/color';
import {checkuserToken} from '../../redux/actions/auth';
import {storeObjByKey} from '../../utils/Storage';
import {BASE_URL} from '../../constants/url';
import {Base64} from 'js-base64';
import {useDispatch} from 'react-redux';
import {sendDeviceToken} from '../../../Components/authentication/action';
import Loader from '../../components/Loader';

const Login = () => {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [openmodal, setOpenmodal] = useState(false);
  const [loading, setloading] = useState(false);
  const [Fcm, SetFcm] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleBackPress = () => {
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit?',
        [
          {text: 'Cancel', onPress: () => null, style: 'cancel'},
          {text: 'Yes', onPress: () => BackHandler.exitApp()},
        ],
        {cancelable: false},
      );
      return true; // This will prevent the default back action
    };

    // Add event listener for back press
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Cleanup the event listener
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, []);

  useEffect(() => {
    GetFCM();
  }, []);

  const GetFCM = async () => {
    const fcmToken = await AsyncStorage.getItem('deviceToken');
    console.log('fcmToken', fcmToken);
    if (fcmToken) {
      SetFcm(fcmToken);
    } else {
      console.log('no fcm token');
    }
  };

  const onLogin = (userid, password) => {
    setloading(true);
    const Url = `${BASE_URL}/user/auth/`;
    console.log('url', Url);
    const encodedCredentials = Base64.encode(
      userid + ':' + Base64.encode(password),
    );
    console.log('encodedCredentials', encodedCredentials);

    const myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Authorization', `Authenticate ${encodedCredentials}`);

    console.log('head', myHeaders);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(Url, requestOptions)
      .then(response => response.json())
      .then(result => {
        setloading(false);
        console.log('res', result);
        if (result.status === 'success') {
          storeObjByKey('loginResponse', result);
          sendDeviceToken(result?.data?.access_token, Fcm);
          dispatch(checkuserToken(true));
        } else {
          Alert.alert('Error', 'Invalid email or password');
        }
        console.log(result);
      })
      .catch(error => console.error(error));
  };

  return (
    <ScrollView
      style={{height: HEIGHT, width: WIDTH, backgroundColor: 'white'}}>
      <ForgotPasswordModal
        isVisible={openmodal}
        onCloseModal={() => setOpenmodal(false)}
      />
      <View
        style={{
          height: HEIGHT,
        }}>
        <View
          style={{
            height: '40%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'green',
            alignSelf: 'center',
            borderRadius: 5,
            borderColor: 'green',
            borderBottomWidth: 0,
            shadowColor: '#000000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.9,
            shadowRadius: 3,
            elevation: 3,
          }}>
          <Image
            source={require('../../assets/images/logologin.png')}
            style={{height: 150, width: 170, marginBottom: 50}}
          />
        </View>

        <View
          style={{
            height: '45%',
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            marginTop: -70,
            alignSelf: 'center',
            borderRadius: 20,
            zIndex: 10,
            borderColor: 'green',
            borderBottomWidth: 0,
            shadowColor: '#000000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.9,
            shadowRadius: 3,
            elevation: 3,
            paddingHorizontal: 15,
          }}>
          <View
            style={{
              height: '30%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 23,
                fontFamily: 'Gill Sans',
                fontWeight: '800',
                color: 'rgb(220,20,60)',
                marginTop: 30,
              }}>
              LogIn
            </Text>
          </View>
          <View style={{height: '40%'}}>
            <View style={styles.textInputBox}>
              <MaterialCommunityIcons name="email" size={20} color={'green'} />
              <TextInput
                placeholder="Email Id"
                style={{paddingLeft: 15, width: '100%', color: BLACK}}
                onChangeText={data => setUserid(data)}
              />
            </View>
            <View style={styles.textInputBox}>
              <Entypo name="lock" size={20} color={'green'} />
              <TextInput
                secureTextEntry={!visible}
                placeholder="Password"
                style={{paddingLeft: 15, width: '90%', color: BLACK}}
                onChangeText={text => setPassword(text)}
              />
              <TouchableOpacity onPress={() => setVisible(!visible)}>
                {visible ? (
                  <Entypo name="eye-with-line" size={22} />
                ) : (
                  <Entypo name="eye" size={22} />
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setOpenmodal(true)}>
              <Text style={{fontSize: 11, fontWeight: '700', color: 'green'}}>
                Forgot Password
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.loginButton}>
            <TouchableOpacity
              onPress={() => {
                onLogin(userid, password);
              }}>
              <View
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  height: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  backgroundColor: 'rgb(220,20,60)',
                  marginTop: 15,
                }}>
                <Text style={styles.buttonText}>LOGIN</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{height: '20%', width: '100%', marginTop: '-10%'}}>
          <Image
            source={require('../../assets/images/footereasy.png')}
            style={{height: 200, width: '100%'}}
          />
        </View>
      </View>
      <Loader visible={loading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textInputBox: {
    backgroundColor: 'white',
    width: '85%',
    alignSelf: 'center',
    marginBottom: 15,
    borderRadius: 7,
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'green',
    borderBottomWidth: 0,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  loginButton: {
    height: '30%',
    width: '100%',
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default Login;
