import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HEIGHT} from '../constants/config';

const ForgotPasswordModal = ({isVisible, onCloseModal}) => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    if (email) {
      Alert.alert('Password reset instructions sent to:', email);
      onCloseModal();
    } else {
      Alert.alert('Please enter your email');
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onCloseModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Forgot Password</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onCloseModal}>
              <Entypo name="cross" size={20} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            <View style={styles.textInputBox}>
              <Ionicons
                name="mail"
                size={20}
                color={'green'}
                style={styles.icon}
              />
              <TextInput
                placeholder="Email"
                style={styles.textInput}
                onChangeText={text => setEmail(text)}
              />
            </View>

            <TouchableOpacity onPress={handleForgotPassword}>
              <View style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
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
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: HEIGHT / 3.2,
    width: '90%',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  headerText: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 20,
  },
  closeButton: {
    backgroundColor: '#fff',
    borderRadius: 100,
    elevation: 4,
  },
  body: {
    height: '80%',
    paddingTop: 30,
  },
  textInputBox: {
    backgroundColor: '#fff',
    borderColor: 'green',
    borderWidth: 1,
    width: '85%',
    alignSelf: 'center',
    borderRadius: 7,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  textInput: {
    width: '100%',
  },
  submitButton: {
    height: '50%',
    justifyContent: 'center',
    backgroundColor: 'green',
    width: '70%',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ForgotPasswordModal;
