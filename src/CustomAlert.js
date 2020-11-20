import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';

const screen = Dimensions.get("window");

export default function Alert(props) {
    const animDuration = 300;
    const scale = new Animated.Value(0.5);

    Animated.timing(scale, {
        toValue: 1,
        duration: animDuration,
        useNativeDriver: true,
    }).start();

    const handleClick = () => {
        Animated.timing(scale, {
            toValue: 0,
            duration: animDuration,
            useNativeDriver: true,
        }).start();

        setTimeout(() => props.disableAlert(), animDuration);
    };

    return (
        <Animated.View style={{...styles.alert, transform: [{scale}]}}>
            <Text style={styles.title}>
                { props.data.title }
            </Text>
            <Text style={styles.text}>
                { props.data.message }
            </Text>
            <TouchableOpacity style={{width:"100%"}} onPress={handleClick}>
                <View style={styles.button}>
                    <Text style={{color: "#fff", textAlign: "center"}}> OK </Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    alert: {
        backgroundColor: "#bbb",
        position: "absolute",
        height: screen.height * 0.5,
        width: screen.width * 0.95,
        borderRadius: 20,
        alignSelf: "center",

        justifyContent: "space-around",
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        textAlign: "center",
        paddingHorizontal: 60,
        width: "100%",
    },
    text: {
        fontSize: 20,
        textAlign: "center",
        paddingHorizontal: 40,
    },
    button: {
        backgroundColor: "darkgreen",
        paddingVertical: 10,
        width: 80 + '%',
        alignSelf: "center",
    },
});