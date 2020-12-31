import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, Animated } from 'react-native';

import uuid from 'src/uuid';

const interpolationOptions = [
  ["rgb(169, 3, 252)", "rgb(255, 0, 0)"],
  ["rgb(255, 0, 0)", "rgb(255, 191, 0)"],
  ["rgb(255, 191, 0)", "rgb(242, 255, 0)"],
  ["rgb(242, 255, 0)", "rgb(17, 255, 0)"],
  ["rgb(17, 255, 0)", "rgb(0, 255, 255)"],
  ["rgb(0, 255, 255)", "rgb(255, 0, 255)"]
];
const name = "©Turtureanu Cosmin";

const About = props => {
  const [renders, setRenders] = useState(0);
  const colorAnim = new Animated.Value(0);
  
  Animated.timing(colorAnim, { toValue: 1, duration: 400, useNativeDriver: false }).start(() => setRenders((renders + 1) % interpolationOptions.length));

  const animatedTexts = Array(name.length).fill(0).map((_, i) => <Animated.Text style={{ color: colorAnim.interpolate({ inputRange: [0, 1], outputRange: interpolationOptions[(renders + i) % interpolationOptions.length] }) }} key={uuid()}>{ name[i] }</Animated.Text>);

  return (
    <SafeAreaView style={styles.main}>
        <Text style={styles.description}>
          {'\t\t\t\t'}Acest joc a fost facut din plictiseala, intentia acestui proiect fiind strict pentru invatarea framework-ului "React Native". Ideea am preluat-o dintr-un joc de pe mobil numit "Lapse". Daca iti place acest tip de joc, iti recomand sa-l incerci. Nu vei regreta :)
        </Text>
        <Text style={styles.copyright}>
          { animatedTexts }
        </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
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

    textShadowColor: "red",
    textShadowOffset: {width: 2, height: -1},
    textShadowRadius: 5,
  },
});

export default About;