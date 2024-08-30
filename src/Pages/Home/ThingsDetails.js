import {
  View,
  Text,
  Image,
  Thingsstylesheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BRAND, WHITE} from '../../constants/color';
import {HEIGHT} from '../../constants/config';
import {Thingsstyles} from './ThingsStyles';
import {ws_baseurl} from '../../constants/url';
import Loader from '../../components/Loader';
import Devices from './Devices';
import Flock from './Flock';

const ThingsDetails = ({selectedItem}) => {
  const {thing_id, thing_name, thing_description, thing_image, thing_status} =
    selectedItem;
  const [websocket, setWebSocket] = React.useState(null);
  const [thingDetails, setThingDetails] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [fetched, setfetched] = useState(true);
  const values = thingDetails?.message?.values || [];

  const tableData = [
    {headerName: 'DESCRIPTION', width: '30%'},
    {headerName: 'VALUE', width: '20%'},
    {headerName: 'DESCRIPTION', width: '30%'},
    {headerName: 'VALUE', width: '20%'},
  ];

  const deviceList = [
    {
      image1: (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}>
          <Image
            source={require('../../assets/images/light.png')}
            style={{height: 28, width: 28, marginLeft: 10, marginRight: 7}}
          />
          <Text
            style={{
              fontSize: 10,
              fontWeight: 'bold',
              color: 'black',
              paddingLeft: 8,
            }}>
            Light
          </Text>
        </View>
      ),
      button1:
        values[19] === 1 || thing_status[19] === 1 ? (
          <Image
            source={require('../../assets/images/on.png')}
            style={{height: 30, width: 30}}
          />
        ) : (
          <Image
            source={require('../../assets/images/off.png')}
            style={{height: 30, width: 30}}
          />
        ),
      image2: (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}>
          <Image
            source={require('../../assets/images/cooling-fan.png')}
            style={{height: 23, width: 23, marginLeft: 10, marginRight: 7}}
          />
          <Text
            style={{
              fontSize: 10,
              fontWeight: 'bold',
              color: 'black',
              paddingLeft: 8,
            }}>
            Cool Pad
          </Text>
        </View>
      ),
      button2:
        values[16] === 1 || thing_status[16] === 1 ? (
          <Image
            source={require('../../assets/images/on.png')}
            style={{height: 30, width: 30}}
          />
        ) : (
          <Image
            source={require('../../assets/images/off.png')}
            style={{height: 30, width: 30}}
          />
        ),
    },
    {
      image1: (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}>
          <Image
            source={require('../../assets/images/feed.png')}
            style={{height: 23, width: 23, marginLeft: 10, marginRight: 7}}
          />
          <Text
            style={{
              fontSize: 10,
              fontWeight: 'bold',
              color: 'black',
              paddingLeft: 8,
            }}>
            Feed
          </Text>
        </View>
      ),
      button1: (
        <Image
          source={
            values[20] === 1 || thing_status[20] === 1
              ? require('../../assets/images/on.png')
              : require('../../assets/images/off.png')
          }
          style={{height: 30, width: 30}}
        />
      ),
      image2: (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}>
          <Image
            source={require('../../assets/images/heater2.png')}
            style={{height: 23, width: 23, marginLeft: 10, marginRight: 7}}
          />
          <Text
            style={{
              fontSize: 10,
              fontWeight: 'bold',
              color: 'black',
              paddingLeft: 8,
            }}>
            Heater
          </Text>
        </View>
      ),
      button2: (
        <Image
          source={
            values[15] === 1 || thing_status[15] === 1
              ? require('../../assets/images/on.png')
              : require('../../assets/images/off.png')
          }
          style={{height: 30, width: 30}}
        />
      ),
    },
    {
      image1: (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}>
          <Image
            source={require('../../assets/images/crossvent.png')}
            style={{height: 23, width: 23, marginLeft: 10, marginRight: 7}}
          />
          <Text
            style={{
              fontSize: 10,
              fontWeight: 'bold',
              color: 'black',
              paddingLeft: 8,
            }}>
            Cross Vent
          </Text>
        </View>
      ),
      button1: (
        <Image
          source={
            values[18] === 1 || thing_status[18] === 1
              ? require('../../assets/images/on.png')
              : require('../../assets/images/off.png')
          }
          style={{height: 30, width: 30}}
        />
      ),
      image2: (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}>
          <Image
            source={require('../../assets/images/fan5.png')}
            style={{height: 23, width: 23, marginLeft: 10, marginRight: 7}}
          />
          <Text
            style={{
              fontSize: 10,
              fontWeight: 'bold',
              color: 'black',
              paddingLeft: 8,
            }}>
            Fan
          </Text>
        </View>
      ),
      button2: (
        <Text
          style={{
            fontSize: 10,
            fontWeight: 'bold',
            color: 'black',
            paddingLeft: 8,
          }}>
          {values[21] === 1 || thing_status[21] === 1 ? 'AUTO' : 'MANUAL'}
        </Text>
      ),
    },
    {
      image1: (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}>
          <Image
            source={require('../../assets/images/alaram.png')}
            style={{height: 23, width: 23, marginLeft: 10, marginRight: 7}}
          />
          <Text
            style={{
              fontSize: 10,
              fontWeight: 'bold',
              color: 'black',
              paddingLeft: 8,
            }}>
            Alarm
          </Text>
        </View>
      ),
      button1: (
        <Image
          source={
            values[52] === 1 || thing_status[52] === 1
              ? require('../../assets/images/on.png')
              : require('../../assets/images/off.png')
          }
          style={{height: 30, width: 30}}
        />
      ),
      image2: (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}>
          <Image
            source={require('../../assets/images/fog1.png')}
            style={{height: 23, width: 23, marginLeft: 10, marginRight: 7}}
          />
          <Text
            style={{
              fontSize: 10,
              fontWeight: 'bold',
              color: 'black',
              paddingLeft: 8,
            }}>
            Fog
          </Text>
        </View>
      ),
      button2: (
        <Image
          source={
            values[46] === 1 || thing_status[46] === 1
              ? require('../../assets/images/on.png')
              : require('../../assets/images/off.png')
          }
          style={{height: 30, width: 30}}
        />
      ),
    },
  ];

  const connectWebSocket = () => {
    console.log('Attempting to connect WebSocket...');

    setLoading(true);

    // Close any existing WebSocket connection
    if (websocket) {
      console.log('Closing existing WebSocket...');
      websocket.close();
    }

    // Check if there is a selected item with a thing_id
    if (selectedItem.thing_id) {
      const WEBSOCKET_URL = `${ws_baseurl}/thing/r/${thing_id}/`;
      console.log('WEBSOCKET_URL:', WEBSOCKET_URL);

      // Create a new WebSocket connection
      const newWebSocket = new WebSocket(WEBSOCKET_URL);

      // Set a timeout for the initial connection
      const timeoutId = setTimeout(() => {
        console.log('WebSocket connection timeout reached.');
        alert('WebSocket connection timed out. Showing earlier readings.');
        setLoading(false); // Hide loader after timeout
        // Optionally, handle reconnection logic here
      }, 30000); // 30 seconds timeout

      // Handle WebSocket connection open event
      newWebSocket.onopen = () => {
        console.log('WebSocket connection opened.');
        clearTimeout(timeoutId); // Clear the timeout once the connection opens
        setLoading(false); // Hide loader when connection is established
      };

      // Handle incoming WebSocket messages
      newWebSocket.onmessage = message => {
        clearTimeout(timeoutId); // Clear the timeout if a message is received
        const Data = JSON.parse(message?.data);
        console.log('Data received:', Data);
        alert('New data received. Updating readings.');
        setThingDetails(Data);
        setfetched(true);
        setLoading(false); // Hide loader after data is processed
      };

      // Handle WebSocket closure
      newWebSocket.onclose = () => {
        clearTimeout(timeoutId); // Clear the timeout on close
        console.log('WebSocket connection closed.');
        alert('WebSocket connection closed. Showing earlier readings.');
        setLoading(false); // Hide loader when connection is closed
      };

      // Handle WebSocket errors
      newWebSocket.onerror = error => {
        clearTimeout(timeoutId); // Clear the timeout on error
        console.error('WebSocket error:', error);
        alert(
          'WebSocket encountered an error. Please check your connection and try again.',
        );
        setLoading(false); // Hide loader on error
      };

      // Save the WebSocket instance to state or a variable to manage it later
      setWebSocket(newWebSocket);
      console.log('WebSocket connected');
    } else {
      console.error('No thing_id selected, cannot connect WebSocket.');
      setLoading(false); // Hide loader if no thing_id is available
    }
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (websocket) {
        websocket.close();
      }
    };
  }, [SelecteItem]);
  const Options = [
    {
      id: 1,
      name: 'Main',
    },
    {
      id: 2,
      name: 'Device',
    },
    {
      id: 3,
      name: 'Flock',
    },
  ];
  const [SelecteItem, setSelectedItem] = React.useState(Options[0]);

  //   console.log('se', SelecteItem);
  return (
    <>
      <View
        style={{
          width: '100%',
          height: HEIGHT * 0.05,
          backgroundColor: BRAND,
          justifyContent: 'center',
          alignSelf: 'center',
        }}
      />
      <View
        style={{
          height: HEIGHT * 0.1,
          width: '95%',
          //   backgroundColor: 'lightgray',
          marginBottom: 15,
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <FlatList
          data={Options}
          horizontal={true}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                // Set the selected item when pressed
                setSelectedItem(item);
                if (item.name === 'Main') {
                  connectWebSocket();
                }
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
                backgroundColor: SelecteItem?.id === item.id ? 'green' : '#fff', // Change background color if selected
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 11,
                  color: SelecteItem?.id === item.id ? '#fff' : '#000', // Change text color if selected
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          // flex: 1,
          flexGrow: 1,
          alignItems: 'center',
          backgroundColor: WHITE,
          paddingBottom: 50, // Adjust padding bottom to ensure space for scrolling
        }}>
        {SelecteItem.name === 'Main' ? (
          <>
            {thingDetails.message?.values ? (
              <View>
                <View style={Thingsstyles.card}>
                  <View style={Thingsstyles.row}>
                    <View style={Thingsstyles.leftSection}>
                      <Image
                        source={require('../../assets/images/temperature.png')}
                        // style={Thingsstyles.image}
                        style={{
                          width: 70,
                          height: 100,
                          resizeMode: 'contain',
                        }}
                        resizeMode="contain"
                      />
                      <View>
                        <Text style={Thingsstyles.avgTempLabel}>
                          Avg. Temperature
                        </Text>
                        <Text style={Thingsstyles.avgTempValue}>
                          {values[0] < 0 ? '+++' : values[0]}
                        </Text>
                        <View style={Thingsstyles.reqTempContainer}>
                          <Text style={Thingsstyles.reqTempLabel}>
                            Req-Temp- {values[29]}
                          </Text>
                        </View>
                        <View>
                          <Text style={Thingsstyles.outsideTempLabel}>
                            Outside-Temp- {values[5] < 0 ? '+++' : values[5]}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={Thingsstyles.rightSection}>
                      <View style={Thingsstyles.tempColumn}>
                        <View>
                          <Text style={Thingsstyles.tempLabel}>Temp-1:</Text>
                          <Text style={Thingsstyles.tempValue}>
                            {values[1] < 0 ? '+++' : values[1]}
                          </Text>
                        </View>
                        <View>
                          <Text style={Thingsstyles.tempLabel}>Temp-3:</Text>
                          <Text style={Thingsstyles.tempValue}>
                            {values[3] < 0 ? '+++' : values[3]}
                          </Text>
                        </View>
                      </View>
                      <View style={Thingsstyles.tempColumn}>
                        <View>
                          <Text style={Thingsstyles.tempLabel}>Temp-2:</Text>
                          <Text style={Thingsstyles.tempValue}>
                            {values[2] < 0 ? '+++' : values[2]}
                          </Text>
                        </View>
                        <View>
                          <Text style={Thingsstyles.tempLabel}>Temp-4:</Text>
                          <Text style={Thingsstyles.tempValue}>
                            {values[4] < 0 ? '+++' : values[4]}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Thingsstyles.humidityContainer}>
                  <View style={Thingsstyles.humidityLeftSection}>
                    <Image
                      source={require('../../assets/images/humidity.png')}
                      style={Thingsstyles.humidityImage}
                    />
                    <View style={Thingsstyles.humidityTextContainer}>
                      <Text style={Thingsstyles.humidityLabel}>Humidity-</Text>
                      <Text style={Thingsstyles.humidityValue}>
                        {values[6] <= 0 ? '+++' : values[6]}
                      </Text>
                    </View>
                  </View>
                  <View style={Thingsstyles.humidityRightSection}>
                    <View style={Thingsstyles.reqHumidityContainer}>
                      <Text style={Thingsstyles.reqHumidityLabel}>
                        Req Humidity-
                      </Text>
                      <Text style={Thingsstyles.reqHumidityValue}>
                        {values[30]}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={Thingsstyles.containerco2}>
                  <View style={Thingsstyles.cardco2}>
                    <View style={Thingsstyles.cardContent}>
                      <Image
                        source={require('../../assets/images/gas.png')}
                        style={{
                          width: 80,
                          height: 80,
                          resizeMode: 'contain',
                        }}
                      />
                      <View style={Thingsstyles.textContainer}>
                        <Text style={Thingsstyles.title}>CO2</Text>
                        <Text style={Thingsstyles.value}>
                          {values[7] <= 0 ? '+++' : values[7]}
                          {values[7] && values[7].unit}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={Thingsstyles.cardco2}>
                    <View style={Thingsstyles.cardContent}>
                      <Image
                        source={require('../../assets/images/nh3.png')}
                        style={{
                          width: 80,
                          height: 80,
                          resizeMode: 'contain',
                        }}
                      />
                      <View style={Thingsstyles.textContainer}>
                        <Text style={Thingsstyles.title}>NH3</Text>
                        <Text style={Thingsstyles.value}>
                          {values[8] <= 0 ? '+++' : values[8]}
                          {values[8] && values[8].unit}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Thingsstyles.ventContainer}>
                  <View style={Thingsstyles.ventContent}>
                    <View>
                      <Text style={Thingsstyles.ventText}>Minimum Vent</Text>
                      <Image
                        source={
                          values[43] == 1
                            ? require('../../assets/images/fan.gif')
                            : require('../../assets/images/fan5.png')
                        }
                        style={Thingsstyles.ventImage}
                      />
                    </View>
                    <View>
                      <Text
                        style={[Thingsstyles.ventText, {textAlign: 'center'}]}>
                        Maximum Vent
                      </Text>
                      <Image
                        source={
                          values[43] == 0
                            ? require('../../assets/images/fan.gif')
                            : require('../../assets/images/fan5.png')
                        }
                        style={Thingsstyles.ventImage}
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.container}>
                  {deviceList && deviceList.length > 0 && (
                    <View style={styles.tableBody}>
                      <View style={styles.tableContainer}>
                        {/* Table Header */}
                        <View style={styles.tableHeader}>
                          {tableData.map((item, index) => (
                            <View
                              key={index}
                              style={[
                                styles.tableHeaderCell,
                                {width: item.width},
                                index === 1 && styles.tableHeaderBorderRight,
                              ]}>
                              <Text style={styles.tableHeaderText}>
                                {item.headerName}
                              </Text>
                            </View>
                          ))}
                        </View>
                        {/* Table Rows */}
                        <View>
                          {deviceList.map((item, index) => (
                            <View
                              key={index}
                              style={[
                                styles.tableRow,
                                {
                                  backgroundColor:
                                    index % 2 !== 0 ? '#f4fdf4' : '#fff',
                                },
                              ]}>
                              <View style={styles.tableCellLarge}>
                                {item.image1}
                              </View>
                              <View style={styles.tableCellSmall}>
                                {item.button1}
                              </View>
                              <View style={styles.tableCellLarge}>
                                {item.image2}
                              </View>
                              <View style={styles.tableCellSmall}>
                                {item.button2}
                              </View>
                            </View>
                          ))}
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            ) : (
              <View>
                <View style={Thingsstyles.card}>
                  <View style={Thingsstyles.row}>
                    <View style={Thingsstyles.leftSection}>
                      <Image
                        source={require('../../assets/images/temperature.png')}
                        style={{
                          width: 70,
                          height: 100,
                          resizeMode: 'contain',
                        }}
                        resizeMode="contain"
                      />
                      <View>
                        <Text style={Thingsstyles.avgTempLabel}>
                          Avg. Temperature
                        </Text>
                        <Text style={Thingsstyles.avgTempValue}>
                          {thing_status && thing_status[0] < 0
                            ? '+++'
                            : thing_status && thing_status[0]}
                        </Text>
                        <View style={Thingsstyles.reqTempContainer}>
                          <Text style={Thingsstyles.reqTempLabel}>
                            Req-Temp-
                            {thing_status && thing_status[29]}
                          </Text>
                        </View>
                        <View>
                          <Text style={Thingsstyles.outsideTempLabel}>
                            Outside-Temp-
                            {thing_status && thing_status[5] < 0
                              ? '+++'
                              : thing_status && thing_status[5]}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={Thingsstyles.rightSection}>
                      <View style={Thingsstyles.tempColumn}>
                        <View>
                          <Text style={Thingsstyles.tempLabel}>Temp-1:</Text>
                          <Text style={Thingsstyles.tempValue}>
                            {thing_status && thing_status[1] < 0
                              ? '+++'
                              : thing_status && thing_status[1]}
                          </Text>
                        </View>
                        <View>
                          <Text style={Thingsstyles.tempLabel}>Temp-3:</Text>
                          <Text style={Thingsstyles.tempValue}>
                            {thing_status && thing_status[3] < 0
                              ? '+++'
                              : thing_status && thing_status[3]}
                          </Text>
                        </View>
                      </View>
                      <View style={Thingsstyles.tempColumn}>
                        <View>
                          <Text style={Thingsstyles.tempLabel}>Temp-2:</Text>
                          <Text style={Thingsstyles.tempValue}>
                            {thing_status && thing_status[2] < 0
                              ? '+++'
                              : thing_status && thing_status[2]}
                          </Text>
                        </View>
                        <View>
                          <Text style={Thingsstyles.tempLabel}>Temp-4:</Text>
                          <Text style={Thingsstyles.tempValue}>
                            {thing_status && thing_status[4] < 0
                              ? '+++'
                              : thing_status && thing_status[4]}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Thingsstyles.humidityContainer}>
                  <View style={Thingsstyles.humidityLeftSection}>
                    <Image
                      source={require('../../assets/images/humidity.png')}
                      style={Thingsstyles.humidityImage}
                    />
                    <View style={Thingsstyles.humidityTextContainer}>
                      <Text style={Thingsstyles.humidityLabel}>Humidity-</Text>
                      <Text style={Thingsstyles.humidityValue}>
                        {thing_status && thing_status[6] <= 0
                          ? '+++'
                          : thing_status && thing_status[6]}
                      </Text>
                    </View>
                  </View>
                  <View style={Thingsstyles.humidityRightSection}>
                    <View style={Thingsstyles.reqHumidityContainer}>
                      <Text style={Thingsstyles.reqHumidityLabel}>
                        Req Humidity-
                      </Text>
                      <Text style={Thingsstyles.reqHumidityValue}>
                        {thing_status && thing_status[30]}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={Thingsstyles.containerco2}>
                  <View style={Thingsstyles.cardco2}>
                    <View style={Thingsstyles.cardContent}>
                      <Image
                        source={require('../../assets/images/gas.png')}
                        style={{
                          width: 80,
                          height: 80,
                          resizeMode: 'contain',
                        }}
                      />
                      <View style={Thingsstyles.textContainer}>
                        <Text style={Thingsstyles.title}>CO2</Text>
                        <Text style={Thingsstyles.value}>
                          {thing_status && thing_status[7] <= 0
                            ? '+++'
                            : thing_status && thing_status[7]}
                          {thing_status &&
                            thing_status[7] &&
                            thing_status[7].unit}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={Thingsstyles.cardco2}>
                    <View style={Thingsstyles.cardContent}>
                      <Image
                        source={require('../../assets/images/nh3.png')}
                        style={{
                          width: 80,
                          height: 80,
                          resizeMode: 'contain',
                        }}
                      />
                      <View style={Thingsstyles.textContainer}>
                        <Text style={Thingsstyles.title}>NH3</Text>
                        <Text style={Thingsstyles.value}>
                          {' '}
                          {thing_status && thing_status[8] <= 0
                            ? '+++'
                            : thing_status && thing_status[8]}
                          {thing_status &&
                            thing_status[8] &&
                            thing_status[8].unit}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={Thingsstyles.ventContainer}>
                  <View style={Thingsstyles.ventContent}>
                    <View>
                      <Text style={Thingsstyles.ventText}>Minimum Vent</Text>
                      <Image
                        source={
                          thing_status && thing_status[43] == 1
                            ? require('../../assets/images/fan.gif')
                            : require('../../assets/images/fan5.png')
                        }
                        style={Thingsstyles.ventImage}
                      />
                    </View>
                    <View>
                      <Text
                        style={[Thingsstyles.ventText, {textAlign: 'center'}]}>
                        Maximum Vent
                      </Text>
                      <Image
                        source={
                          thing_status && thing_status[43] == 0
                            ? require('../../assets/images/fan.gif')
                            : require('../../assets/images/fan5.png')
                        }
                        style={Thingsstyles.ventImage}
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.container}>
                  {deviceList && deviceList.length > 0 && (
                    <View style={styles.tableBody}>
                      <View style={styles.tableContainer}>
                        {/* Table Header */}
                        <View style={styles.tableHeader}>
                          {tableData.map((item, index) => (
                            <View
                              key={index}
                              style={[
                                styles.tableHeaderCell,
                                {width: item.width},
                                index === 1 && styles.tableHeaderBorderRight,
                              ]}>
                              <Text style={styles.tableHeaderText}>
                                {item.headerName}
                              </Text>
                            </View>
                          ))}
                        </View>
                        {/* Table Rows */}
                        <View>
                          {deviceList.map((item, index) => (
                            <View
                              key={index}
                              style={[
                                styles.tableRow,
                                {
                                  backgroundColor:
                                    index % 2 !== 0 ? '#f4fdf4' : '#fff',
                                },
                              ]}>
                              <View style={styles.tableCellLarge}>
                                {item.image1}
                              </View>
                              <View style={styles.tableCellSmall}>
                                {item.button1}
                              </View>
                              <View style={styles.tableCellLarge}>
                                {item.image2}
                              </View>
                              <View style={styles.tableCellSmall}>
                                {item.button2}
                              </View>
                            </View>
                          ))}
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            )}
          </>
        ) : (
          <></>
        )}
        {SelecteItem.name === 'Device' ? (
          <Devices selectedItem={selectedItem} thingDetails={thingDetails} />
        ) : (
          <></>
        )}
        {SelecteItem.name === 'Flock' ? (
          <Flock selectedItem={selectedItem} thingDetails={thingDetails} />
        ) : (
          <></>
        )}
      </ScrollView>
      <Loader visible={loading} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
    width: '90%',
    alignSelf: 'center',
    marginBottom: '20%',
  },
  tableBody: {
    // Add styles specific to table body if needed
  },
  tableContainer: {
    borderRadius: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 0.2,
    borderBottomColor: 'gray',
    backgroundColor: 'green',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  tableHeaderCell: {
    paddingVertical: 15,
    display: 'flex',
    alignItems: 'center',
  },
  tableHeaderBorderRight: {
    borderRightWidth: 0.5,
    borderColor: '#fff',
  },
  tableHeaderText: {
    fontWeight: '700',
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  tableCellLarge: {
    width: '35%',
    display: 'flex',
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
  },
  tableCellSmall: {
    width: '15%',
    display: 'flex',
    alignItems: 'center',
    borderRightWidth: 0.5,
    height: 36,
    justifyContent: 'center',
  },
});

export default ThingsDetails;
