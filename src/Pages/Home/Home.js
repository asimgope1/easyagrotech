import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  BackHandler, // Import BackHandler from React Native
  Alert,
  Image,
  StatusBar,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {HEIGHT, MyStatusBar} from '../../constants/config';
import {BLACK, BRAND, WHITE} from '../../constants/color';
import {BASE_URL} from '../../constants/url';
import {GETNETWORK} from '../../utils/Network';
import Loader from '../../components/Loader';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ThingsDetails from './ThingsDetails';
import messaging from '@react-native-firebase/messaging';

const Home = () => {
  const [dashBoardData, SetdashBoardData] = useState();
  const [thing, setthing] = useState([
    {thing_id: 'overview', thing_name: 'Overview'}, // Initial custom item
  ]);
  const [selectedItem, setSelectedItem] = useState({
    thing_id: 'overview',
    thing_name: 'Overview',
  }); // Initialize with "Overview" by default
  const [visible, setvisible] = useState(false);

  const [fcmMessage, setFcmMessage] = useState(null);

  useEffect(() => {
    // Function to handle hardware back press
    const onBackPress = () => {
      // Handle back press
      return true; // Return true to prevent default behavior
    };

    // Add event listener for hardware back press
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    // Function to handle incoming FCM messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setFcmMessage(remoteMessage);
      // Display the FCM message
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    // Fetch dashboard details and things groupwise

    // Cleanup function to remove event listener and FCM subscription
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      unsubscribe(); // Unsubscribe from FCM messages
    };
  }, []);

  useEffect(() => {
    GetdashboardDetails();

    // Adding back button event listener
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonPress,
    );

    // Cleanup the event listener on component unmount
    return () => backHandler.remove();
  }, [selectedItem]); // Re-run this effect if selectedItem changes

  const GetdashboardDetails = () => {
    // Fetch data from API
    setvisible(true);

    const Url = `${BASE_URL}/resource/details?resources=things,active_things,inactive_things`;
    GETNETWORK(Url, true)
      .then(response => {
        setvisible(false);
        console.log('Dashboard response', response.data.things);
        if (response.status === 'success') {
          SetdashBoardData(response.data);
          setthing([
            {thing_id: 'overview', thing_name: 'Overview'}, // Ensure "Overview" is always first
            ...response.data.things.data,
          ]);
        } else {
          console.log('Dashboard Error', response);
        }
      })
      .catch(error => {
        console.log('Dashboard Error', error);
      });
  };

  const handleBackButtonPress = () => {
    if (selectedItem.thing_id !== 'overview') {
      setSelectedItem({
        thing_id: 'overview',
        thing_name: 'Overview',
      });
      return true; // Prevent default back button behavior
    } else {
      // If "Overview" is already selected, exit the app
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit the app?',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {cancelable: false},
      );
      return true; // Prevent default back button behavior
    }
  };

  const thingsCount = dashBoardData?.things.count || 0;
  const activeCount = dashBoardData?.active_things.count || 0;
  const inactiveCount = dashBoardData?.inactive_things.count || 0;

  const data = [
    {
      backgroundColor: '#f0cb95',
      count: thingsCount,
      label: 'Things',
    },
    {
      backgroundColor: '#1c9b74',
      count: activeCount,
      label: 'Active',
    },
    {
      backgroundColor: '#F42859',
      count: inactiveCount,
      label: 'Inactive',
    },
  ];

  const renderSummaryItem = ({item}) => (
    <View
      style={{
        height: HEIGHT * 0.13, // Adjusted height
        width: HEIGHT * 0.14, // Adjusted width for horizontal layout
        marginRight: 10, // Add spacing between items
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: item.backgroundColor,
        borderRadius: 15,
      }}>
      <ImageBackground
        source={require('../../assets/images/patten1.png')}
        borderRadius={15}
        resizeMode="cover"
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
            alignSelf: 'center',
          }}>
          {item.count}
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontWeight: 'bold',
            color: '#fff',
            alignSelf: 'center',
          }}>
          {item.label}
        </Text>
      </ImageBackground>
    </View>
  );

  console.log('thing cosole 165 line ', thing);
  console.log('selectedItem cosole 165 line ', selectedItem);

  const renderThingItem = ({item}) => (
    <View
      style={{
        borderRadius: 15,
        backgroundColor: 'white',
        height: HEIGHT / 4,
        width: '90%',
        margin: 15,
        alignSelf: 'center',
        marginBottom: 10,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          backgroundColor: '#1c9b74',
        }}>
        <Text
          style={{
            fontSize: 10,
            fontWeight: 'bold',
            color: 'white',
            padding: 20,
          }}>
          {item.thing_name}
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontWeight: 'bold',
            marginTop: 20,
            paddingRight: 30,
            color: 'white',
          }}>
          {item.thing_id}
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: HEIGHT / 8,
          width: '100%',
          justifyContent: 'space-between',
          padding: 20,
          alignItems: 'center',
        }}>
        <View style={{marginTop: 10}}>
          <FontAwesome6 name="temperature-half" size={22} color="black" />
          <Text style={{fontSize: 15, fontWeight: 'bold', color: BLACK}}>
            {item.thing_status[0] < 0 ? '+++' : item.thing_status[0]}C
          </Text>
          <Text style={{fontSize: 10, fontWeight: 'bold', color: BLACK}}>
            current temp
          </Text>
        </View>
        <View>
          <FontAwesome6 name="droplet" size={22} color="blue" />
          <Text style={{fontSize: 15, fontWeight: 'bold', color: BLACK}}>
            {item.thing_status[6] <= 0 ? '+++' : `${item.thing_status[6]}F`}
          </Text>
          <Text style={{fontSize: 10, fontWeight: 'bold', color: BLACK}}>
            Humidity
          </Text>
        </View>
        <View>
          <Image
            source={require('../../assets/images/gas.png')}
            style={{height: 40, width: 40}}
          />
          <Text style={{fontSize: 15, fontWeight: 'bold', color: BLACK}}>
            {item.thing_status[7] <= 0 ? '+++' : `${item.thing_status[7]}ppm`}
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 'bold',
              textAlign: 'center',
              color: BLACK,
            }}>
            CO2
          </Text>
        </View>
        <View>
          <Image
            source={require('../../assets/images/nh3.png')}
            style={{height: 40, width: 40}}
          />

          <Text style={{fontSize: 15, fontWeight: 'bold', color: BLACK}}>
            {item.thing_status[8] <= 0 ? '+++' : `${item.thing_status[8]}ppm`}
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            NH3
          </Text>
        </View>
        <View>
          <FontAwesome5 name="balance-scale" size={22} color="yellowgreen" />
          <Text style={{fontSize: 15, fontWeight: 'bold', color: BLACK}}>
            {item.thing_status[64]}
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 'bold',
              textAlign: 'center',
              color: BLACK,
            }}>
            Balance
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <Fragment>
      <StatusBar
        backgroundColor={BRAND}
        barStyle={'light-content'}
        translucent={true}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            backgroundColor: WHITE,
          }}>
          <View
            style={{
              height: HEIGHT * 0.1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FlatList
              data={thing}
              horizontal={true}
              keyExtractor={item => item.thing_id}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    // Set the selected item when pressed
                    setSelectedItem(item);
                    console.log('Item pressed:', item);
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: 110,
                    borderRadius: 7,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    elevation: 5,
                    shadowColor: '#000',
                    marginVertical: 15,
                    marginLeft: 15,
                    backgroundColor:
                      selectedItem?.thing_id === item.thing_id
                        ? 'green'
                        : '#fff', // Change background color if selected
                  }}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 11,
                      color:
                        selectedItem?.thing_id === item.thing_id
                          ? '#fff'
                          : '#000', // Change text color if selected
                    }}>
                    {item.thing_name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          {selectedItem?.thing_id === 'overview' ? (
            <>
              <View
                style={{
                  width: '100%',
                  marginBottom: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FlatList
                  data={data}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderSummaryItem}
                  horizontal={true} // Enable horizontal scrolling
                />
              </View>
              <View style={{height: 500, width: '100%', marginBottom: 10}}>
                <FlatList
                  data={dashBoardData?.things?.data}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderThingItem}
                  ListFooterComponent={
                    <View
                      style={{
                        height: 50,
                        width: '100%',
                      }}
                    />
                  }
                />
              </View>
            </>
          ) : (
            <ThingsDetails selectedItem={selectedItem} />
          )}
        </View>
      </KeyboardAvoidingView>
      <Loader visible={visible} />
    </Fragment>
  );
};

export default Home;
