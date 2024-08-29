import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../Pages/Home/Home';
import {BLACK, BRAND, WHITE} from '../constants/color';
import Profile from '../Pages/Home/Profile';
import {HEIGHT, WIDTH} from '../constants/config';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: BLACK,
        tabBarStyle: {
          height: HEIGHT * 0.08,
          width: WIDTH,
          alignSelf: 'center',

          borderColor: '#ddd',
          elevation: 5,
        },
        headerStyle: {
          backgroundColor: BRAND,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          color: WHITE,
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Home}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarLabelStyle: {
            fontSize: 15, // Increase font size here
            fontWeight: 'bold',
          },
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {
            fontSize: 15, // Increase font size here
            fontWeight: 'bold',
          },
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Stack Navigator including the Bottom Tabs
export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="MyTabs">
      {/* Home stack can include MyTabs as a screen */}
      <Stack.Screen
        name="MyTabs"
        component={MyTabs}
        options={{
          headerShown: false, // Hide header if the header should not be shown on tab screens
        }}
      />
      {/* Other screens can go here */}
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: 'Dashboard',
          headerStyle: {
            backgroundColor: BRAND,
          },
          headerTitleStyle: {
            color: WHITE,
          },
        }}
      />
    </Stack.Navigator>
  );
}
