import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {Base64} from 'js-base64';
import {HEIGHT} from '../constants/config';

const ChangepasswordModal = ({openmodal, onClosemodal}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [renewPassword, setRenewPassword] = useState('');

  const handlePasswordChange = () => {
    if (!oldPassword || !newPassword || !renewPassword) {
      Alert.alert('Please fill all fields');
      return;
    }

    if (newPassword !== renewPassword) {
      Alert.alert('Password Mismatched');
      return;
    }

    const body = {
      old_password: Base64.encode(Base64.encode(oldPassword)),
      new_password: Base64.encode(Base64.encode(newPassword)),
    };

    console.log('Encoded passwords:', body);
    onClosemodal();
  };

  return (
    <Modal isVisible={openmodal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Change Password</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClosemodal}>
              <Entypo name="cross" size={20} color="#1c9b74" />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <View style={styles.textInputBox}>
              <FontAwesome
                name="lock"
                size={20}
                color="#1c9b74"
                style={styles.icon}
              />
              <TextInput
                placeholder="Old Password"
                style={styles.input}
                secureTextEntry
                onChangeText={setOldPassword}
                value={oldPassword}
              />
            </View>

            <View style={styles.textInputBox}>
              <FontAwesome
                name="lock"
                size={20}
                color="#1c9b74"
                style={styles.icon}
              />
              <TextInput
                placeholder="New Password"
                style={styles.input}
                secureTextEntry
                onChangeText={setNewPassword}
                value={newPassword}
              />
            </View>

            <View style={styles.textInputBox}>
              <FontAwesome
                name="lock"
                size={20}
                color="#1c9b74"
                style={styles.icon}
              />
              <TextInput
                placeholder="Confirm Password"
                style={styles.input}
                secureTextEntry
                onChangeText={setRenewPassword}
                value={renewPassword}
              />
            </View>

            <TouchableOpacity
              style={styles.updateButton}
              onPress={handlePasswordChange}>
              <Text style={styles.updateButtonText}>Update Password</Text>
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
  },
  modalView: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: HEIGHT / 2,
    width: '90%',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#1c9b74',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
  closeButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 5,
  },
  content: {
    height: '80%',
    paddingTop: 30,
  },
  textInputBox: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#1c9b74',
    width: '85%',
    alignSelf: 'center',
    borderRadius: 7,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  icon: {
    marginRight: 5,
  },
  input: {
    width: '100%',
  },
  updateButton: {
    height: '40%',
    justifyContent: 'center',
    width: '70%',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#1c9b74',
  },
  updateButtonText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChangepasswordModal;
