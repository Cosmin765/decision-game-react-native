import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, Animated } from 'react-native';

import uuid from './uuid';

const interpolationOptions = [
  ["rgb(169, 3, 252)", "rgb(255, 0, 0)"],
  ["rgb(255, 0, 0)", "rgb(255, 191, 0)"],
  ["rgb(255, 191, 0)", "rgb(242, 255, 0)"],
  ["rgb(242, 255, 0)", "rgb(17, 255, 0)"],
  ["rgb(17, 255, 0)", "rgb(0, 255, 255)"],
  ["rgb(0, 255, 255)", "rgb(255, 0, 255)"]
];
const name = "©Turtureanu Cosmin";

export default function About(props) {
  const [renders, setRenders] = useState(0);
  const colorAnim = new Animated.Value(0);
  
  Animated.timing(colorAnim, { toValue: 1, duration: 150, useNativeDriver: false }).start(() => setRenders((renders + 1) % interpolationOptions.length));

  const animatedTexts = Array.from(Array(name.length).keys()).map(i => <Animated.Text style={{ color: colorAnim.interpolate({ inputRange: [0, 1], outputRange: interpolationOptions[(renders + i) % interpolationOptions.length] }) }} key={uuid()}>{ name[i] }</Animated.Text>);

  return (
    <SafeAreaView style={styles.about}>
        <Text style={styles.description}>
          {'\t\t\t\t'}Acest joc a fost facut din plictiseala, intentia acestui proiect fiind strict pentru invatarea framework-ului "React Native". Ideea am preluat-o dintr-un joc de pe mobil numit "Lapse". Daca iti place acest tip de joc, iti recomand sa-l incerci. Nu vei regreta :)
        </Text>
        <Text style={styles.copyright}>
          { animatedTexts }
        </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  about: {
    justifyContent: "center",
    backgroundColor: "rgb(50, 50, 50)",
    height: "100%",
  },
  copyright: {
    color: "#fff",
    right: 15,
    bottom: 15,
    fontSize: 18,
    position: "absolute",
    letterSpacing: 3,
    fontStyle: "italic",
  },
  description: {
    color: "#fff",
    padding: 35,
    fontSize: 30,
    fontStyle: "italic",
    letterSpacing: 2,
  },
});