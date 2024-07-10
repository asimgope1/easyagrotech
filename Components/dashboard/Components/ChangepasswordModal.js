import React, { useState } from 'react';
import { Alert, StyleSheet, Text, Pressable, View, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { HEIGHT } from '../../lib/Constant';
import Modal from "react-native-modal";
import { connect } from 'react-redux';
import { onChangePassword } from '../action';
import { Base64 } from 'js-base64';

const ChangepasswordModal = (props) => {
    const [oldPassword, setoldPassword] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [renewPassword, setrenewPassword] = useState("");

    const onChangePassword = () => {
        if (oldPassword && newPassword && renewPassword) {
            var body = {
                "old_password": Base64.encode(Base64.encode(oldPassword)),
                "new_password": Base64.encode(Base64.encode(newPassword))
            }

            if (newPassword == renewPassword) {
                props.onChangePassword(props.accessToken, body)
                props.onClosemodal();
            }
            else {
                alert("Password Mismatched")
            }
        }
        else {
            alert("Please fill all fields")
        }
    }

    return (
        <Modal

            isVisible={props.openmodal}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <View style={{ width: "100%", display: "flex", alignItems: "flex-end", flexDirection: "row", alignContent: "space-between", justifyContent: "space-between", padding: 10, backgroundColor: "#1c9b74" }}>
                        <Text style={{ marginLeft: 20, fontWeight: 'bold', fontSize: 20, color: "#fff" }}>Change Password</Text>
                        <TouchableOpacity style={{ backgroundColor: "#fff", borderRadius: 100, elevation: 4, shadowColor: "#000", width: 20, }}  onPress={() => props.onClosemodal()}>
                            <Entypo name='cross' size={20} color="#1c9b74" />
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: "80%", paddingTop: 30, }}>
                        <View style={styles.textInputBox}>
                            <FontAwesome name="lock" size={20} color="#1c9b74" style={{ marginRight: 5 }} />
                            <TextInput placeholder='Old Password' style={{ width: "100%", }} onChangeText={(text) => setoldPassword(text)} ></TextInput>
                        </View>
                        <View style={styles.textInputBox}>
                            <FontAwesome name="lock" size={20} color="#1c9b74" style={{ marginRight: 5 }} />
                            <TextInput placeholder='New Password' style={{ width: "100%", }} onChangeText={(text) => setnewPassword(text)} ></TextInput>
                        </View>
                        <View style={styles.textInputBox}>
                            <FontAwesome name="lock" size={20} color="#1c9b74" style={{ marginRight: 5 }} />
                            <TextInput placeholder='Confirm Password' style={{ width: "100%", }} onChangeText={(text) => setrenewPassword(text)} ></TextInput>
                        </View>

                        <TouchableOpacity onPress={() => onChangePassword()}>
                            <View style={{
                                height: "40%", display: "flex", justifyContent: "center", width: "70%", borderRadius: 10, alignSelf: "center", marginTop: 20, backgroundColor: "#1c9b74"
                            }}>
                                <Text style={{
                                    fontSize: 15,
                                    fontFamily: 'Gill Sans',
                                    textAlign: 'center',
                                    color: '#fff',
                                    fontWeight: "bold"
                                }}>Update Password</Text>
                            </View>


                        </TouchableOpacity>


                    </View>

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        // borderRadius: 20,
        // padding: 35,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: HEIGHT / 2,
        width: "90%",

    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    textInputBox: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#1c9b74", width: "85%", alignSelf: "center", borderRadius: 7, paddingHorizontal: 15, display: "flex", flexDirection: "row", alignItems: "center", marginTop: 10 },
});



const mapStateToProps = store => {
    return {
        accessToken: store.authenticationReducer.accessToken,
        //   user_details: store.dashboardReducer.user_details,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUserDetails: (accessToken) => dispatch(getUserDetails(accessToken)),
        onChangePassword: (accessToken, body) => dispatch(onChangePassword(accessToken, body))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangepasswordModal);

