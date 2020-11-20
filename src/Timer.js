import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Timer(props) {
    return (
        <View style={styles.timer}>
            <Text style={styles.text}>
                Au trecut {props.passed} zile.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    timer: {
        flex: 1,
        backgroundColor: "rgb(50, 50, 50)",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontSize: 16,
    }
});