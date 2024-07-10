import { Text, View, ScrollView, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Modal, Alert } from 'react-native'
import React, { Component } from 'react'
import Header from '../../common/Header'
import { HEIGHT, ws_baseurl } from '../../lib/Constant'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import Slider from '@react-native-community/slider';
import { getThingDetails } from '../action';
import Common_Table from '../../common/Common_Table';
import ColorChangingBox from '../../common/ColorChangingBox';
import Devices from './Devices';
import Flock from './Flock';
import Activeindicator from "../../common/Activity_Indicator"


let item1={}

const imagePath = item1 && item1.curr_state && item1.curr_state[19] === 1 ? require('../../Images/on.png') : require('../../Images/off.png');

const tableData = [{ headerName: "DESCRIPTION", width: "30%" },
{ headerName: "VALUE", width: "20%" }, { headerName: "DESCRIPTION", width: "30%" },
{ headerName: "VALUE", width: "20%" }
]




class ThingDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentIndex: this.props.currentIndex,
            from_date: new Date(),
            to_date: new Date(),
            switchStatus: false,
            currentViewType: "Main",
            thing_details: {},
            loading: false,
            detailsofThings:[],
            loadingTimeout: null,
        }
    }

    componentDidMount = () => {
        this.connectWebSocket();
        // Set a timeout for 60 seconds
        this.setState({
            loadingTimeout: setTimeout(() => {
                this.handleLoadingTimeout();
            }, 60000),
        });
    }
    componentWillUnmount() {
        // Clear the loading timeout when the component is unmounted
        clearTimeout(this.state.loadingTimeout);
    }
    handleLoadingTimeout = () => {
        // Handle the case when data doesn't arrive within 60 seconds
        this.setState({ loading: false });
        Alert.alert("Data Not Found", "Make Sure Your device Is Connect Or Not ");
    };
    componentDidUpdate(prevProps) {
        if (this.props.currentIndex !== prevProps.currentIndex) {
            if (this.websocket) {
                this.websocket.close();
                this.setState({ thing_details: { thing_schema: null, curr_state: null } });
                this.connectWebSocket();
                this.setState({loading:true})
            }
            clearTimeout(this.state.loadingTimeout);
            this.setState({
                loadingTimeout: setTimeout(() => {
                    this.handleLoadingTimeout();
                }, 60000),
            });
          // ID has changed, clear the state and fetch new data
        //   this.setState({ thing_details: { thing_schema: null, curr_state: null } }, () => 
        //     this.connectWebSocket();
        //     // Additional data fetching logic if needed
        //   });
        }
      }



    connectWebSocket = () => {
        var things = this.props.route.params;
        this.setState({loading:true})
    
        // Clear previous WebSocket connection and related data
        // if (this.websocket) {
        //     this.websocket.close();
        //     this.setState({ thing_details: {} });
        // }
    
        if (things[this.props.currentIndex] && things[this.props.currentIndex].thing_id) {
            this.WEBSOCKET_URL = `${ws_baseurl}/thing/r/${things[this.props.currentIndex].thing_id}/`;
            console.log("this.WEBSOCKET_URL", this.WEBSOCKET_URL)
            this.websocket = new WebSocket(this.WEBSOCKET_URL);
            this.websocket.onmessage = this.on_message;
            this.websocket.onclose = this.on_close;
            this.websocket.onerror = this.on_error;
            console.log("WebSocket connected");
        }
    };
    

    on_send = event => {
        this.websocket.send(this.state.userSelectedState);
    }

    on_message = event => {
    var json_data = JSON.parse(event.data);
    var body = json_data.message;
    const myData = { ...this.state.thing_details };
    myData.thing_schema = body.schema;
    myData.curr_state = body.values;
    this.setState({ thing_details: myData,});
    clearTimeout(this.state.loadingTimeout);
    this.setState({ loading: false,loadingTimeout: null });
};

on_close = event => {
    if (!this.closing && event.target === this.websocket) {
        console.log("websocket closed. Retrying connect in 5 seconds ");
        this.setState({ loading: true }, () => {
            setTimeout(() => {
                console.log("Attempting to connect..");
                this.connectWebSocket();
            }, 5000);
        });
    } else {
        console.log("Closing websocket");
    }
};

on_error = event => {
    if (event.target === this.websocket) {
        console.log("Error occurred. Trying reconnect");
        this.setState({ loading: true }, () => {
            setTimeout(() => {
                console.log("Attempting to connect..");
                this.connectWebSocket();
            }, 5000);
        });
    }
};



    render() {
        const thingSchema = this.state.thing_details.thing_schema || [];
const currState = this.state.thing_details.curr_state || [];

const combinedData = thingSchema.length > 0 && thingSchema.reduce((acc, schemaItem, index) => {
  acc[schemaItem.name] = currState[index];
  return acc;
}, {});

const resultArray = combinedData ? [combinedData] : [];
var item1;

resultArray.length > 0 && resultArray.forEach((item, index) => {
  item1 = this.state.thing_details;
});
          const deviceList = [{
            image1: <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", }}>
                <Image source={require('../../Images/light.png')} style={{ height: 28, width: 28, marginLeft: 10, marginRight: 7 }} />
                <Text style={{ fontSize: 10, fontWeight: "bold", color: "black", paddingLeft: 8 }}>Light</Text>
            </View>,
            button1:item1 && item1.curr_state && item1.curr_state[19]==1?<Image source={require('../../Images/on.png')} style={{ height: 30, width: 30 }} />:<Image source={require('../../Images/off.png')} style={{ height: 30, width: 30 }} />,
            image2: <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", }}>
                <Image source={require('../../Images/cooling-fan.png')} style={{ height: 23, width: 23, marginLeft: 10, marginRight: 7 }} />
                <Text style={{ fontSize: 10, fontWeight: "bold", color: "black", paddingLeft: 8 }}>Cool Pad</Text>
            </View>,
            button2: item1 && item1.curr_state && item1.curr_state[16]==1?<Image source={require('../../Images/on.png')} style={{ height: 30, width: 30 }} />:<Image source={require('../../Images/off.png')} style={{ height: 30, width: 30 }} />
        },
        {
            image1: <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", }}>
                <Image source={require('../../Images/feed.png')} style={{ height: 23, width: 23, marginLeft: 10, marginRight: 7 }} />
                <Text style={{ fontSize: 10, fontWeight: "bold", color: "black", paddingLeft: 8 }}>Feed</Text>
            </View>,
            button1: <Image source={item1 && item1.curr_state && item1.curr_state[20]==1?require('../../Images/on.png'):require('../../Images/off.png')} style={{ height: 30, width: 30 }} />,
            image2: <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", }}>
                <Image source={require('../../Images/heater2.png')} style={{ height: 23, width: 23, marginLeft: 10, marginRight: 7 }} />
                <Text style={{ fontSize: 10, fontWeight: "bold", color: "black", paddingLeft: 8 }}>Heater</Text>
            </View>,
            button2: <Image source={item1 && item1.curr_state && item1.curr_state[15]==1?require('../../Images/on.png'):require('../../Images/off.png')} style={{ height: 30, width: 30 }} />
        },
        {
            image1: <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", }}>
                <Image source={require('../../Images/crossvent.png')} style={{ height: 23, width: 23, marginLeft: 10, marginRight: 7 }} />
                <Text style={{ fontSize: 10, fontWeight: "bold", color: "black", paddingLeft: 8 }}>Cross Vent</Text>
            </View>,
            button1:  <Image source={item1 && item1.curr_state && item1.curr_state[18]==1?require('../../Images/on.png'):require('../../Images/off.png')} style={{ height: 30, width: 30 }} />,
            image2: <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", }}>
                <Image source={require('../../Images/fan5.png')} style={{ height: 23, width: 23, marginLeft: 10, marginRight: 7 }} />
                <Text style={{ fontSize: 10, fontWeight: "bold", color: "black", paddingLeft: 8 }}>Fan</Text>
            </View>,
            button2: <Text style={{ fontSize: 10, fontWeight: "bold", color: "black", paddingLeft: 8 }}>{item1 && item1.curr_state && item1.curr_state[21]==1 ? 'AUTO' : 'MANUAL'}</Text>
        },
        {
            image1: <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", }}>
                <Image source={require('../../Images/alaram.png')} style={{ height: 23, width: 23, marginLeft: 10, marginRight: 7 }} />
                <Text style={{ fontSize: 10, fontWeight: "bold", color: "black", paddingLeft: 8 }}>Alarm</Text>
            </View>,
            button1: <Image source={item1 && item1.curr_state && item1.curr_state[52]==1?require('../../Images/on.png'):require('../../Images/off.png')} style={{ height: 30, width: 30 }} />,
            image2: <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", }}>
                <Image source={require('../../Images/fog1.png')} style={{ height: 23, width: 23, marginLeft: 10, marginRight: 7 }} />
                <Text style={{ fontSize: 10, fontWeight: "bold", color: "black", paddingLeft: 8 }}>Fog</Text>
            </View>,
            button2: <Image source={item1 && item1.curr_state && item1.curr_state[46]==1?require('../../Images/on.png'):require('../../Images/off.png')} style={{ height: 30, width: 30 }} />
        },

        
        ]
          
          console.log("item",this.props.currentIndex)
        return (
            <>
                <View>
                    {this.state.loading==false ? <></> : <Modal
                        animationType="slide"
                        transparent={true}
                        visible={true}

                    >
                        <View style={styles.centeredView}>
                            <View style={styles.indicator}>
                                <ActivityIndicator size={'large'} />
                                <Text>Waiting For The Responce</Text>
                            </View>
                        </View>
                    </Modal>}


                    <Header headerName={"User Pannel"} backButton={true} />

                    <View style={{ height: "5%", width: "100%", backgroundColor: "green", display: "flex", flexDirection: "row", justifyContent: "space-evenly", }}>
                        <Text style={{ fontSize: 15, fontWeight: "bold", color: "#fff", alignSelf: "center" }}>{this.props.thing_details.thing_name}</Text>
                        <Text style={{ fontSize: 15, fontWeight: "bold", color: "#fff", alignSelf: "center" }}>{this.props.thing_details.timestamp && this.props.thing_details.timestamp.split("T")[0]}</Text>
                        <Text style={{ fontSize: 15, fontWeight: "bold", color: "#fff", alignSelf: "center" }}>{this.props.thing_details.timestamp && this.props.thing_details.timestamp.split("T")[1]}</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", margin: 3 }}>
                        {
                            ['Main', 'Device', 'Flock'].map((item, index) => {
                                return <TouchableOpacity key={index} onPress={() => { this.setState({ currentViewType: item }) }} style={{
                                    borderRadius: 10, backgroundColor: this.state.currentViewType == item ? "green" : "#fff", height: 40, width: 100, margin: 15, shadowColor: '#000000', padding: 5,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.9,
                                    shadowRadius: 3,
                                    elevation: 3,
                                    display: "flex",
                                    justifyContent: "center", marginVertical: 15, marginLeft: 15,
                                }}>
                                    <Text style={{ fontWeight: "700", fontSize: 11, color: this.state.currentViewType == item ? "#fff" : "green", textAlign: "center" }}>{item}</Text>
                                </TouchableOpacity>
                            })
                        }
                    </View>

                    <ScrollView style={{ height: HEIGHT / 1.6 }}>
                        {
                            this.state.currentViewType == "Main" ?
                                <View style={{ width: "100%" }}>
                                    <View style={{ borderRadius: 15, height: HEIGHT / 1.8, width: "90%", alignSelf: "center", }}>
                                        <View style={{
                                            borderRadius: 10, backgroundColor: "#fff", height: "25%", width: "100%", margin: 15, alignSelf: "center", shadowColor: '#000000', padding: 5,
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.9,
                                            shadowRadius: 3,
                                            elevation: 3,
                                            display: "flex",
                                            justifyContent: "center"
                                        }}>
                                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", }}>
                                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", width: "60%" }}>
                                                    <Image source={require('../../Images/temperature.png')} style={{ height: 80, width: 60, }} />
                                                    <View>
                                                        <Text style={{ fontSize: 12, fontWeight: "bold", color: "black" }}>Avg. Temprature</Text>
                                                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>{this.state.thing_details.curr_state && this.state.thing_details.curr_state[0]<0?"+++":this.state.thing_details.curr_state && this.state.thing_details.curr_state[0]}{this.state.thing_details.thing_schema && this.state.thing_details.thing_schema[0] && this.state.thing_details.thing_schema[0].unit}</Text>
                                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", borderRadius: 10, backgroundColor: "green", marginTop: 7, paddingVertical: 4, alignItems: "center" }}>
                                                            <Text style={{ fontSize: 12, fontWeight: "bold", color: "white", }}>Req-Temp-{this.state.thing_details.curr_state && this.state.thing_details.curr_state[29]}{this.state.thing_details.thing_schema && this.state.thing_details.thing_schema[29] && this.state.thing_details.thing_schema[29].unit}</Text>
                                                            {/* <Text style={{ fontSize: 12, fontWeight: "bold", color: "white", }}></Text> */}
                                                        </View>
                                                        <View>
                                                        <Text style={{ fontSize: 12, fontWeight: "bold", color: "black", }}>Outside-Temp-{this.state.thing_details.curr_state && this.state.thing_details.curr_state[5]<0?"+++":this.state.thing_details.curr_state && this.state.thing_details.curr_state[5]}{this.state.thing_details.thing_schema && this.state.thing_details.thing_schema[5] && this.state.thing_details.thing_schema[2].unit}</Text> 
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{ width: "40%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                                                    <View style={{ display: "flex", flexDirection: "column", borderRightWidth: 1, justifyContent: "center", alignItems: "center", borderStyle: "dashed", marginTop: 10 }}>
                                                        <View>
                                                            <Text style={{ fontSize: 8, fontWeight: "bold", color: "black", padding: 3 }}>Temp-1:</Text>
                                                            <Text style={{ borderBottomWidth: 1, padding: 7, borderStyle: "dashed" }}>
                                                                {this.state.thing_details.curr_state && this.state.thing_details.curr_state[1]<0?"+++":this.state.thing_details.curr_state && this.state.thing_details.curr_state[1]}{this.state.thing_details.thing_schema && this.state.thing_details.thing_schema[1] && this.state.thing_details.thing_schema[1].unit}
                                                            </Text></View>
                                                        <View>
                                                            <Text style={{ fontSize: 8, fontWeight: "bold", color: "black", padding: 3 }}>Temp-3:</Text>
                                                            <Text style={{ padding: 7 }}>
                                                                {this.state.thing_details.curr_state && this.state.thing_details.curr_state[3]<0?"+++":this.state.thing_details.curr_state && this.state.thing_details.curr_state[3]}{this.state.thing_details.thing_schema && this.state.thing_details.thing_schema[3] && this.state.thing_details.thing_schema[3].unit}
                                                            </Text></View>
                                                    </View>
                                                    <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                                                        <View>
                                                            <Text style={{ fontSize: 8, fontWeight: "bold", color: "black", padding: 3 }}>Temp-2:</Text>
                                                            <Text style={{ borderBottomWidth: 1, padding: 7, borderStyle: "dashed" }} >
                                                                {this.state.thing_details.curr_state && this.state.thing_details.curr_state[2]<0?"+++":this.state.thing_details.curr_state && this.state.thing_details.curr_state[2]}{this.state.thing_details.thing_schema && this.state.thing_details.thing_schema[2] && this.state.thing_details.thing_schema[2].unit}
                                                            </Text></View>
                                                        <View>
                                                            <Text style={{ fontSize: 8, fontWeight: "bold", color: "black", padding: 3 }}>Temp-4:</Text>
                                                            <Text style={{ padding: 7 }}>
                                                                {this.state.thing_details.curr_state && this.state.thing_details.curr_state[4]<0?"+++":this.state.thing_details.curr_state && this.state.thing_details.curr_state[4]}{this.state.thing_details.thing_schema && this.state.thing_details.thing_schema[4] && this.state.thing_details.thing_schema[4].unit}
                                                            </Text></View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 0, height: "18%", backgroundColor: "white", shadowColor: '#000000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.9,
  shadowRadius: 3,
  elevation: 3, borderRadius: 15,width:"100%" }}>

  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Image source={require('../../Images/humidity.png')} style={{ height: 80, width: 80 }} />
    <View style={{ marginLeft: 10 }}>
      <Text style={{ fontSize: 12, fontWeight: "bold", color: "black", }}>Humidity-</Text>
      <Text style={{ fontSize: 15, fontWeight: "bold", color: "black", }}>{this.state.thing_details.curr_state && this.state.thing_details.curr_state[6] <= 0 ? "+++" : this.state.thing_details.curr_state && this.state.thing_details.curr_state[6]}{this.state.thing_details.thing_schema && this.state.thing_details.thing_schema[6] && this.state.thing_details.thing_schema[6].unit}</Text>
    </View>
  </View>

  <View style={{ alignItems: "flex-end" }}>
    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", borderRadius: 10, backgroundColor: "skyblue", paddingHorizontal: 10, paddingVertical: 5 }}>
      <Text style={{ fontSize: 12, fontWeight: "bold", color: "black", marginRight: 35 }}>Req Humidity-</Text>
      <Text style={{ fontSize: 12, fontWeight: "bold", color: "black",textAlign:"left" }}>{this.state.thing_details.curr_state && this.state.thing_details.curr_state[30]}{this.state.thing_details.thing_schema && this.state.thing_details.thing_schema[30] && this.state.thing_details.thing_schema[30].unit}</Text>
    </View>
  </View>

</View>


                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignSelf: "center", width: "100%", marginLeft: 15, marginRight: 15, height: "18%",marginTop:"5%" }}>

                                            {/* <View style={{
                                                borderRadius: 15, backgroundColor: "white", width: "47%", shadowColor: '#000000',
                                                shadowOffset: { width: 0, height: 2 },
                                                shadowOpacity: 0.9,
                                                shadowRadius: 3,
                                                elevation: 3,
                                            }}>
                                                <View>
                                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", }}>
                                                        <View>
                                                            <Image source={require('../../Images/humidity.png')} style={{ height: 50, width: 50 }} />
                                                        </View>
                                                        <View>
                                                            <Text style={{ fontSize: 12, fontWeight: "bold", color: "black", marginTop: 10, }}>Humidity</Text>
                                                            <Text style={{ fontSize: 15, fontWeight: "bold", color: "black", }}>{this.state.thing_details.curr_state && this.state.thing_details.curr_state[6]}{this.state.thing_details.thing_schema && this.state.thing_details.thing_schema[6] && this.state.thing_details.thing_schema[6].unit}</Text>
                                                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", borderRadius: 10, backgroundColor: "skyblue", width: 70, marginTop: 5 }}>
                                                                <Text style={{ fontSize: 10, fontWeight: "bold", color: "black", }}>Req-</Text>
                                                                <Text style={{ fontSize: 10, fontWeight: "bold", color: "black", }}>{this.state.thing_details.curr_state && this.state.thing_details.curr_state[30]}{this.state.thing_details.thing_schema && this.state.thing_details.thing_schema[30] && this.state.thing_details.thing_schema[30].unit}</Text>
                                                            </View>
                                                            
                                                        </View>

                                                    </View>
                                                </View>

                                            </View> */}

                                            <View style={{
                                                borderRadius: 15, backgroundColor: "white", width: "47%", shadowColor: '#000000',
                                                shadowOffset: { width: 0, height: 2 },
                                                shadowOpacity: 0.9,
                                                shadowRadius: 3,
                                                elevation: 3,
                                            }}>
                                                <View>
                                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", }}>
                                                        <View>
                                                            <Image source={require('../../Images/gas.png')} style={{ height: 70, width: 80 }} />
                                                        </View>
                                                        <View>
                                                            <Text style={{ fontSize: 12, fontWeight: "bold", color: "black", marginTop: 10, }}>CO2</Text>
                                                            <Text style={{ fontSize: 15, fontWeight: "bold", color: "black", }}>{this.state.thing_details.curr_state && this.state.thing_details.curr_state[7]<=0?"+++":this.state.thing_details.curr_state && this.state.thing_details.curr_state[7]}{this.state.thing_details.thing_schema && this.state.thing_details.thing_schema[7] && this.state.thing_details.thing_schema[7].unit}</Text>
                                                        </View>

                                                    </View>
                                                </View>
                                                

                                            </View>
                                            <View style={{
                                                borderRadius: 15, backgroundColor: "white", width: "47%", shadowColor: '#000000',
                                                shadowOffset: { width: 0, height: 2 },
                                                shadowOpacity: 0.9,
                                                shadowRadius: 3,
                                                elevation: 3,
                                            }}>
                                                 <View>
                                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", }}>
                                                        <View>
                                                            <Image source={require('../../Images/nh3.png')} style={{ height: 70, width: 80 }} />
                                                        </View>
                                                        <View>
                                                            <Text style={{ fontSize: 12, fontWeight: "bold", color: "black", marginTop: 10, }}>NH3</Text>
                                                            <Text style={{ fontSize: 10, fontWeight: "bold", color: "black", }}>{this.state.thing_details.curr_state && this.state.thing_details.curr_state[8]<=0?"+++":this.state.thing_details.curr_state && this.state.thing_details.curr_state[8]}{this.state.thing_details.thing_schema && this.state.thing_details.thing_schema[8] && this.state.thing_details.thing_schema[8].unit}</Text>
                                                            {/* <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", borderRadius: 10, backgroundColor: "skyblue", width: 70, marginTop: 5 }}>
                                                                <Text style={{ fontSize: 10, fontWeight: "bold", color: "black", }}>NH3 -</Text>
                                                                <Text style={{ fontSize: 10, fontWeight: "bold", color: "black", }}>{this.state.thing_details.curr_state && this.state.thing_details.curr_state[8]}{this.state.thing_details.thing_schema && this.state.thing_details.thing_schema[8] && this.state.thing_details.thing_schema[8].unit}</Text>
                                                            </View> */}
                                                        </View>

                                                    </View>
                                                </View>
                                            </View>
                                            
                                            
                                        </View>
                                        <View style={{
                                            borderRadius: 10, backgroundColor: "white", height: "30%", width: "100%", alignSelf: "center", marginTop: 15, shadowColor: '#000000',
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.9,
                                            shadowRadius: 3,
                                            elevation: 3,
                                        }}>
                                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", padding: 10, borderBottomWidth: 0.3, borderColor: "grey" }}>
                                                <View>
                                                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "black", }}>Minimum Vent</Text>
                                                    <Image source={this.state.thing_details.curr_state && this.state.thing_details.curr_state[43]==1? require('../../Images/fan.gif'): require('../../Images/fan5.png')} style={{ height: 60, width: 60,marginLeft:'10%' }} />
                                                </View>
                                                <View>
                                                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "black", textAlign: "center" }}>Maximum Vent</Text>
                                                    <Image source={this.state.thing_details.curr_state && this.state.thing_details.curr_state[43]==0? require('../../Images/fan.gif'): require('../../Images/fan5.png')} style={{ height: 60, width: 60,marginLeft:'10%' }} />
                                                </View>
                                            </View>
                                            

                                        </View>

                                    </View>

                                    <View style={{ marginTop: "21%"}}>
                                        {deviceList && deviceList.length > 0 &&
                                            <View style={styles.tableBody}>

                                                <View style={{ borderRadius: 5 }}>
                                                    <View style={{ flexDirection: "row", borderBottomWidth: 0.2, borderBottomColor: "gray", backgroundColor: "green", borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                                                        {
                                                            tableData.map((item, index) => {
                                                                return (
                                                                    <View key={index} style={{ width: item.width, paddingVertical: 15, display: "flex", alignItems: "center", borderRightWidth: index == 1 ? 0.5 : 0, borderColor: "#fff" }}>
                                                                        <Text style={{ fontWeight: "700", fontSize: 12, color: "#fff", textAlign: "center" }}>{item.headerName}</Text>
                                                                    </View>
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                    <View>
                                                        {
                                                            deviceList && deviceList.length > 0 && deviceList.map((item, index) => {
                                                                return (
                                                                    <View key={index} style={{ flexDirection: "row", backgroundColor: index % 2 !== 0 ? "#f4fdf4" : "#fff", display: "flex", alignItems: "center" }}>
                                                                        <View style={{ width: "35%", display: "flex", alignItems: "center", height: 36, justifyContent: "center" }}>
                                                                            {item.image1}
                                                                        </View>
                                                                        <View style={{ width: "15%", display: "flex", alignItems: "center", borderRightWidth: 0.5, height: 36, justifyContent: "center" }}>
                                                                            {item.button1}
                                                                        </View>
                                                                        <View style={{ width: "35%", display: "flex", alignItems: "center", height: 36, justifyContent: "center" }}>
                                                                            {item.image2}
                                                                        </View>
                                                                        <View style={{ width: "15%", display: "flex", alignItems: "center", height: 36, justifyContent: "center" }}>
                                                                            {item.button2}
                                                                        </View>
                                                                    </View>
                                                                )
                                                            })
                                                        }
                                                    </View>

                                                    
                                                </View>

                                            </View>}
                                    </View>
                                </View>
                                : this.state.currentViewType == "Device" ?
                                    <Devices thing_details={this.state.thing_details} /> :
                                    <View><Flock thing_details={this.state.thing_details}/></View>

                        }

                    </ScrollView>

                </View>

            </>
        )
    }
}

const styles = StyleSheet.create({
    tableBody: { borderWidth: 0.5, borderColor: "green", borderRadius: 7, width: "90%", alignSelf: "center", marginBottom: "3%", marginTop:-55 },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    indicator: {
        padding: 20, borderRadius: 8, backgroundColor: "#fff", elevation: 3, paddingHorizontal: 30
    }
})


const mapStateToProps = store => {
    return {
        accessToken: store.authenticationReducer.accessToken,
        currentIndex: store.authenticationReducer.currentIndex,
        thing_details: store.dashboardReducer.thing_details
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getThingDetails: (accessToken, body) => dispatch(getThingDetails(accessToken, body))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ThingDetails);