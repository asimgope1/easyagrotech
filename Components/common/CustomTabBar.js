import { TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { HEIGHT, WIDTH } from '../lib/Constant';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class CustomTabBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // curr_page: this.props.currentPage
        }
    }

    // componentDidUpdate = (prevProps) => {
    //     if (prevProps.currentPage !== this.props.currentPage) {
    //         this.setState({ curr_page: this.props.currentPage })
    //     }
    // }

    tabBarIcons = (item, color) => {
        switch (item) {
            case 'Dashboard':
                return color == 'black' ? <AntDesign name='home' color={color} size={22} /> : <Entypo name='home' color={color} size={20} />
            case 'User':
                return color == 'black' ? <Ionicons name='person-circle-outline' color={color} size={24} /> : <Ionicons name='person-circle' color={color} size={22} />
            default:
                break;
        }
    }

    render() {
        // if (this.props.currentPage == 'Dashboard' || this.props.currentPage == 'OrderHistory')
            return (
                <View style={{
                    width: "100%", height: "7%", flexDirection: "row", display: "flex", alignItems: "center", justifyContent: "space-evenly", backgroundColor: "#fff", alignSelf: "center", elevation: 5, shadowColor: "#000000",
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    shadowOffset: {
                        height: 1,
                        width: 1
                    }
                }}>
                    {
                        this.props.state.routeNames.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} style={{ width: "20%", display: "flex", justifyContent: "center", alignItems: "center" }} 
                                onPress={() => { item == 'Wishlist' ? alert("Wishlist is in developing mode") : this.props.navigation.navigate(item); 
                                 this.setState({ curr_page: item }) }}>
                                    {this.tabBarIcons(item, this.state.curr_page == item ? "green" : 'black')}
                                </TouchableOpacity>
                                
                            )
                        })
                    }

                </View>
            )

    }
}

export default CustomTabBar;