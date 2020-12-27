import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const LoseScreen = props => {

    return (
        <View style={styles.main}>
            <Text style={styles.text}>
                Lose screen
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: "100%",
        backgroundColor: "red",

        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#fff",
        fontSize: 30,
    },
});

export default LoseScreen;