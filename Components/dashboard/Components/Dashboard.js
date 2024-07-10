/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
  FlatList,
  Alert,
} from 'react-native';
import Header from '../../common/Header';
import {HEIGHT} from '../../lib/Constant';
import {connect} from 'react-redux';
import {getDashboardDetails, getThingsgroupwise} from '../action';
import {setAccessToken} from '../../authentication/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import messaging from '@react-native-firebase/messaging';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fcmMessage: null,
    };
  }
  componentDidMount() {
    // Add event listener for hardware back press
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);

    // Handle incoming FCM messages
    this.unsubscribe = messaging().onMessage(async remoteMessage => {
      this.setState({fcmMessage: remoteMessage});
      // Display the FCM message
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    // Fetch dashboard details and things groupwise
    this.fetchData();
  }

  componentWillUnmount() {
    // Remove event listener for hardware back press
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    // Unsubscribe from FCM messages
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  componentDidMount = () => {
    AsyncStorage.getItem('logindetails').then(item => {
      if (item !== null) {
        this.props.set_AccessToken(item);
        this.props.getDashboardDetails(item);
        this.props.getThingsgroupwise(item);
      }
    });
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.currentIndex !== this.props.currentIndex) {
      if (this.props.currentIndex == -1) {
        this.props.navigation.navigate('Dashboard');
      } else {
        this.props.navigation.navigate('ThingDetails', [
          ...this.props.dashboard_details.data.things.data,
        ]);
      }
    }
  };

  onBackPress = () => {
    BackHandler.exitApp();
    return true;
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  renderThingItem = ({item}) => (
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
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
            {item.thing_status[0] < 0 ? '+++' : item.thing_status[0]}C
          </Text>
          <Text style={{fontSize: 10, fontWeight: 'bold'}}>current temp</Text>
        </View>
        <View>
          <FontAwesome6 name="droplet" size={22} color="blue" />
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
            {item.thing_status[6] <= 0 ? '+++' : `${item.thing_status[6]}F`}
          </Text>
          <Text style={{fontSize: 10, fontWeight: 'bold'}}>Humidity</Text>
        </View>
        <View>
          <Image
            source={require('../../Images/gas.png')}
            style={{height: 40, width: 40}}
          />
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
            {item.thing_status[7] <= 0 ? '+++' : `${item.thing_status[7]}ppm`}
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            CO2
          </Text>
        </View>
        <View>
          <Image
            source={require('../../Images/nh3.png')}
            style={{height: 40, width: 40}}
          />

          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
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
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
            {item.thing_status[64]}
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Balance
          </Text>
        </View>
      </View>
    </View>
  );

  render() {
    const {dashboard_details} = this.props;
    const thingsCount = dashboard_details?.data?.things.count || 0;
    const activeCount = dashboard_details?.data?.active_things.count || 0;
    const inactiveCount = dashboard_details?.data?.inactive_things.count || 0;

    // Data for the three views
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
          height: 120,
          width: '30%',
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: item.backgroundColor,
          borderRadius: 15,
          marginHorizontal: 5, // Adjust as needed
        }}>
        <ImageBackground
          source={require('../../Images/patten1.png')}
          borderRadius={15}
          resizeMode="cover"
          style={{
            height: '100%',
            width: '100%',
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#fff',
              alignSelf: 'center',
              marginTop: '25%',
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

    return (
      <View
        style={{
          flex: 1,
        }}>
        <Header headerName={'Dashboard'} />
        <View
          style={{
            // flex: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            height: '20%',
            padding: 10,
          }}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderSummaryItem}
            numColumns={3}
          />
        </View>
        <View style={{height: 500, width: '100%', marginBottom: 10}}>
          {dashboard_details && dashboard_details.data && thingsCount > 0 && (
            <FlatList
              data={dashboard_details.data.things.data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderThingItem}
              ListFooterComponent={
                <View
                  style={{
                    height: 50,
                    width: '100%',
                  }}
                />
              }
            />
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = store => {
  return {
    accessToken: store.authenticationReducer.accessToken,
    dashboard_details: store.dashboardReducer.dashboard_details,
    currentIndex: store.authenticationReducer.currentIndex,
    groupwise_thinglist: store.dashboardReducer.groupwise_thinglist,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDashboardDetails: accessToken => {
      console.log('tok', accessToken);
      dispatch(getDashboardDetails(accessToken));
    },
    set_AccessToken: accessToken => dispatch(setAccessToken(accessToken)),
    getThingsgroupwise: accessToken =>
      dispatch(getThingsgroupwise(accessToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
