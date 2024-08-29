import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import React, {Component} from 'react';
import ColorChangingBox from '../../common/ColorChangingBox';

import {HEIGHT} from '../../lib/Constant';

// const DataTable = [{ headerName: "DEVICE", width: "30%" },
// { headerName: "DATA", width: "30%" }, { headerName: "ONN TIME", width: "20%" }, { headerName: "OFF TIME", width: "20%" }
// ]
const DataTable = [
  {headerName: 'DESCRIPTION', width: '30%'},
  {headerName: 'VALUE', width: '20%'},
  {headerName: 'DESCRIPTION', width: '30%'},
  {headerName: 'VALUE', width: '20%'},
];

const deviceList3 = [
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
          source={require('../../Images/feedmeter.png')}
          style={{height: 28, width: 28, marginLeft: 1}}
        />
        <Text
          style={{
            fontSize: 10,
            fontWeight: 'bold',
            color: 'black',
            paddingLeft: 5,
          }}>
          Water Meter
        </Text>
      </View>
    ),
    button1: <ColorChangingBox />,
    ontime: (
      <Text style={{fontSize: 10, fontWeight: 'bold', color: 'black'}}>
        4:30
      </Text>
    ),
    offtime: (
      <Text style={{fontSize: 10, fontWeight: 'bold', color: 'black'}}>
        8:0
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
          source={require('../../Images/foodmeter.png')}
          style={{height: 28, width: 28}}
        />
        <Text
          style={{
            fontSize: 10,
            fontWeight: 'bold',
            color: 'black',
            paddingLeft: 8,
          }}>
          Food Flow
        </Text>
      </View>
    ),
    button1: <ColorChangingBox />,
    ontime: (
      <Text style={{fontSize: 10, fontWeight: 'bold', color: 'black'}}>
        3:55
      </Text>
    ),
    offtime: (
      <Text style={{fontSize: 10, fontWeight: 'bold', color: 'black'}}>
        2:01
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
          source={require('../../Images/bulb.png')}
          style={{height: 28, width: 28}}
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
    button1: (
      <Image
        source={require('../../Images/on.png')}
        style={{height: 28, width: 28}}
      />
    ),
    ontime: (
      <Text style={{fontSize: 10, fontWeight: 'bold', color: 'black'}}>
        6:30
      </Text>
    ),
    offtime: (
      <Text style={{fontSize: 10, fontWeight: 'bold', color: 'black'}}>
        7:0
      </Text>
    ),
  },
];

export default class Devices extends Component {
  render() {
    var Item;
    console.log(
      'this.props.thing_details.curr_state',
      this.props?.thing_details,
    );
    this.props?.thing_details?.length > 0 &&
      this.props?.thing_details?.map((item, index) => {
        Item = item;
      });
    console.log('item', Item);

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
              source={require('../../Images/light.png')}
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
          this.props.thing_details?.curr_state &&
          this.props.thing_details.curr_state[19] == 1 ? (
            <Image
              source={require('../../Images/on.png')}
              style={{height: 30, width: 30}}
            />
          ) : (
            <Image
              source={require('../../Images/off.png')}
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
              source={require('../../Images/feed.png')}
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
        button2:
          this.props.thing_details?.curr_state &&
          this.props.thing_details.curr_state[20] == 1 ? (
            <Image
              source={require('../../Images/on.png')}
              style={{height: 30, width: 30}}
            />
          ) : (
            <Image
              source={require('../../Images/off.png')}
              style={{height: 30, width: 30}}
            />
          ),
      },
    ];
    console.log('thing_details:', this.props?.thing_details);
    console.log('Type of thing_details:', typeof this.props?.thing_details);
    console.log('Length of thing_details:', this.props?.thing_details?.length);
    const isEmpty = Object.keys(this.props?.thing_details).length === 0;
    if (isEmpty) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No data available</Text>
        </View>
      );
    }

    return (
      <ScrollView>
        <View>
          <View style={{width: '90%', alignSelf: 'center', marginBottom: 10}}>
            <Text
              style={{
                marginBottom: 10,
                fontWeight: '600',
                fontSize: 17,
                color: '#000',
              }}>
              Fan Mode :
              {this.props.thing_details.curr_state &&
              this.props.thing_details.curr_state[21] == 1
                ? 'AUTO'
                : 'MANUAL'}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              {[9, 10, 11, 12, 13, 14].map((item, index) => {
                const stateIndex = item + 22;
                return (
                  <View
                    key={index}
                    style={{
                      width: '30%',
                      backgroundColor: '#fff',
                      borderRadius: 7,
                      padding: 10,
                      elevation: 3,
                      marginBottom: 10,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '500',
                          color: '#000',
                        }}>
                        Fan {index + 1}
                      </Text>

                      <Text style={{fontSize: 14, fontWeight: '400'}}>
                        {this.props.thing_details.curr_state &&
                          this.props.thing_details.curr_state[stateIndex]}
                        {this.props.thing_details.thing_schema &&
                          this.props.thing_details.thing_schema[stateIndex] &&
                          this.props.thing_details.thing_schema[stateIndex]
                            .unit}
                      </Text>
                    </View>
                    {this.props.thing_details.curr_state &&
                    this.props.thing_details.curr_state[item] === 1 ? (
                      <Image
                        source={require('../../Images/fan.gif')}
                        style={{
                          height: 50,
                          width: 50,
                          marginTop: 12,
                          marginBottom: 3,
                        }}
                      />
                    ) : this.props.thing_details.curr_state &&
                      this.props.thing_details.curr_state[item] === 2 ? (
                      <Image
                        source={require('../../Images/fanorange.png')}
                        style={{
                          height: 50,
                          width: 50,
                          marginTop: 5,
                          marginBottom: 3,
                        }}
                      />
                    ) : (
                      <Image
                        source={require('../../Images/fan1.png')}
                        style={{
                          height: 50,
                          width: 50,
                          marginTop: 5,
                          marginBottom: 3,
                        }}
                      />
                    )}
                  </View>
                );
              })}
            </View>
          </View>

          <View
            style={{
              borderRadius: 15,
              height: HEIGHT / 1.85,
              width: '90%',
              alignSelf: 'center',
            }}>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: '#fff',
                height: '45%',
                width: '100%',
                alignSelf: 'center',
                shadowColor: '#000000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.9,
                shadowRadius: 3,
                elevation: 3,
                display: 'flex',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  margin: 10,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: 30,
                  }}>
                  <Image
                    source={require('../../Images/cooling.png')}
                    style={{height: 50, width: 50}}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: 'black',
                      marginTop: 15,
                      marginLeft: 5,
                    }}>
                    COOLING PAD{' '}
                  </Text>
                </View>
                <View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    {this.props.thing_details.curr_state &&
                    this.props.thing_details.curr_state[22] == 1 ? (
                      <Text>Mode : AUTO</Text>
                    ) : (
                      <Text>Mode : MANUAL</Text>
                    )}
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    {this.props.thing_details.curr_state &&
                    this.props.thing_details.curr_state[16] == 1 ? (
                      <Image
                        source={require('../../Images/coolingpad.gif')}
                        style={{height: 50, width: 50, marginRight: 7}}
                      />
                    ) : (
                      <Image
                        source={require('../../Images/coolingfan.png')}
                        style={{height: 50, width: 50, marginRight: 7}}
                      />
                    )}

                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: 'black',
                        marginTop: 15,
                        color: 'green',
                      }}>
                      {this.props.thing_details.curr_state &&
                      this.props.thing_details.curr_state[16] == 1
                        ? 'ON'
                        : 'OFF'}{' '}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  margin: 8,
                }}>
                <View
                  style={{
                    borderRadius: 10,
                    width: '40%',
                    height: 30,
                    backgroundColor: '#f4fdf4',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Image
                    source={require('../../Images/temperature.png')}
                    style={{height: 20, width: 20, marginTop: 4}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingTop: 4,
                    }}>
                    Req-Temp-
                    {this.props.thing_details.curr_state &&
                      this.props.thing_details.curr_state[44]}
                    {this.props.thing_details.thing_schema &&
                      this.props.thing_details.thing_schema[44] &&
                      this.props.thing_details.thing_schema[44].unit}
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: 10,
                    width: '40%',
                    height: '100%',
                    backgroundColor: '#f4fdf4',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Image
                    source={require('../../Images/temperature.png')}
                    style={{height: 20, width: 20, marginTop: 4}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingTop: 4,
                    }}>
                    Current Temp-
                    {this.props?.thing_details.curr_state &&
                    this.props?.thing_details.curr_state[25] < 0
                      ? '+++'
                      : this?.props?.thing_details.curr_state[25]}
                    {this?.props?.thing_details.thing_schema &&
                      this?.props?.thing_details.thing_schema[25] &&
                      this?.props?.thing_details.thing_schema[25].unit}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  margin: 8,
                }}>
                <View
                  style={{
                    borderRadius: 10,
                    width: '40%',
                    height: 30,
                    backgroundColor: '#f4fdf4',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Image
                    source={require('../../Images/humidity.png')}
                    style={{height: 20, width: 20, marginTop: 4}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingTop: 4,
                    }}>
                    Req Humidity-{' '}
                    {this.props.thing_details.curr_state &&
                      this.props.thing_details.curr_state[30]}
                    {this.props.thing_details.thing_schema &&
                      this.props.thing_details.thing_schema[30] &&
                      this.props.thing_details.thing_schema[30].unit}
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: 10,
                    width: '40%',
                    height: '100%',
                    backgroundColor: '#f4fdf4',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Image
                    source={require('../../Images/humidity.png')}
                    style={{height: 20, width: 20, marginTop: 4}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingTop: 4,
                    }}>
                    Current Humidity-{' '}
                    {this.props.thing_details.curr_state &&
                    this.props.thing_details.curr_state[6] < 0
                      ? '+++'
                      : this.props.thing_details.curr_state[6]}
                    {this.props.thing_details.thing_schema &&
                      this.props.thing_details.thing_schema[6] &&
                      this.props.thing_details.thing_schema[6].unit}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                borderRadius: 10,
                backgroundColor: '#fff',
                height: '50%',
                width: '100%',
                alignSelf: 'center',
                shadowColor: '#000000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.9,
                shadowRadius: 3,
                elevation: 3,
                display: 'flex',
                marginTop: 10,
                // justifyContent: "center"
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  margin: 10,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: 30,
                  }}>
                  <Image
                    source={require('../../Images/crossvent1.png')}
                    style={{height: 50, width: 50}}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: 'black',
                      marginTop: 15,
                      marginLeft: 5,
                    }}>
                    CROSS VENT
                  </Text>
                </View>
                <View>
                  {/* <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                                {
                                   this.props.thing_details.curr_state && this.props.thing_details.curr_state[21]==1 ?
                                        <Text style={{ fontWeight: "600", color: "gray" }}>Mode : AUTO</Text> : <Text style={{ fontWeight: "600", color: "gray" }}>Mode : MANUAL</Text>
                                }
                            </View> */}
                  <View
                    style={{
                      width: '40%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      marginLeft: 50,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: 'black',
                        paddingTop: 4,
                      }}>
                      Status:
                    </Text>

                    <Image
                      source={
                        this.props.thing_details.curr_state &&
                        this.props.thing_details.curr_state[18] == 1
                          ? require('../../Images/on.png')
                          : require('../../Images/off.png')
                      }
                      style={{
                        height: 20,
                        width: 28,
                        marginTop: 4,
                        marginLeft: 15,
                      }}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  margin: 8,
                }}>
                <View
                  style={{
                    borderRadius: 10,
                    width: '40%',
                    height: 30,
                    backgroundColor: '#f4fdf4',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Image
                    source={require('../../Images/temperature.png')}
                    style={{height: 20, width: 20, marginTop: 4}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingTop: 4,
                    }}>
                    Req-Temp-
                    {this.props.thing_details.curr_state &&
                      this.props.thing_details.curr_state[29]}
                    {this.props.thing_details.thing_schema &&
                      this.props.thing_details.thing_schema[29] &&
                      this.props.thing_details.thing_schema[29].unit}
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: 10,
                    width: '40%',
                    height: '100%',
                    backgroundColor: '#f4fdf4',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Image
                    source={require('../../Images/temperature.png')}
                    style={{height: 20, width: 20, marginTop: 4}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingTop: 4,
                    }}>
                    Current Temp-
                    {this.props.thing_details.curr_state &&
                    this.props.thing_details.curr_state[27] < 0
                      ? '+++'
                      : this.props.thing_details.curr_state[27]}
                    {this.props.thing_details.thing_schema &&
                      this.props.thing_details.thing_schema[27] &&
                      this.props.thing_details.thing_schema[27].unit}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  margin: 2,
                }}>
                <View
                  style={{
                    borderRadius: 10,
                    width: '40%',
                    height: 30,
                    backgroundColor: '#f4fdf4',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Image
                    source={require('../../Images/gas.png')}
                    style={{height: 20, width: 20, marginTop: 4}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingTop: 4,
                    }}>
                    Req CO2-
                    {this.props.thing_details.curr_state &&
                      this.props.thing_details.curr_state[39]}
                    {this.props.thing_details.thing_schema &&
                      this.props.thing_details.thing_schema[39] &&
                      this.props.thing_details.thing_schema[39].unit}
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: 10,
                    width: '40%',
                    height: '100%',
                    backgroundColor: '#f4fdf4',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Image
                    source={require('../../Images/gas.png')}
                    style={{height: 20, width: 20, marginTop: 4}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingTop: 4,
                    }}>
                    Curr CO2-
                    {this.props.thing_details.curr_state &&
                    this.props.thing_details.curr_state[7] <= 0
                      ? '+++'
                      : this.props.thing_details.curr_state[7]}
                    {this.props.thing_details.thing_schema &&
                      this.props.thing_details.thing_schema[7] &&
                      this.props.thing_details.thing_schema[7].unit}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  margin: 8,
                }}>
                <View
                  style={{
                    borderRadius: 10,
                    width: '40%',
                    height: 30,
                    backgroundColor: '#f4fdf4',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Image
                    source={require('../../Images/nh3.png')}
                    style={{height: 20, width: 20, marginTop: 4}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingTop: 4,
                    }}>
                    Req NH3-
                    {this.props.thing_details.curr_state &&
                      this.props.thing_details.curr_state[40]}
                    {this.props.thing_details.thing_schema &&
                      this.props.thing_details.thing_schema[40] &&
                      this.props.thing_details.thing_schema[40].unit}
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: 10,
                    width: '40%',
                    height: '100%',
                    backgroundColor: '#f4fdf4',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Image
                    source={require('../../Images/nh3.png')}
                    style={{height: 20, width: 20, marginTop: 4}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingTop: 4,
                    }}>
                    Curr NH3-
                    {this.props.thing_details.curr_state &&
                    this.props.thing_details.curr_state[8] <= 0
                      ? '+++'
                      : this.props.thing_details.curr_state[8]}
                    {this.props.thing_details.thing_schema &&
                      this.props.thing_details.thing_schema[8] &&
                      this.props.thing_details.thing_schema[8].unit}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: '#fff',
                height: '50%',
                width: '100%',
                alignSelf: 'center',
                shadowColor: '#000000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.9,
                shadowRadius: 3,
                elevation: 3,
                display: 'flex',
                marginTop: 12,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  margin: 10,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: 30,
                  }}>
                  <Image
                    source={require('../../Images/tunnel.png')}
                    style={{height: 50, width: 50}}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: 'black',
                      marginTop: 15,
                      marginLeft: 5,
                    }}>
                    TUNNEL INLET
                  </Text>
                </View>
                <View>
                  {/* <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                                {
                                   this.props.thing_details.curr_state && this.props.thing_details.curr_state[21]==1?
                                        <Text style={{ fontWeight: "600", color: "gray" }}>Mode : AUTO</Text> : <Text style={{ fontWeight: "600", color: "gray" }}>Mode : MANUAL</Text>
                                }
                            </View> */}
                  <View
                    style={{
                      width: '40%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      marginLeft: 50,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: 'black',
                        paddingTop: 4,
                      }}>
                      Status:
                    </Text>
                    <Image
                      source={
                        this.props.thing_details.curr_state &&
                        this.props.thing_details.curr_state[17] == 1
                          ? require('../../Images/on.png')
                          : require('../../Images/off.png')
                      }
                      style={{
                        height: 20,
                        width: 28,
                        marginTop: 4,
                        marginLeft: 15,
                      }}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  margin: 8,
                }}>
                <View
                  style={{
                    borderRadius: 10,
                    width: '40%',
                    height: 30,
                    backgroundColor: '#f4fdf4',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Image
                    source={require('../../Images/temperature.png')}
                    style={{height: 20, width: 20, marginTop: 4}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingTop: 4,
                    }}>
                    Req-Temp-
                    {this.props.thing_details.curr_state &&
                      this.props.thing_details.curr_state[29]}
                    {this.props.thing_details.thing_schema &&
                      this.props.thing_details.thing_schema[29] &&
                      this.props.thing_details.thing_schema[29].unit}
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: 10,
                    width: '40%',
                    height: '100%',
                    backgroundColor: '#f4fdf4',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Image
                    source={require('../../Images/temperature.png')}
                    style={{height: 20, width: 20, marginTop: 4}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingTop: 4,
                    }}>
                    Current Temp-
                    {this.props.thing_details.curr_state &&
                    this.props.thing_details.curr_state[26] < 0
                      ? '+++'
                      : this.props.thing_details.curr_state[26]}
                    {this.props.thing_details.thing_schema &&
                      this.props.thing_details.thing_schema[26] &&
                      this.props.thing_details.thing_schema[26].unit}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  margin: 2,
                }}>
                <View
                  style={{
                    borderRadius: 10,
                    width: '40%',
                    height: 30,
                    backgroundColor: '#f4fdf4',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Image
                    source={require('../../Images/gas.png')}
                    style={{height: 20, width: 20, marginTop: 4}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingTop: 4,
                    }}>
                    Req CO2-
                    {this.props.thing_details.curr_state &&
                      this.props.thing_details.curr_state[37]}
                    {this.props.thing_details.thing_schema &&
                      this.props.thing_details.thing_schema[37] &&
                      this.props.thing_details.thing_schema[37].unit}
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: 10,
                    width: '40%',
                    height: '100%',
                    backgroundColor: '#f4fdf4',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Image
                    source={require('../../Images/gas.png')}
                    style={{height: 20, width: 20, marginTop: 4}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingTop: 4,
                    }}>
                    Curr CO2-
                    {this.props.thing_details.curr_state &&
                    this.props.thing_details.curr_state[7] <= 0
                      ? '+++'
                      : this.props.thing_details.curr_state[7]}
                    {this.props.thing_details.thing_schema &&
                      this.props.thing_details.thing_schema[7] &&
                      this.props.thing_details.thing_schema[7].unit}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  margin: 8,
                }}>
                <View
                  style={{
                    borderRadius: 10,
                    width: '40%',
                    height: 30,
                    backgroundColor: '#f4fdf4',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Image
                    source={require('../../Images/nh3.png')}
                    style={{height: 20, width: 20, marginTop: 4}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingTop: 4,
                    }}>
                    Req NH3-
                    {this.props.thing_details.curr_state &&
                      this.props.thing_details.curr_state[38]}
                    {this.props.thing_details.thing_schema &&
                      this.props.thing_details.thing_schema[38] &&
                      this.props.thing_details.thing_schema[38].unit}
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: 10,
                    width: '40%',
                    height: '100%',
                    backgroundColor: '#f4fdf4',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Image
                    source={require('../../Images/nh3.png')}
                    style={{height: 20, width: 20, marginTop: 4}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingTop: 4,
                    }}>
                    Curr NH3-
                    {this.props.thing_details.curr_state &&
                    this.props.thing_details.curr_state[8] <= 0
                      ? '+++'
                      : this.props.thing_details.curr_state[8]}
                    {this.props.thing_details.thing_schema &&
                      this.props.thing_details.thing_schema[8] &&
                      this.props.thing_details.thing_schema[8].unit}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              borderRadius: 15,
              height: HEIGHT / 5.8,
              width: '90%',
              alignSelf: 'center',
              marginBottom: 20,
              marginTop: 240,
            }}>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: '#fff',
                height: '100%',
                width: '100%',
                alignSelf: 'center',
                shadowColor: '#000000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.9,
                shadowRadius: 3,
                elevation: 3,
                display: 'flex',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  margin: 10,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: 50,
                  }}>
                  <Image
                    source={require('../../Images/heater.png')}
                    style={{height: 50, width: 50}}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: 'black',
                      marginTop: 15,
                      marginLeft: 5,
                    }}>
                    HEATER{' '}
                  </Text>
                </View>
                <View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <Text>
                      SET_POINT :{' '}
                      {this.props.thing_details.curr_state &&
                        this.props.thing_details.curr_state[53]}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      marginTop: 5,
                    }}>
                    <Image
                      source={
                        this.props.thing_details.curr_state &&
                        this.props.thing_details.curr_state[15] == 1
                          ? require('../../Images/on.png')
                          : require('../../Images/off.png')
                      }
                      style={{
                        height: 20,
                        width: 28,
                        marginTop: 4,
                        marginLeft: 15,
                      }}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  margin: 2,
                }}>
                <View
                  style={{
                    borderRadius: 10,
                    width: '50%',
                    height: 30,
                    backgroundColor: '#f4fdf4',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Image
                    source={require('../../Images/temperature.png')}
                    style={{height: 20, width: 20, marginTop: 4}}
                  />
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingTop: 6,
                      paddingRight: 5,
                    }}>
                    Req-Temperature:
                    {this.props.thing_details.curr_state &&
                      this.props.thing_details.curr_state[29]}
                    {this.props.thing_details.thing_schema &&
                      this.props.thing_details.thing_schema[29] &&
                      this.props.thing_details.thing_schema[29].unit}
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: 10,
                    width: '45%',
                    height: '100%',
                    backgroundColor: '#f4fdf4',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Image
                    source={require('../../Images/temperature.png')}
                    style={{height: 20, width: 20, marginTop: 4}}
                  />
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingTop: 6,
                      paddingRight: 5,
                    }}>
                    Curr Temperature-
                    {this.props.thing_details.curr_state &&
                      this.props.thing_details.curr_state[24]}
                    {this.props.thing_details.thing_schema &&
                      this.props.thing_details.thing_schema[24] &&
                      this.props.thing_details.thing_schema[24].unit}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              borderRadius: 15,
              height: HEIGHT / 5.8,
              width: '90%',
              alignSelf: 'center',
              marginBottom: 20,
              marginTop: 1,
            }}>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: '#fff',
                height: '130%',
                width: '100%',
                alignSelf: 'center',
                shadowColor: '#000000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.9,
                shadowRadius: 3,
                elevation: 3,
                display: 'flex',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  margin: 10,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: 50,
                  }}>
                  <Image
                    source={require('../../Images/fogg.png')}
                    style={{height: 50, width: 50}}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: 'black',
                      marginTop: 15,
                      marginLeft: 5,
                    }}>
                    FOG{' '}
                  </Text>
                </View>
                <View>
                  {/* <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                                    {
                                        this.props.thing_details.curr_state && this.props.thing_details.curr_state[22]== 1 ?
                                            <Text>Mode : AUTO</Text> : <Text>Mode : MANUAL</Text>
                                    }
                                </View> */}
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      marginTop: 5,
                    }}>
                    <Image
                      source={
                        this.props.thing_details.curr_state &&
                        this.props.thing_details.curr_state[46] == 1
                          ? require('../../Images/on.png')
                          : require('../../Images/off.png')
                      }
                      style={{
                        height: 20,
                        width: 28,
                        marginTop: 4,
                        marginLeft: 15,
                      }}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  margin: 8,
                }}>
                <View
                  style={{
                    borderRadius: 10,
                    width: '40%',
                    height: 30,
                    backgroundColor: '#f4fdf4',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Image
                    source={require('../../Images/temperature.png')}
                    style={{height: 20, width: 20, marginTop: 4}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingTop: 4,
                    }}>
                    Req-Temp-
                    {this.props.thing_details.curr_state &&
                      this.props.thing_details.curr_state[45]}
                    {this.props.thing_details.thing_schema &&
                      this.props.thing_details.thing_schema[45] &&
                      this.props.thing_details.thing_schema[45].unit}
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: 10,
                    width: '40%',
                    height: '100%',
                    backgroundColor: '#f4fdf4',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Image
                    source={require('../../Images/temperature.png')}
                    style={{height: 20, width: 20, marginTop: 4}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingTop: 4,
                    }}>
                    Current Temp-
                    {this.props.thing_details.curr_state &&
                    this.props.thing_details.curr_state[47] < 0
                      ? '+++'
                      : this.props.thing_details.curr_state[47]}
                    {this.props.thing_details.thing_schema &&
                      this.props.thing_details.thing_schema[47] &&
                      this.props.thing_details.thing_schema[47].unit}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  margin: 8,
                }}>
                <View
                  style={{
                    borderRadius: 10,
                    width: '40%',
                    height: 30,
                    backgroundColor: '#f4fdf4',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Image
                    source={require('../../Images/humidity.png')}
                    style={{height: 20, width: 20, marginTop: 4}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingTop: 4,
                    }}>
                    Req Humidity-{' '}
                    {this.props.thing_details.curr_state &&
                      this.props.thing_details.curr_state[30]}
                    {this.props.thing_details.thing_schema &&
                      this.props.thing_details.thing_schema[30] &&
                      this.props.thing_details.thing_schema[30].unit}
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: 10,
                    width: '40%',
                    height: '100%',
                    backgroundColor: '#f4fdf4',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Image
                    source={require('../../Images/humidity.png')}
                    style={{height: 20, width: 20, marginTop: 4}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingTop: 4,
                    }}>
                    Current Humidity-{' '}
                    {this.props.thing_details.curr_state &&
                    this.props.thing_details.curr_state[6] < 0
                      ? '+++'
                      : this.props.thing_details.curr_state[6]}
                    {this.props.thing_details.thing_schema &&
                      this.props.thing_details.thing_schema[6] &&
                      this.props.thing_details.thing_schema[6].unit}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              borderRadius: 15,
              height: HEIGHT / 5.8,
              width: '90%',
              alignSelf: 'center',
              marginBottom: '15%',
              marginTop: '10%',
            }}>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: '#fff',
                height: '130%',
                width: '100%',
                alignSelf: 'center',
                shadowColor: '#000000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.9,
                shadowRadius: 3,
                elevation: 3,
                display: 'flex',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  margin: 10,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: 50,
                  }}>
                  <Image
                    source={require('../../Images/alaram.png')}
                    style={{height: 50, width: 50}}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: 'black',
                      marginTop: 15,
                      marginLeft: 5,
                    }}>
                    ALARM{' '}
                  </Text>
                </View>
                <View>
                  {/* <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                                    {
                                        this.props.thing_details.curr_state && this.props.thing_details.curr_state[22]== 1 ?
                                            <Text>Mode : AUTO</Text> : <Text>Mode : MANUAL</Text>
                                    }
                                </View> */}
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      marginTop: 5,
                    }}>
                    <Image
                      source={
                        this.props.thing_details.curr_state &&
                        this.props.thing_details.curr_state[52] == 1
                          ? require('../../Images/on.png')
                          : require('../../Images/off.png')
                      }
                      style={{
                        height: 20,
                        width: 28,
                        marginTop: 4,
                        marginLeft: 15,
                      }}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  margin: 8,
                }}>
                <View
                  style={{
                    borderRadius: 10,
                    width: '40%',
                    height: 30,
                    backgroundColor: '#f4fdf4',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Image
                    source={require('../../Images/temperature.png')}
                    style={{height: 20, width: 20, marginTop: 4}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingTop: 4,
                    }}>
                    High Temp-
                    {this.props.thing_details.curr_state &&
                      this.props.thing_details.curr_state[48]}
                    {this.props.thing_details.thing_schema &&
                      this.props.thing_details.thing_schema[48] &&
                      this.props.thing_details.thing_schema[48].unit}
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: 10,
                    width: '40%',
                    height: '100%',
                    backgroundColor: '#f4fdf4',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Image
                    source={require('../../Images/temperature.png')}
                    style={{height: 20, width: 20, marginTop: 4}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingTop: 4,
                    }}>
                    Low Temp-
                    {this.props.thing_details.curr_state &&
                      this.props.thing_details.curr_state[49]}
                    {this.props.thing_details.thing_schema &&
                      this.props.thing_details.thing_schema[49] &&
                      this.props.thing_details.thing_schema[49].unit}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  margin: 8,
                }}>
                <View
                  style={{
                    borderRadius: 10,
                    width: '40%',
                    height: 30,
                    backgroundColor: '#f4fdf4',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Image
                    source={require('../../Images/humidity.png')}
                    style={{height: 20, width: 20, marginTop: 4}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingTop: 4,
                    }}>
                    High Humidity-{' '}
                    {this.props.thing_details.curr_state &&
                      this.props.thing_details.curr_state[50]}
                    {this.props.thing_details.thing_schema &&
                      this.props.thing_details.thing_schema[50] &&
                      this.props.thing_details.thing_schema[50].unit}
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: 10,
                    width: '40%',
                    height: '100%',
                    backgroundColor: '#f4fdf4',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Image
                    source={require('../../Images/humidity.png')}
                    style={{height: 20, width: 20, marginTop: 4}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingTop: 4,
                    }}>
                    Low Humidity-{' '}
                    {this.props.thing_details.curr_state &&
                      this.props.thing_details.curr_state[51]}
                    {this.props.thing_details.thing_schema &&
                      this.props.thing_details.thing_schema[51] &&
                      this.props.thing_details.thing_schema[51].unit}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.tableBody}>
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
                {DataTable.map((item, index) => {
                  return (
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
                  );
                })}
              </View>

              <View>
                {deviceList &&
                  deviceList.length > 0 &&
                  deviceList.map((item, index) => {
                    return (
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
                    );
                  })}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  tableBody: {
    borderWidth: 0.5,
    borderColor: 'green',
    borderRadius: 7,
    width: '90%',
    alignSelf: 'center',
    marginBottom: '10%',
  },
});
