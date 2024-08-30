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
import {BASE_URL} from '../constants/url';

const ChangepasswordModal = ({openmodal, onClosemodal, token}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [renewPassword, setRenewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRenewPassword, setShowRenewPassword] = useState(false);

  const changePassword = body => {
    console.log('bod', body);
    const accessToken = token; // Replace with your actual access token

    const requestUrl = `${BASE_URL}/user/profile/`; // Replace BASEURL with your actual base URL

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    };

    fetch(requestUrl, options)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status === 'success') {
          // Assuming you have a function to fetch user details after a successful update
          // getUserDetails(accessToken);
          alert('Profile Updated Successfully');
        } else {
          alert('Error: ' + responseJson.msg);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong. Error: ' + error);
      });
  };

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
    changePassword(body);
    onClosemodal();
  };

  return (
    <Modal visible={openmodal} onRequestClose={onClosemodal} transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Change Password</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClosemodal}>
              <Entypo name="cross" size={20} color="#1c9b74" />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            {/* Old Password Input */}
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
                secureTextEntry={!showOldPassword}
                onChangeText={setOldPassword}
                value={oldPassword}
              />
              <TouchableOpacity
                onPress={() => setShowOldPassword(!showOldPassword)}
                style={styles.eyeIcon}>
                <Entypo
                  name={showOldPassword ? 'eye' : 'eye-with-line'}
                  size={20}
                  color="#1c9b74"
                />
              </TouchableOpacity>
            </View>

            {/* New Password Input */}
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
                secureTextEntry={!showNewPassword}
                onChangeText={setNewPassword}
                value={newPassword}
              />
              <TouchableOpacity
                onPress={() => setShowNewPassword(!showNewPassword)}
                style={styles.eyeIcon}>
                <Entypo
                  name={showNewPassword ? 'eye' : 'eye-with-line'}
                  size={20}
                  color="#1c9b74"
                />
              </TouchableOpacity>
            </View>

            {/* Confirm Password Input */}
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
                secureTextEntry={!showRenewPassword}
                onChangeText={setRenewPassword}
                value={renewPassword}
              />
              <TouchableOpacity
                onPress={() => setShowRenewPassword(!showRenewPassword)}
                style={styles.eyeIcon}>
                <Entypo
                  name={showRenewPassword ? 'eye' : 'eye-with-line'}
                  size={20}
                  color="#1c9b74"
                />
              </TouchableOpacity>
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

const styles = {
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    height: HEIGHT * 0.5,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 10,
  },
  content: {
    width: '100%',
    marginTop: 20,
  },
  textInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1c9b74',
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    paddingVertical: 5,
  },
  icon: {
    marginRight: 10,
  },
  eyeIcon: {
    padding: 5,
  },
  updateButton: {
    backgroundColor: '#1c9b74',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
};

export default ChangepasswordModal;
