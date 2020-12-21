import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function About(props) {
  return (
    <View style={styles.about}>
      <Text style={styles.copyright}>©Turtureanu Cosmin</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  copyrightContainer: {
    justifyContent: "center",
    backgroundColor: "rgb(51, 51, 51)",
  },
  copyright: {
    color: "#fff",
  },
});