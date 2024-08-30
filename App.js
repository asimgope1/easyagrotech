import React, {useEffect} from 'react';
import Navigation from './src/navigation/Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';

const App = () => {
  useEffect(() => {
    requestPermission();
    getDeviceToken();
  }, []);
  const requestPermission = async () => {
    try {
      const checkPermission = await check(
        PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
      );
      if (checkPermission !== RESULTS.GRANTED) {
        const requestResult = await request(
          PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        );
        if (requestResult !== RESULTS.GRANTED) {
          throw new Error('Permission not granted');
        }
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const getDeviceToken = async () => {
    try {
      let token = await AsyncStorage.getItem('deviceToken');
      if (!token) {
        token = await messaging().getToken();
        await AsyncStorage.setItem('deviceToken', token);
      }
      console.log('Device Token:', token);
    } catch (error) {
      console.error('Error retrieving device token:', error);
    }
  };
  return <Navigation />;
};

export default App;
