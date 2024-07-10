/* eslint-disable prettier/prettier */
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {Component} from 'react';
import {HEIGHT, WIDTH} from '../../lib/Constant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Rootnavigation from '../../lib/Rootnavigation';
import {connect} from 'react-redux';
import {sendDeviceToken, userLogin} from '../action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ForgotPasswordModal from './ForgotPasswordModal';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: '',
      password: '',
      visible: false,
      openmodal: false,
    };
  }

  onLogin = async () => {
    if (this.state.password && this.state.userid) {
      const deviceToken = await AsyncStorage.getItem('deviceToken');
      this.props.userLogin(this.state.userid, this.state.password, deviceToken);

      // Retrieve device token from AsyncStorage

      // Dispatch action to send device token upon successful login
    } else {
      Alert.alert('Please Enter valid userid and password');
    }
  };

  render() {
    console.log('item', this.state.userid, this.state.password);
    return (
      <ScrollView
        style={{height: HEIGHT, width: WIDTH, backgroundColor: 'white'}}>
        <ForgotPasswordModal
          openmodal={this.state.openmodal}
          onClosemodal={() => {
            this.setState({openmodal: false});
          }}
          onForgotPassword={data => {
            this.props.onForgotPassword(data);
            this.setState({openmodal: false});
          }}
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
              // borderWidth: 1,
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
              source={require('../../Images/logologin.png')}
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
              borderRadius: 5,
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
                <MaterialCommunityIcons
                  name="email"
                  size={20}
                  color={'green'}
                />
                <TextInput
                  placeholder="Email Id"
                  style={{paddingLeft: 15, width: '100%'}}
                  onChangeText={data =>
                    this.setState({userid: data})
                  }></TextInput>
              </View>
              <View style={styles.textInputBox}>
                <Entypo name="lock" size={20} color={'green'} />
                <TextInput
                  secureTextEntry={!this.state.visible}
                  placeholder="Password"
                  style={{paddingLeft: 15, width: '90%'}}
                  onChangeText={text =>
                    this.setState({password: text})
                  }></TextInput>

                <TouchableOpacity
                  onPress={() => this.setState({visible: !this.state.visible})}>
                  {this.state.visible ? (
                    <Entypo name="eye-with-line" size={22} />
                  ) : (
                    <Entypo name="eye" size={22} />
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.setState({openmodal: true});
                }}>
                <Text style={{fontSize: 11, fontWeight: '700', color: 'green'}}>
                  Forgot Password
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.loginButton}>
              <TouchableOpacity onPress={() => this.onLogin()}>
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
              source={require('../../Images/footereasy.png')}
              style={{height: 200, width: '100%'}}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

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
    borderRadius: 5,
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

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    userLogin: (email, password, deviceToken) =>
      dispatch(userLogin(email, password, deviceToken)),
    // sendDeviceToken: token => dispatch(sendDeviceToken(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
