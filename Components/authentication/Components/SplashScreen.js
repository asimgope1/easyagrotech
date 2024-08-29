import {Text, View, Image} from 'react-native';
import React, {Component} from 'react';
import {HEIGHT, WIDTH} from '../../lib/Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../../lib/Rootnavigation';
import {setAccessToken} from '../action';
import {connect} from 'react-redux';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  getData = async () => {
    try {
      await AsyncStorage.getItem('logindetails').then(data => {
        if (data !== null) {
          setAccessToken(data);
          RootNavigation.navigate('TabNavigatior');
        } else {
          this.props.navigation.navigate('Login');
        }
      });
    } catch (error) {}
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.getData();
    }, 4000);
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{height: '30%', width: '100%'}}>
          <Image
            source={require('../../Images/headereasy.png')}
            style={{height: '70%', width: '100%'}}
          />
        </View>
        <View
          style={{
            height: '20%',
            width: '100%',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../Images/logoeasy.png')}
            style={{height: 90, width: 300}}
          />
        </View>
        <View style={{height: '20%', width: '100%'}}>
          <Image
            source={require('../../Images/footereasy.png')}
            style={{height: '100%', width: '100%'}}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    setAccessToken: accessToken => dispatch(setAccessToken(accessToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
