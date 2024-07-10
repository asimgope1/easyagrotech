import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { HEIGHT, WIDTH } from '../lib/Constant';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Modal from "react-native-modal";
import { connect } from 'react-redux';
import { getDashboardDetails } from '../dashboard/action';
import { setCurrentIndex } from '../authentication/action';
import * as RootNavigation from '../lib/Rootnavigation';

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false,
            // currentIndex: -1

        }
    }

    // componentDidUpdate = (prevProps, prevState) => {
    //     if (prevState.currentIndex !== this.props.currentIndex) {
    //         this.props.setCurrentIndex(this.props.currentIndex)
    //     }
    // }

    render() {
        return (
            <View>
                <View style={{ width: WIDTH, backgroundColor: "white", height: HEIGHT / 13, display: "flex", alignItems: "center", flexDirection: "row", paddingHorizontal: 15, justifyContent: "space-between" }}>
                    <View style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                        {
                            this.props.backButton ?
                                <TouchableOpacity onPress={() => { this.props.setCurrentIndex(-1) }}>
                                    <Feather name='arrow-left' size={22} color="black" />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => this.setState({ visible: true })}>
                                    <FontAwesome name='bars' size={22} color="green" />
                                </TouchableOpacity>
                        }
                        <Text style={{ letterSpacing: 0.6, fontSize: 18, color: "black", fontWeight: "600", marginLeft: "10%", }}>{this.props.headerName}</Text>
                    </View>
                    <View style={{ height: 25, width: 25, display: "flex", flexDirection: "row", justifyContent: "space-between", marginRight: 20 }}>
                    </View>
                </View>



                <ScrollView horizontal={true} style={{ width: "100%", flexDirection: "row", display: "flex", alignSelf: "center", }}>
                    {
                        this.props.dashboard_details && this.props.dashboard_details.data && this.props.dashboard_details.data.things.count > 0 &&
                        <TouchableOpacity onPress={() => { this.props.setCurrentIndex(-1) }} style={{ display: "flex", flexDirection: "row", width: 110, borderRadius: 7, height: 40, alignItems: "center", backgroundColor: -1 == this.props.currentIndex ? "green" : "#fff", justifyContent: "space-evenly", elevation: 5, shadowColor: "#000", marginVertical: 15, marginLeft: 15, marginRight: this.props.dashboard_details.data.things.count - 1 == -1 ? 15 : 0 }}>
                            <Text style={{ fontWeight: "700", fontSize: 11, color: -1 == this.props.currentIndex ? '#fff' : 'green' }}>Overview</Text>
                        </TouchableOpacity>}

                    {
                        this.props.dashboard_details && this.props.dashboard_details.data && this.props.dashboard_details.data.things.count > 0 && this.props.dashboard_details.data.things.data.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => { this.props.setCurrentIndex(index) }} key={index} style={{ display: "flex", flexDirection: "row", width: 110, borderRadius: 7, height: 40, alignItems: "center", backgroundColor: index == this.props.currentIndex ? "green" : "#fff", justifyContent: "space-evenly", elevation: 5, shadowColor: "#000", marginVertical: 15, marginLeft: 15, marginRight: this.props.dashboard_details.data.things.count - 1 == index ? 15 : 0 }}>
                                    <Text style={{ fontWeight: "700", fontSize: 11, color: index == this.props.currentIndex ? '#fff' : 'green' }}>{item.thing_name}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
                <Modal isVisible={this.state.visible}
                    onRequestClose={() => this.setState({ visible: false })}
                    onSwipeComplete={() => this.setState({ visible: false })}
                    swipeDirection="left"
                    animationIn={"slideInLeft"}
                    animationOut={"slideOutLeft"}
                >
                    <View style={{ backgroundColor: "white", height: HEIGHT, width: WIDTH / 1.6, padding: 20, position: "absolute", marginLeft: -18 }}>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{}}>TabBar</Text>
                            <TouchableOpacity style={{ backgroundColor: "green", borderRadius: 100, elevation: 4, shadowColor: "#000", }} onPress={() => this.setState({ visible: false })}>
                                <Entypo name='cross' size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}


const mapStateToProps = store => {
    return {
        accessToken: store.authenticationReducer.accessToken,
        dashboard_details: store.dashboardReducer.dashboard_details,
        currentIndex: store.authenticationReducer.currentIndex
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDashboardDetails: (accessToken) => dispatch(getDashboardDetails(accessToken)),
        setCurrentIndex: (currentIndex) => dispatch(setCurrentIndex(currentIndex))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);