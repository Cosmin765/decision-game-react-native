import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';

const screen = Dimensions.get("window");

const animDuration = 300;
const animate = (anim, toValue) => Animated.timing(anim, { toValue, duration: animDuration, useNativeDriver: true }).start();

const Alert = forwardRef((props, ref) => {
    const [data, setData] = useState(null);
    
    const scale = new Animated.Value(0);

    animate(scale, 1);

    const handleClick = () => {
        animate(scale, 0);

        setTimeout(() => setData(null), animDuration);
    };
    
    useImperativeHandle(ref, () => ({ fireAlert: data => setData(data) }));
    
    if(data) return (
        <Animated.View style={{...styles.alert, transform: [{scale}]}}>
            <Text style={styles.title}> { data.title } </Text>
            <Text style={styles.text}> { data.message } </Text>

            <TouchableOpacity style={styles.button} onPress={handleClick}>
                <Text style={{color: "#fff", textAlign: "center"}}> OK </Text>
            </TouchableOpacity>
        </Animated.View>
    );

    return null;
});

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
        fontWeight: "bold",
    },
    text: {
        fontSize: 20,
        textAlign: "center",
        paddingHorizontal: 40,
    },
    button: {
        backgroundColor: "darkgreen",
        paddingVertical: 10,
        width: "80%",
    },
});

export default Alert;