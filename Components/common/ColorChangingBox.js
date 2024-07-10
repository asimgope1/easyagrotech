import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

const ColorChangingBox = () => {
  const [boxes, setBoxes] = useState(Array(5).fill('red'));
  const [greenCount, setGreenCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (greenCount >= 5) {
        // All boxes are green, reset the count and make all boxes red again
        setGreenCount(0);
        setBoxes(Array(5).fill('grey'));
      } else {
        // Increment the greenCount and turn one more red box to green
        setGreenCount(prevCount => prevCount + 1);
        setBoxes(prevBoxes => {
          const updatedBoxes = [...prevBoxes];
          updatedBoxes[greenCount] = 'green';
          return updatedBoxes;
        });
      }
    }, 500);

    return () => clearInterval(interval);
  }, [greenCount]);

  return (
    <View style={styles.container}>
      {boxes.map((color, index) => (
        <View key={index} style={[styles.box, { backgroundColor: color }]} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Align boxes from left to right
    alignItems: 'center',
    height: 100,
  },
  box: {
    width: 13,
    height: 13,
    margin: 5,
  },
});

export default ColorChangingBox;