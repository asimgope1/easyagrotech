import {View, Text, DeviceStylesheet, Image, ScrollView} from 'react-native';
import React from 'react';
import {WHITE} from '../../constants/color';
import {HEIGHT} from '../../constants/config';
import {DeviceStyles} from './DeviceStyles';

const Devices = ({selectedItem, thingDetails}) => {
  console.log('Devices selectedItem', selectedItem);
  console.log('Devices thingDetails', thingDetails);
  const {thing_status, thing_schema} = selectedItem;
  const values = thingDetails?.message?.values || [];
  const schema = thingDetails?.message?.schema || [];
  console.log('val', values);
  const DataTable = [
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
        thing_status && thing_status[19] === 1 ? (
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
            source={require('../../assets/images/feed.png')}
            style={{height: 28, width: 28, marginLeft: 10, marginRight: 7}}
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
      button2:
        thing_status && thing_status[20] === 1 ? (
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
    // Add more items as needed
  ];

  const getFanImage = state => {
    switch (state) {
      case 1:
        return require('../../assets/images/fan.gif');
      case 2:
        return require('../../assets/images/fanorange.png');
      default:
        return require('../../assets/images/fan1.png');
    }
  };

  if (values.length > 0) {
    alert('New Readings');
  } else {
    alert('Old Readings');
  }
  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={DeviceStyles.scrollContainer}>
        <View style={DeviceStyles.container}>
          {values.length > 0 ? (
            <Text style={DeviceStyles.headerText}>
              Fan Mode: {values && values[21] === 1 ? 'AUTO' : 'MANUAL'}
            </Text>
          ) : (
            <Text style={DeviceStyles.headerText}>
              Fan Mode:{' '}
              {thing_status && thing_status[21] === 1 ? 'AUTO' : 'MANUAL'}
            </Text>
          )}
          {values.length > 0 ? (
            <View style={DeviceStyles.fanList}>
              {[9, 10, 11, 12, 13, 14].map((item, index) => {
                const stateIndex = item + 22;
                const fanState = values && values[item];
                const fanUnit =
                  schema && schema[stateIndex] && schema[stateIndex].unit;

                return (
                  <View key={index} style={DeviceStyles.fanCard}>
                    <View style={DeviceStyles.fanHeader}>
                      <Text style={DeviceStyles.fanTitle}>Fan {index + 1}</Text>
                      <Text style={DeviceStyles.fanStatus}>
                        {fanState}
                        {fanUnit}
                      </Text>
                    </View>
                    <Image
                      source={getFanImage(fanState)}
                      style={DeviceStyles.fanImage}
                    />
                  </View>
                );
              })}
            </View>
          ) : (
            <View style={DeviceStyles.fanList}>
              {[9, 10, 11, 12, 13, 14].map((item, index) => {
                const stateIndex = item + 22;
                const fanState = thing_status && thing_status[item];
                const fanUnit =
                  thing_schema &&
                  thing_schema[stateIndex] &&
                  thing_schema[stateIndex].unit;

                return (
                  <View key={index} style={DeviceStyles.fanCard}>
                    <View style={DeviceStyles.fanHeader}>
                      <Text style={DeviceStyles.fanTitle}>Fan {index + 1}</Text>
                      <Text style={DeviceStyles.fanStatus}>
                        {fanState}
                        {fanUnit}
                      </Text>
                    </View>
                    <Image
                      source={getFanImage(fanState)}
                      style={DeviceStyles.fanImage}
                    />
                  </View>
                );
              })}
            </View>
          )}

          <View style={DeviceStyles.sectionContainer}>
            <View style={DeviceStyles.sectionHeader}>
              <Image
                source={require('../../assets/images/cooling.png')}
                style={DeviceStyles.sectionImage}
              />
              <Text style={DeviceStyles.sectionTitle}>COOLING PAD</Text>
            </View>
            <View style={DeviceStyles.sectionContent}>
              {values.length > 0 ? (
                <Text style={DeviceStyles.sectionText}>
                  Mode: {values && values[22] === 1 ? 'AUTO' : 'MANUAL'}
                </Text>
              ) : (
                <Text style={DeviceStyles.sectionText}>
                  Mode:{' '}
                  {thing_status && thing_status[22] === 1 ? 'AUTO' : 'MANUAL'}
                </Text>
              )}
              <View>
                {values.length > 0 ? (
                  <Image
                    source={
                      values && values[16] === 1
                        ? require('../../assets/images/coolingpad.gif')
                        : require('../../assets/images/coolingfan.png')
                    }
                    style={DeviceStyles.sectionImage}
                  />
                ) : (
                  <Image
                    source={
                      thing_status && thing_status[16] === 1
                        ? require('../../assets/images/coolingpad.gif')
                        : require('../../assets/images/coolingfan.png')
                    }
                    style={DeviceStyles.sectionImage}
                  />
                )}
                {values.length > 0 ? (
                  <Text
                    style={[
                      DeviceStyles.sectionText,
                      {color: 'green', paddingLeft: 10},
                    ]}>
                    {values && values[16] === 1 ? 'ON' : 'OFF'}
                  </Text>
                ) : (
                  <Text
                    style={[
                      DeviceStyles.sectionText,
                      {color: 'green', paddingLeft: 10},
                    ]}>
                    {thing_status && thing_status[16] === 1 ? 'ON' : 'OFF'}
                  </Text>
                )}
              </View>
            </View>
            <View style={DeviceStyles.rowView}>
              <View style={DeviceStyles.statusContainer}>
                <Image
                  source={require('../../assets/images/temperature.png')}
                  style={DeviceStyles.statusImage}
                />
                {values.length > 0 ? (
                  <Text
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                    style={DeviceStyles.statusText}>
                    Req-Temp- {values && values[44]}
                    {schema && schema[44] && schema[44].unit}
                  </Text>
                ) : (
                  <Text
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                    style={DeviceStyles.statusText}>
                    Req-Temp- {thing_status && thing_status[44]}
                    {thing_schema && thing_schema[44] && thing_schema[44].unit}
                  </Text>
                )}
              </View>
              <View style={DeviceStyles.statusContainer}>
                <Image
                  source={require('../../assets/images/temperature.png')}
                  style={DeviceStyles.statusImage}
                />
                {values.length > 0 ? (
                  <Text
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                    style={DeviceStyles.statusText}>
                    Current Temp-{' '}
                    {values && values[25] < 0 ? '+++' : values[25]}
                    {schema && schema[25] && schema[25].unit}
                  </Text>
                ) : (
                  <Text
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                    style={DeviceStyles.statusText}>
                    Current Temp-{' '}
                    {thing_status && thing_status[25] < 0
                      ? '+++'
                      : thing_status[25]}
                    {thing_schema && thing_schema[25] && thing_schema[25].unit}
                  </Text>
                )}
              </View>
            </View>

            <View style={DeviceStyles.rowView}>
              <View style={DeviceStyles.statusContainer}>
                <Image
                  source={require('../../assets/images/humidity.png')}
                  style={DeviceStyles.statusImage}
                />
                {values.length > 0 ? (
                  <Text
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                    style={DeviceStyles.statusText}>
                    Req Humidity- {values && values[30]}
                    {schema && schema[30] && schema[30].unit}
                  </Text>
                ) : (
                  <Text
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                    style={DeviceStyles.statusText}>
                    Req Humidity- {thing_status && thing_status[30]}
                    {thing_schema && thing_schema[30] && thing_schema[30].unit}
                  </Text>
                )}
              </View>
              <View style={DeviceStyles.statusContainer}>
                <Image
                  source={require('../../assets/images/humidity.png')}
                  style={DeviceStyles.statusImage}
                />
                {values.length > 0 ? (
                  <Text
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                    style={DeviceStyles.statusText}>
                    Current Humidity-{' '}
                    {values && values[6] < 0 ? '+++' : values[6]}
                    {schema && schema[6] && schema[6].unit}
                  </Text>
                ) : (
                  <Text
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                    style={DeviceStyles.statusText}>
                    Current Humidity-{' '}
                    {thing_status && thing_status[6] < 0
                      ? '+++'
                      : thing_status[6]}
                    {thing_schema && thing_schema[6] && thing_schema[6].unit}
                  </Text>
                )}
              </View>
            </View>
          </View>

          <View style={DeviceStyles.sectionContainer}>
            <View style={DeviceStyles.sectionHeader}>
              <Image
                source={require('../../assets/images/crossvent1.png')}
                style={DeviceStyles.sectionImage}
              />
              <Text style={DeviceStyles.sectionTitle}>CROSS VENT</Text>
              <View style={DeviceStyles.statusContainer}>
                <Text style={DeviceStyles.sectionText}>Status:</Text>
                <Image
                  source={
                    thing_status && thing_status[18] === 1
                      ? require('../../assets/images/on.png')
                      : require('../../assets/images/off.png')
                  }
                  style={[DeviceStyles.statusImage, {marginLeft: 10}]}
                />
              </View>
            </View>
            <View style={DeviceStyles.rowView}>
              <View style={DeviceStyles.statusContainer}>
                <Image
                  source={require('../../assets/images/temperature.png')}
                  style={DeviceStyles.statusImage}
                />
                {values.length > 0 ? (
                  <Text style={DeviceStyles.statusText}>
                    Req-Temp- {values && values[29]}
                    {schema && schema[29] && schema[29].unit}
                  </Text>
                ) : (
                  <Text style={DeviceStyles.statusText}>
                    Req-Temp- {thing_status && thing_status[29]}
                    {thing_schema && thing_schema[29] && thing_schema[29].unit}
                  </Text>
                )}
              </View>
              <View style={DeviceStyles.statusContainer}>
                <Image
                  source={require('../../assets/images/temperature.png')}
                  style={DeviceStyles.statusImage}
                />
                {values.length > 0 ? (
                  <Text style={DeviceStyles.statusText}>
                    Current Temp-{' '}
                    {values && values[27] < 0 ? '+++' : values[27]}
                    {schema && schema[27] && schema[27].unit}
                  </Text>
                ) : (
                  <Text style={DeviceStyles.statusText}>
                    Current Temp-{' '}
                    {thing_status && thing_status[27] < 0
                      ? '+++'
                      : thing_status[27]}
                    {thing_schema && thing_schema[27] && thing_schema[27].unit}
                  </Text>
                )}
              </View>
            </View>

            <View style={DeviceStyles.rowView}>
              <View style={DeviceStyles.statusContainer}>
                <Image
                  source={require('../../assets/images/gas.png')}
                  style={DeviceStyles.statusImage}
                />
                {values.length > 0 ? (
                  <Text style={DeviceStyles.statusText}>
                    Req CO2- {values && values[39]}
                    {schema && schema[39] && schema[39].unit}
                  </Text>
                ) : (
                  <Text style={DeviceStyles.statusText}>
                    Req CO2- {thing_status && thing_status[39]}
                    {thing_schema && thing_schema[39] && thing_schema[39].unit}
                  </Text>
                )}
              </View>
              <View style={DeviceStyles.statusContainer}>
                <Image
                  source={require('../../assets/images/gas.png')}
                  style={DeviceStyles.statusImage}
                />
                {values.length > 0 ? (
                  <Text style={DeviceStyles.statusText}>
                    Curr CO2- {values && values[7] <= 0 ? '+++' : values[7]}
                    {schema && schema[7] && schema[7].unit}
                  </Text>
                ) : (
                  <Text style={DeviceStyles.statusText}>
                    Curr CO2-{' '}
                    {thing_status && thing_status[7] <= 0
                      ? '+++'
                      : thing_status[7]}
                    {thing_schema && thing_schema[7] && thing_schema[7].unit}
                  </Text>
                )}
              </View>
            </View>
            <View style={DeviceStyles.rowView}>
              <View style={DeviceStyles.statusContainer}>
                <Image
                  source={require('../../assets/images/nh3.png')}
                  style={DeviceStyles.statusImage}
                />
                {values.length > 0 ? (
                  <Text style={DeviceStyles.statusText}>
                    Req NH3- {values && values[40]}
                    {schema && schema[40] && schema[40].unit}
                  </Text>
                ) : (
                  <Text style={DeviceStyles.statusText}>
                    Req NH3- {thing_status && thing_status[40]}
                    {thing_schema && thing_schema[40] && thing_schema[40].unit}
                  </Text>
                )}
              </View>
              <View style={DeviceStyles.statusContainer}>
                <Image
                  source={require('../../assets/images/nh3.png')}
                  style={DeviceStyles.statusImage}
                />
                {values.length > 0 ? (
                  <Text style={DeviceStyles.statusText}>
                    Curr NH3- {values && values[8] <= 0 ? '+++' : values[8]}
                    {schema && schema[8] && schema[8].unit}
                  </Text>
                ) : (
                  <Text style={DeviceStyles.statusText}>
                    Curr NH3-{' '}
                    {thing_status && thing_status[8] <= 0
                      ? '+++'
                      : thing_status[8]}
                    {thing_schema && thing_schema[8] && thing_schema[8].unit}
                  </Text>
                )}
              </View>
            </View>
          </View>

          <View style={DeviceStyles.sectionContainer}>
            <View style={DeviceStyles.sectionHeader}>
              <Image
                source={require('../../assets/images/tunnel.png')}
                style={DeviceStyles.sectionImage}
              />
              <Text style={DeviceStyles.sectionTitle}>TUNNEL INLET</Text>
              <View style={DeviceStyles.statusContainer}>
                <Text style={DeviceStyles.statusText}>Status:</Text>
                <Image
                  source={
                    thing_status && thing_status[17] == 1
                      ? require('../../assets/images/on.png')
                      : require('../../assets/images/off.png')
                  }
                  style={[DeviceStyles.statusImage, {marginLeft: 10}]}
                />
              </View>
            </View>

            <View style={DeviceStyles.sectionContent}>
              <View style={DeviceStyles.statusContainer}>
                <Image
                  source={require('../../assets/images/temperature.png')}
                  style={DeviceStyles.statusImage}
                />
                {values.length > 0 ? (
                  <Text style={DeviceStyles.sectionText}>
                    Req-Temp-
                    {values && values[29]}
                    {schema && schema[29] && schema[29].unit}
                  </Text>
                ) : (
                  <Text style={DeviceStyles.sectionText}>
                    Req-Temp-
                    {thing_status && thing_status[29]}
                    {thing_schema && thing_schema[29] && thing_schema[29].unit}
                  </Text>
                )}
              </View>
              <View style={DeviceStyles.statusContainer}>
                <Image
                  source={require('../../assets/images/temperature.png')}
                  style={DeviceStyles.statusImage}
                />
                {values.length > 0 ? (
                  <Text style={DeviceStyles.sectionText}>
                    Current Temp-
                    {values && values[26] < 0 ? '+++' : values[26]}
                    {schema && schema[26] && schema[26].unit}
                  </Text>
                ) : (
                  <Text style={DeviceStyles.sectionText}>
                    Current Temp-
                    {thing_status && thing_status[26] < 0
                      ? '+++'
                      : thing_status[26]}
                    {thing_schema && thing_schema[26] && thing_schema[26].unit}
                  </Text>
                )}
              </View>
            </View>

            <View style={DeviceStyles.sectionContent}>
              <View style={DeviceStyles.statusContainer}>
                <Image
                  source={require('../../assets/images/gas.png')}
                  style={DeviceStyles.statusImage}
                />
                {values.length > 0 ? (
                  <Text style={DeviceStyles.sectionText}>
                    Req CO2-
                    {values && values[37]}
                    {schema && schema[37] && schema[37].unit}
                  </Text>
                ) : (
                  <Text style={DeviceStyles.sectionText}>
                    Req CO2-
                    {thing_status && thing_status[37]}
                    {thing_schema && thing_schema[37] && thing_schema[37].unit}
                  </Text>
                )}
              </View>
              <View style={DeviceStyles.statusContainer}>
                <Image
                  source={require('../../assets/images/gas.png')}
                  style={DeviceStyles.statusImage}
                />
                {values.length > 0 ? (
                  <Text style={DeviceStyles.sectionText}>
                    Curr CO2-
                    {values && values[7] <= 0 ? '+++' : values[7]}
                    {schema && schema[7] && schema[7].unit}
                  </Text>
                ) : (
                  <Text style={DeviceStyles.sectionText}>
                    Curr CO2-
                    {thing_status && thing_status[7] <= 0
                      ? '+++'
                      : thing_status[7]}
                    {thing_schema && thing_schema[7] && thing_schema[7].unit}
                  </Text>
                )}
              </View>
            </View>

            <View style={DeviceStyles.sectionContent}>
              <View style={DeviceStyles.statusContainer}>
                <Image
                  source={require('../../assets/images/nh3.png')}
                  style={DeviceStyles.statusImage}
                />
                {values.length > 0 ? (
                  <Text style={DeviceStyles.sectionText}>
                    Req NH3-
                    {values && values[38]}
                    {schema && schema[38] && schema[38].unit}
                  </Text>
                ) : (
                  <Text style={DeviceStyles.sectionText}>
                    Req NH3-
                    {thing_status && thing_status[38]}
                    {thing_schema && thing_schema[38] && thing_schema[38].unit}
                  </Text>
                )}
              </View>
              <View style={DeviceStyles.statusContainer}>
                <Image
                  source={require('../../assets/images/nh3.png')}
                  style={DeviceStyles.statusImage}
                />
                {values.length > 0 ? (
                  <Text style={DeviceStyles.sectionText}>
                    Curr NH3-
                    {values && values[8] <= 0 ? '+++' : values[8]}
                    {schema && schema[8] && schema[8].unit}
                  </Text>
                ) : (
                  <Text style={DeviceStyles.sectionText}>
                    Curr NH3-
                    {thing_status && thing_status[8] <= 0
                      ? '+++'
                      : thing_status[8]}
                    {thing_schema && thing_schema[8] && thing_schema[8].unit}
                  </Text>
                )}
              </View>
            </View>
          </View>

          <View style={DeviceStyles.sectionContainer}>
            <View style={DeviceStyles.sectionHeader}>
              <Image
                source={require('../../assets/images/fogg.png')}
                style={DeviceStyles.sectionImage}
              />
              <Text style={DeviceStyles.sectionTitle}>FOG</Text>
              <View style={DeviceStyles.statusContainer}>
                <Text style={DeviceStyles.sectionText}>Status:</Text>
                <Image
                  source={
                    thing_status && thing_status[46] === 1
                      ? require('../../assets/images/on.png')
                      : require('../../assets/images/off.png')
                  }
                  style={[DeviceStyles.statusImage, {marginLeft: 10}]}
                />
              </View>
            </View>
            <View style={DeviceStyles.rowView}>
              <View style={DeviceStyles.statusContainer}>
                <Image
                  source={require('../../assets/images/temperature.png')}
                  style={DeviceStyles.statusImage}
                />
                {values.length > 0 ? (
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={DeviceStyles.statusText}>
                    Req-Temp: {values && values[45]}
                    {schema && schema[45] && schema[45].unit}
                  </Text>
                ) : (
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={DeviceStyles.statusText}>
                    Req-Temp: {thing_status && thing_status[45]}
                    {thing_schema && thing_schema[45] && thing_schema[45].unit}
                  </Text>
                )}
              </View>
              <View style={DeviceStyles.statusContainer}>
                <Image
                  source={require('../../assets/images/temperature.png')}
                  style={DeviceStyles.statusImage}
                />
                {values.length > 0 ? (
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={DeviceStyles.statusText}>
                    Current Temp:{' '}
                    {values && values[47] < 0 ? '+++' : values[47]}
                    {schema && schema[47] && schema[47].unit}
                  </Text>
                ) : (
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={DeviceStyles.statusText}>
                    Current Temp:{' '}
                    {thing_status && thing_status[47] < 0
                      ? '+++'
                      : thing_status[47]}
                    {thing_schema && thing_schema[47] && thing_schema[47].unit}
                  </Text>
                )}
              </View>
            </View>

            <View style={DeviceStyles.rowView}>
              <View style={DeviceStyles.statusContainer}>
                <Image
                  source={require('../../assets/images/humidity.png')}
                  style={DeviceStyles.statusImage}
                />
                {values.length > 0 ? (
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={DeviceStyles.statusText}>
                    Req Humidity: {values && values[30]}
                    {schema && schema[30] && schema[30].unit}
                  </Text>
                ) : (
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={DeviceStyles.statusText}>
                    Req Humidity: {thing_status && thing_status[30]}
                    {thing_schema && thing_schema[30] && thing_schema[30].unit}
                  </Text>
                )}
              </View>
              <View style={DeviceStyles.statusContainer}>
                <Image
                  source={require('../../assets/images/humidity.png')}
                  style={DeviceStyles.statusImage}
                />
                {values.length > 0 ? (
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={DeviceStyles.statusText}>
                    Current Humidity:{' '}
                    {values && values[6] < 0 ? '+++' : values[6]}
                    {schema && schema[6] && schema[6].unit}
                  </Text>
                ) : (
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={DeviceStyles.statusText}>
                    Current Humidity:{' '}
                    {thing_status && thing_status[6] < 0
                      ? '+++'
                      : thing_status[6]}
                    {thing_schema && thing_schema[6] && thing_schema[6].unit}
                  </Text>
                )}
              </View>
            </View>
          </View>

          <View style={DeviceStyles.sectionContainer}>
            <View style={DeviceStyles.sectionHeader}>
              <Image
                source={require('../../assets/images/alaram.png')}
                style={DeviceStyles.sectionImage}
              />
              <Text style={DeviceStyles.sectionTitle}>ALARM</Text>
              <View style={DeviceStyles.statusContainer}>
                <Image
                  source={
                    thing_status && thing_status[52] === 1
                      ? require('../../assets/images/on.png')
                      : require('../../assets/images/off.png')
                  }
                  style={[DeviceStyles.statusImage, {marginLeft: 10}]}
                />
              </View>
            </View>

            <View style={DeviceStyles.rowView}>
              <View style={DeviceStyles.statusContainer}>
                <Image
                  source={require('../../assets/images/temperature.png')}
                  style={DeviceStyles.statusImage}
                />
                {values.length > 0 ? (
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={DeviceStyles.statusText}>
                    High Temp- {values && values[48]}
                    {schema && schema[48] && schema[48].unit}
                  </Text>
                ) : (
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={DeviceStyles.statusText}>
                    High Temp- {thing_status && thing_status[48]}
                    {thing_schema && thing_schema[48] && thing_schema[48].unit}
                  </Text>
                )}
              </View>
              <View style={DeviceStyles.statusContainer}>
                <Image
                  source={require('../../assets/images/temperature.png')}
                  style={DeviceStyles.statusImage}
                />
                {values.length > 0 ? (
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={DeviceStyles.statusText}>
                    Low Temp- {values && values[49]}
                    {schema && schema[49] && schema[49].unit}
                  </Text>
                ) : (
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={DeviceStyles.statusText}>
                    Low Temp- {thing_status && thing_status[49]}
                    {thing_schema && thing_schema[49] && thing_schema[49].unit}
                  </Text>
                )}
              </View>
            </View>

            <View style={DeviceStyles.rowView}>
              <View style={DeviceStyles.statusContainer}>
                <Image
                  source={require('../../assets/images/humidity.png')}
                  style={DeviceStyles.statusImage}
                />
                {values.length > 0 ? (
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={DeviceStyles.statusText}>
                    High Humidity- {values && values[50]}
                    {schema && schema[50] && schema[50].unit}
                  </Text>
                ) : (
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={DeviceStyles.statusText}>
                    High Humidity- {thing_status && thing_status[50]}
                    {thing_schema && thing_schema[50] && thing_schema[50].unit}
                  </Text>
                )}
              </View>
              <View style={DeviceStyles.statusContainer}>
                <Image
                  source={require('../../assets/images/humidity.png')}
                  style={DeviceStyles.statusImage}
                />
                {values.length > 0 ? (
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={DeviceStyles.statusText}>
                    Low Humidity- {values && values[51]}
                    {schema && schema[51] && schema[51].unit}
                  </Text>
                ) : (
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={DeviceStyles.statusText}>
                    Low Humidity- {thing_status && thing_status[51]}
                    {thing_schema && thing_schema[51] && thing_schema[51].unit}
                  </Text>
                )}
              </View>
            </View>
          </View>

          <View style={DeviceStyles.tableBody}>
            <View style={{borderRadius: 5}}>
              <View
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 0.2,
                  borderBottomColor: 'gray',
                  backgroundColor: 'green',
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                }}>
                {DataTable.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      width: item.width,
                      paddingVertical: 5,
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontWeight: '700',
                        fontSize: 12,
                        color: '#fff',
                        textAlign: 'center',
                      }}>
                      {item.headerName}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            <View>
              {deviceList &&
                deviceList.length > 0 &&
                deviceList.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      backgroundColor: index % 2 !== 0 ? '#f4fdf4' : '#fff',
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '35%',
                        display: 'flex',
                        alignItems: 'center',
                        height: 36,
                        justifyContent: 'center',
                      }}>
                      {item.image1}
                    </View>
                    <View
                      style={{
                        width: '15%',
                        display: 'flex',
                        alignItems: 'center',
                        borderRightWidth: 0.5,
                        height: 36,
                        justifyContent: 'center',
                      }}>
                      {item.button1}
                    </View>
                    <View
                      style={{
                        width: '35%',
                        display: 'flex',
                        alignItems: 'center',
                        height: 36,
                        justifyContent: 'center',
                      }}>
                      {item.image2}
                    </View>
                    <View
                      style={{
                        width: '15%',
                        display: 'flex',
                        alignItems: 'center',
                        height: 36,
                        justifyContent: 'center',
                      }}>
                      {item.button2}
                    </View>
                  </View>
                ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Devices;
