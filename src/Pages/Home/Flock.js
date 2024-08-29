import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const DataTable = [
  {headerName: 'Balance', width: '15%'},
  {headerName: 'cumm_mortality', width: '25%'},
  {headerName: 'Live_bird_weight', width: '30%'},
  {headerName: 'Mortality_percentage', width: '30%'},
];

const Flock = ({thingDetails, selectedItem}) => {
  console.log('Flock selectedItem', selectedItem);
  console.log('Flock thingDetails', thingDetails);

  // Check if thingDetails has the required structure and values
  const hasThingDetails =
    thingDetails && thingDetails.message && thingDetails.message.values;
  const item1 = hasThingDetails
    ? thingDetails.message
    : {curr_state: selectedItem?.thing_status};
  const values = hasThingDetails ? thingDetails.message.values : [];
  const {thing_status} = selectedItem || {};

  // Handle missing data by showing default text
  const displayText = (value, defaultText = 'N/A') =>
    value !== undefined && value !== null ? value : defaultText;

  const deviceList3 = [
    {
      image1: (
        <Text
          style={{
            fontSize: 10,
            fontWeight: 'bold',
            color: 'black',
            marginRight: '55%',
          }}>
          {displayText(hasThingDetails ? values[64] : thing_status?.[64])}
        </Text>
      ),
      button1: (
        <Text
          style={{
            fontSize: 10,
            fontWeight: 'bold',
            color: 'black',
            marginRight: '80%',
          }}>
          {displayText(hasThingDetails ? values[65] : thing_status?.[65])}
        </Text>
      ),
      ontime: (
        <Text
          style={{
            fontSize: 10,
            fontWeight: 'bold',
            color: 'black',
            marginRight: '70%',
          }}>
          {displayText(hasThingDetails ? values[66] : thing_status?.[66])}
        </Text>
      ),
      offtime: (
        <Text style={{fontSize: 10, fontWeight: 'bold', color: 'black'}}>
          {displayText(hasThingDetails ? values[67] : thing_status?.[67])}
        </Text>
      ),
    },
  ];

  // Check if there is no data in both thingDetails and selectedItem
  const noDataAvailable = !hasThingDetails && !thing_status;

  return (
    <View>
      {noDataAvailable ? (
        <Text style={styles.noDataText}>No data available</Text>
      ) : (
        <View style={styles.tableBody}>
          <View style={{borderRadius: 5}}>
            {/* Table Headers */}
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

            {/* Table Body */}
            <View>
              {deviceList3 &&
                deviceList3.length > 0 &&
                deviceList3.map((item, index) => (
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
                        width: '30%',
                        display: 'flex',
                        alignItems: 'center',
                        height: 36,
                        justifyContent: 'center',
                      }}>
                      {item.image1}
                    </View>
                    <View
                      style={{
                        width: '30%',
                        display: 'flex',
                        alignItems: 'center',
                        height: 36,
                        justifyContent: 'center',
                      }}>
                      {item.button1}
                    </View>
                    <View
                      style={{
                        width: '20%',
                        display: 'flex',
                        alignItems: 'center',
                        height: 36,
                        justifyContent: 'center',
                      }}>
                      {item.ontime}
                    </View>
                    <View
                      style={{
                        width: '20%',
                        display: 'flex',
                        alignItems: 'center',
                        height: 36,
                        justifyContent: 'center',
                      }}>
                      {item.offtime}
                    </View>
                  </View>
                ))}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tableBody: {
    borderWidth: 0.5,
    borderColor: 'green',
    borderRadius: 7,
    width: '100%',
    alignSelf: 'center',
    marginBottom: '10%',
  },
  noDataText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Flock;
