import React from 'react';
import { StyleSheet, View, Dimensions, Image, Animated, TouchableWithoutFeedback } from 'react-native';

const map = (x, a, b, c, d) => (x-a)/(b-a)*(d-c)+c;

const screen = Dimensions.get("window");
const statWidth = screen.width / 8;

export default function Stat(props) {
    const heightAnim = new Animated.Value(map(props.lastLevel, 0, props.maxLevel, 0, statWidth));
    
    const levelIncreased = props.currLevel > props.lastLevel;
    
    const colorAnim = props.currLevel === props.lastLevel ? new Animated.Value(255) : new Animated.Value(0);

    Animated.timing(colorAnim, {
        toValue: 255,
        duration: 2000,
        useNativeDriver: false,
    }).start();

    const color = colorAnim.interpolate({
        inputRange: [0, 255],
        outputRange: levelIncreased ? ['rgb(0, 255, 0)', 'rgb(255, 255, 255)'] : ['rgb(255, 0, 0)', 'rgb(255, 255, 255)']
    });

    Animated.timing(heightAnim, {
        toValue: map(props.currLevel, 0, props.maxLevel, 0, statWidth),
        duration: 1000,
        useNativeDriver: false,
    }).start();

    return (
        <TouchableWithoutFeedback onPress={() => props.setAlertData({title: props.title, message: props.description})}>
            <View style={styles.stat}>
                <Animated.View style={{
                    ...styles.fillLevel,
                    height: heightAnim,
                    bottom: 0,
                    backgroundColor: color 
                }}></Animated.View>
                <Image source={props.source} style={styles.image}/>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    stat: {
        backgroundColor: "rgb(150, 150, 150)",
        width: statWidth,
        height: statWidth,
        borderRadius: 50,
        
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    image: {
        width: statWidth * 0.9,
        height: statWidth * 0.9,
    },
    fillLevel: {
        width: "100%",
        position: "absolute",
    },
});