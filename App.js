import React, {useEffect} from 'react';
import Navigation from './src/navigation/Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    getDeviceToken();
  }, []);

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
