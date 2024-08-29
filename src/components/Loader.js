import React, {useEffect, useRef} from 'react';
import {
  Modal,
  View,
  Image,
  StyleSheet,
  Animated,
  Easing,
  Text,
} from 'react-native';

const Loader = ({visible}) => {
  // Create an animated value
  const rotateValue = useRef(new Animated.Value(0)).current;

  // Define the animation
  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 1000, // 1 second for a full rotation
          easing: Easing.linear, // Ensures a smooth linear rotation
          useNativeDriver: true, // Use native driver for better performance
        }),
      ).start();
    };

    startAnimation();

    // Cleanup function to stop the animation if the component unmounts
    return () => {
      rotateValue.stopAnimation();
    };
  }, [rotateValue]);

  // Interpolate the rotateValue to map it to rotation in degrees
  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Style object for the rotating image
  const rotateStyle = {
    transform: [{rotate: rotateInterpolate}],
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.loaderContainer}>
          <Image
            source={require('../assets/images/coolingpad.gif')} // Change to your logo image path
            style={[styles.loaderImage]}
          />
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 20,
            }}>
            Please Wait for some time.........
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  loaderContainer: {
    width: 300,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderImage: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
  },
});

export default Loader;
