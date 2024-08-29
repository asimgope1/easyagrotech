import {View, Image, SafeAreaView} from 'react-native';
import React, {Fragment, useEffect} from 'react';
import {BRAND, WHITE} from '../../constants/color';
import LinearGradient from 'react-native-linear-gradient';
import {LOGO, LOGOZZ} from '../../constants/imagepath';
import {HEIGHT, MyStatusBar, WIDTH} from '../../constants/config';
import {splashStyles} from './SplashStyles';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 1000);
  }, []);

  return (
    <Fragment>
      <MyStatusBar backgroundColor={BRAND} barStyle={'light-content'} />
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{height: '30%', width: '100%'}}>
          <Image
            source={require('../../assets/images/headereasy.png')}
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
            source={require('../../assets/images/logoeasy.png')}
            style={{height: 90, width: 300}}
          />
        </View>
        <View style={{height: '20%', width: '100%'}}>
          <Image
            source={require('../../assets/images/footereasy.png')}
            style={{height: '100%', width: '100%'}}
          />
        </View>
      </View>
    </Fragment>
  );
};

export default Splash;
