import React, { useState } from 'react';
import { Alert, StyleSheet, Text, Pressable, View, TextInput, TouchableOpacity } from 'react-native';
import { HEIGHT, WIDTH } from '../../lib/Constant';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import { connect } from 'react-redux';
import { onForgotPassword } from '../action';

const ForgotPasswordModal = (props) => {
    const [regd, setRegd] = useState("");
    return (
        // <View style={styles.centeredView}>
        <Modal
            isVisible={props.openmodal}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <View style={{ width: "100%", display: "flex", alignItems: "flex-end", flexDirection: "row", alignContent: "space-between", justifyContent: "space-between", padding: 10 }}>
                        <Text style={{ marginLeft: 20, color: "green", fontWeight: 'bold', fontSize: 20 }}>Forgot Password</Text>
                        <TouchableOpacity style={{ backgroundColor: "#fff", borderRadius: 100, elevation: 4, shadowColor: "#000", width: 20, }} onPress={() => props.onClosemodal()}>
                            <Entypo name='cross' size={20} color="black" />
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: "80%", paddingTop: 30, }}>
                        <View style={styles.textInputBox}>
                            <Ionicons name="mail" size={20} color={"green"} style={{ marginRight: 5 }} />
                            <TextInput placeholder='Email' style={{ width: "100%" }} onChangeText={(text) => setRegd(text)} ></TextInput>
                        </View>

                        <TouchableOpacity onPress={() => { props.forgotPassword(regd) }}>
                            <View style={{
                                height: "50%", display: "flex", justifyContent: "center", backgroundColor: "green", width: "70%", borderRadius: 10, alignSelf: "center", marginTop: 20
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    fontFamily: 'Gill Sans',
                                    textAlign: 'center',
                                    color: '#fff',
                                    fontWeight: "bold"
                                }}>Submit</Text>
                            </View>


                        </TouchableOpacity>


                    </View>

                </View>
            </View>
        </Modal>
        // </View>
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
        borderRadius: 20,
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
        height: HEIGHT / 3.2,
        width: "90%"
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
    textInputBox: { backgroundColor: "#fff", borderColor: "green", borderWidth: 1, width: "85%", alignSelf: "center", borderRadius: 7, paddingHorizontal: 15, display: "flex", flexDirection: "row", alignItems: "center" },
});

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        forgotPassword: (email) => dispatch(onForgotPassword(email))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordModal);