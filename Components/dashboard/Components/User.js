import { Text, View, ScrollView, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { Component } from 'react'
import { HEIGHT, WIDTH } from '../../lib/Constant';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { getUserDetails, onUpdateProfile } from '../action';
import ChangepasswordModal from './ChangepasswordModal';
import AsyncStorage from '@react-native-async-storage/async-storage';


class User extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fullname: "",
      emailid: "",
      mobileno: "",
      openmodal: false


    }
  }
  createThreeButtonAlert = () =>
    Alert.alert('Alert Title', 'Are you sure want to logout !', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK', onPress: () => {
          AsyncStorage.removeItem('logindetails');
          this.props.navigation.navigate('Login')

        }
      },
    ]);

  onUpdate = () => {
    if (this.state.fullname && this.state.emailid && this.state.mobileno) {
      var body = {
        "name": this.state.fullname,
        "phone": this.state.mobileno,
        "country": this.props.user_details.data.country,
        "timezone": this.props.user_details.data.timezone
      }
      this.props.onUpdateProfile(this.props.accessToken, body)
    }
    else {
      alert("Please Enter valid name, email & number")
    }

  }


  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.user_details.data !== this.props.user_details.data) {
      if (this.props.user_details.data) {
        this.setState({
          fullname: this.props.user_details.data.name,
          emailid: this.props.user_details.data.email,
          mobileno: this.props.user_details.data.phone,
        })
      }
    }
  }

  componentDidMount = () => {
    this.props.getUserDetails(this.props.accessToken)

    if (this.props.user_details.data) {
      this.setState({
        fullname: this.props.user_details.data.name,
        emailid: this.props.user_details.data.email,
        mobileno: this.props.user_details.data.phone,
      })
    }
  }

  render() {
    return (
      <View style={{ height: HEIGHT, width: WIDTH, backgroundColor: "white" }}>

        <ChangepasswordModal openmodal={this.state.openmodal} onClosemodal={() => { this.setState({ openmodal: false }) }} />

        <View style={{ height: HEIGHT, }}>
          <View style={{
            height: "40%", width: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "#1c9b74", alignSelf: "center",
            // borderWidth: 1,
            borderRadius: 5,
            borderColor: 'green',
            borderBottomWidth: 0,
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.9,
            shadowRadius: 3,
            elevation: 3
          }}>

          </View>
          <View style={{
            height: "100%", width: "100%", alignItems: "center", backgroundColor: "white", marginTop: -150, alignSelf: "center", borderTopLeftRadius: 30, borderTopRightRadius: 30, zIndex: 1, borderRadius: 5,
            borderColor: 'green',
            borderBottomWidth: 0,
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.9,
            shadowRadius: 3,
            elevation: 3, paddingHorizontal: 15
          }}>
            <Image source={require('../../Images/user.png')} style={{ height: 100, width: 100, position: "absolute", top: -50 }} />
            <View style={{ height: "30%", width: "100%", display: "flex", alignItems: "center", }}>
              <Text style={{ fontSize: 23, fontFamily: "Gill Sans", fontWeight: "800", color: "#1c9b74", marginTop: 70 }}>PROFILE</Text>
              <View style={{ marginTop: 20 }}>
                <View style={styles.textInputBox} >
                  <FontAwesome6 name="circle-user" size={20} color={"green"} />
                  <TextInput defaultValue={this.props.user_details.data && this.props.user_details.data.name} placeholder='Full Name' style={{ paddingLeft: 15, width: "100%", }} onChangeText={(data) => this.setState({ fullname: data })}  ></TextInput>
                </View>
                <View style={styles.textInputBox} >
                  <Entypo name="mail-with-circle" size={20} color={"green"} />
                  <TextInput value={this.props.user_details.data && this.props.user_details.data.email} placeholder='Email Id' style={{ paddingLeft: 15, width: "100%", }} onChangeText={(data) => this.setState({ emailid: data })}  ></TextInput>
                </View>
                <View style={styles.textInputBox} >
                  <FontAwesome6 name="phone" size={20} color={"green"} />
                  <TextInput defaultValue={this.props.user_details.data && this.props.user_details.data.phone} placeholder='Mobile Number' style={{ paddingLeft: 15, width: "100%", }} onChangeText={(data) => this.setState({ mobileno: data })}  ></TextInput>
                </View>

                <View style={styles.loginButton}>
                  <TouchableOpacity onPress={() => this.onUpdate()}  >
                    <View style={{ width: "100%", alignSelf: "center", height: 50, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, backgroundColor: "#1c9b74", marginTop: 15 }}>
                      <Text style={styles.buttonText}>
                        Update Profile
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {/* <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                    <TouchableOpacity onPress={() => { this.setState({ openmodal: true }) }} >
                      <View style={{ width: "90%", alignSelf: "center", height: 50, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, backgroundColor: "orange", marginTop: 15 }}>
                        <Text style={styles.buttonText}>
                          Change Password
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.setState({ openmodal: true }) }} >
                      <View style={{ width: "90%", alignSelf: "center", height: 50, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, backgroundColor: "#F42859", marginTop: 15 }}>
                        <Text style={styles.buttonText}>
                          Logout
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View> */}
                  <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <TouchableOpacity onPress={() => { this.setState({ openmodal: true }) }} style={{ width: "47%", alignSelf: "center", height: 50, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, backgroundColor: "orange", marginTop: 15 }} >
                      <Text style={styles.buttonText}>
                        Change Password
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.createThreeButtonAlert() }} style={{ width: "47%", alignSelf: "center", height: 50, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, backgroundColor: "#F42859", marginTop: 15 }} >

                      <Text style={styles.buttonText}>
                        Logout
                      </Text>

                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

          </View>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInputBox: {
    backgroundColor: "white", width: "85%", alignSelf: "center", marginBottom: 15, borderRadius: 7, paddingHorizontal: 15, display: "flex", flexDirection: "row", alignItems: "center",
    borderRadius: 5,
    borderColor: 'green',
    borderBottomWidth: 0,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: 'white',
    fontWeight: "bold",

  },


})

const mapStateToProps = store => {
  return {
    accessToken: store.authenticationReducer.accessToken,
    user_details: store.dashboardReducer.user_details,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserDetails: (accessToken) => dispatch(getUserDetails(accessToken)),
    onUpdateProfile: (accessToken, body) => dispatch(onUpdateProfile(accessToken, body))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);