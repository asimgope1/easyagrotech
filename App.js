import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './Components/authentication/Components/SplashScreen';
import 'react-native-gesture-handler';
import Login from './Components/authentication/Components/Login';
import Dashboard from './Components/dashboard/Components/Dashboard';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import Profile from './Components/Commons/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from './Components/dashboard/Components/User';
import CustomTabBar from './Components/common/CustomTabBar';
import {navigationRef} from './Components/lib/Rootnavigation';
import {Provider} from 'react-redux';
import configureStore from './Components/lib/ConfigureStore';
import User from './Components/dashboard/Components/User';
import ThingDetails from './Components/dashboard/Components/ThingDetails';
import Activity_Indicator from './Components/common/Activity_Indicator';
import {HEIGHT} from './Components/lib/Constant';
import messaging from '@react-native-firebase/messaging';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();
const store = configureStore();

export default function App() {
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

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Activity_Indicator />
        <Stack.Navigator>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TabNavigatior"
            component={TabNavigatior}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ThingDetails"
            component={ThingDetails}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const Tab = createBottomTabNavigator();

function TabNavigatior() {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  );
}
