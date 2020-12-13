import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function Timer(props) {
    
    const handleClick = () => props.navigation.navigate("Game");

    return (
        <View style={styles.startScreen}>
            <TouchableOpacity onPress={handleClick}>
                <View style={styles.startBtn}>
                    <Text style={{...styles.text, fontFamily: 'langar'}}>
                        Start
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    startScreen: {
        width: "100%",
        height: "100%",
        backgroundColor: "darkblue",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "lightgreen",
        fontSize: 150,
        letterSpacing: 4,
        fontWeight: "bold",
    },
    startBtn: {
        // backgroundColor: "rgb(0, 200, 0)",
        // borderRadius: 10,
        // padding: 30,
    },
});