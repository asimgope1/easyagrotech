import React, {Fragment, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import {HEIGHT, WIDTH} from '../../constants/config';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'; // Assuming you use FontAwesome6 icons
import Entypo from 'react-native-vector-icons/Entypo'; // Assuming you use Entypo icons
import {clearAll, getObjByKey} from '../../utils/Storage';
import {checkuserToken} from '../../redux/actions/auth';
import {useDispatch} from 'react-redux';
import {BASE_URL} from '../../constants/url';
import {GETNETWORK, POSTNETWORK} from '../../utils/Network';
import {BLACK} from '../../constants/color';
import Loader from '../../components/Loader';
import ChangepasswordModal from '../../components/ChangepasswordModal';

const Profile = ({user_details}) => {
  // State management using useState
  const [openModal, setOpenModal] = useState(false);
  const [fullName, setFullName] = useState(user_details?.data?.name || '');
  const [emailId, setEmailId] = useState(user_details?.data?.email || '');
  const [mobileNo, setMobileNo] = useState(user_details?.data?.phone || '');
  const dispatch = useDispatch();
  const [TimeZone, setTimeZone] = useState('');
  const [country, setcountry] = useState(false);
  const [loader, setLoader] = useState(false);
  const [token, SetToken] = useState('');

  useEffect(() => {
    getUserData();
    Gettoken();
  }, []);

  const getUserData = () => {
    setLoader(true);
    const url = `${BASE_URL}/user/profile/`;
    GETNETWORK(url, true)
      .then(res => {
        setLoader(false);
        console.log('red', res);
        if (res.status === 'success') {
          // dispatch(checkuserToken(true));
          setFullName(res.data?.name);
          setEmailId(res.data?.email);
          setMobileNo(res.data?.phone);
          setTimeZone(res.data?.timezone);
          setcountry(res.data?.country);
        } else {
          Alert.alert('Error', res.msg);
        }
      })
      .catch(error => {
        console.error('Error getting user data:', error);
      });
  };

  const Gettoken = async () => {
    setLoader(true);
    let loginRes = await getObjByKey('loginResponse');
    console.log('Gettoken', loginRes);
    setLoader(false);
    SetToken(loginRes?.data?.access_token);
  };

  const onUpdate = () => {
    setLoader(true);
    const url = `${BASE_URL}/user/profile/`; // Replace BASE_URL with your actual base URL

    // Body with dynamic profile data
    const body = {
      name: fullName, // Replace fullName with the actual full name variable
      phone: mobileNo, // Replace mobileNo with the actual mobile number variable
      country: country, // Replace country with the actual country variable
      timezone: TimeZone, // Replace TimeZone with the actual timezone variable
    };

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // Replace accessToken with your actual access token
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    };

    fetch(url, options)
      .then(response => response.json())
      .then(responseJson => {
        setLoader(false);
        if (responseJson.status === 'success') {
          console.log('Profile updated successfully:', responseJson);
          // Call getUserDetails or any other action needed after a successful update
          getUserData();
          alert('Profile Updated Successfully');
        } else {
          console.error('Error updating profile:', responseJson.msg);
          Alert.alert('Error', responseJson.msg);
        }
      })
      .catch(error => {
        console.error('Error getting user data:', error);
        alert('Something went wrong. Error: ' + error);
      });
  };

  const Logout = () => {
    // Your alert logic here
    // You can use Alert, or any other library to show alert dialog
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Logout',
        onPress: () => {
          clearAll();
          dispatch(checkuserToken(false));
        },
      },
    ]);
  };

  return (
    <Fragment>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.profileBanner}></View>
          <View style={styles.profileDetails}>
            <Image
              source={require('../../assets/images/user.png')}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileText}>PROFILE</Text>
              <View style={styles.inputContainer}>
                <View style={styles.textInputBox}>
                  <FontAwesome6 name="circle-user" size={20} color={'green'} />
                  <TextInput
                    defaultValue={fullName}
                    placeholder="Full Name"
                    style={styles.textInput}
                    onChangeText={setFullName}
                  />
                </View>
                <View style={styles.textInputBox}>
                  <Entypo name="mail-with-circle" size={20} color={'green'} />
                  <TextInput
                    value={emailId}
                    placeholder="Email Id"
                    style={styles.textInput}
                    onChangeText={setEmailId}
                  />
                </View>
                <View style={styles.textInputBox}>
                  <FontAwesome6 name="phone" size={20} color={'green'} />
                  <TextInput
                    defaultValue={mobileNo}
                    placeholder="Mobile Number"
                    style={styles.textInput}
                    onChangeText={setMobileNo}
                  />
                </View>

                <View style={styles.loginButton}>
                  <TouchableOpacity
                    onPress={() => {
                      onUpdate();
                    }}>
                    <View style={styles.updateButton}>
                      <Text style={styles.buttonText}>Update Profile</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => setOpenModal(true)}
                      style={styles.changePasswordButton}>
                      <Text style={styles.buttonText}>Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        Logout();
                      }}
                      style={styles.logoutButton}>
                      <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Loader visible={loader} />
      <ChangepasswordModal
        openmodal={openModal}
        onClosemodal={() => setOpenModal(false)}
        token={token}
      />
    </Fragment>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: 'white',
  },
  topContainer: {
    height: HEIGHT,
  },
  profileBanner: {
    height: '40%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c9b74',
    alignSelf: 'center',
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 3,
  },
  profileDetails: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: -150,
    alignSelf: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 1,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 3,
    paddingHorizontal: 15,
  },
  profileImage: {
    height: 100,
    width: 100,
    position: 'absolute',
    top: -50,
  },
  profileInfo: {
    height: '30%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 23,
    fontFamily: 'Gill Sans',
    fontWeight: '800',
    color: '#1c9b74',
    marginTop: 70,
  },
  inputContainer: {
    marginTop: 20,
  },
  textInputBox: {
    backgroundColor: 'white',
    width: '85%',
    alignSelf: 'center',
    marginBottom: 15,
    borderRadius: 5,
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'green',
    borderBottomWidth: 0,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 3,
  },
  textInput: {
    paddingLeft: 15,
    width: '100%',
    color: BLACK,
  },
  loginButton: {
    marginTop: 15,
  },
  updateButton: {
    width: '100%',
    alignSelf: 'center',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#1c9b74',
    marginTop: 15,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  changePasswordButton: {
    width: '47%',
    alignSelf: 'center',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'orange',
    marginTop: 15,
  },
  logoutButton: {
    width: '47%',
    alignSelf: 'center',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#F42859',
    marginTop: 15,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
