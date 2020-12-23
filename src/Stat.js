import React from 'react';
import { StyleSheet, View, Dimensions, Image, Animated, TouchableWithoutFeedback } from 'react-native';

const map = (x, a, b, c, d) => (x - a) / (b - a) * (d - c) + c;

const screen = Dimensions.get("window");
const statWidth = screen.width / 8;

export default function Stat(props) {
    const level = props.update ? props.lastLevel : props.currLevel;
    const heightAnim = new Animated.Value(map(level, 0, props.maxLevel, 0, statWidth));
    const colorAnim = (props.currLevel === props.lastLevel || !props.update) ? new Animated.Value(1) : new Animated.Value(0);
    const { title, description } = props.info;
    
    const levelIncreased = props.currLevel > props.lastLevel;

    Animated.timing(colorAnim, { toValue: 1, duration: 1500, useNativeDriver: false }).start();

    const color = colorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: levelIncreased ? ['rgb(0, 255, 0)', 'rgb(255, 255, 255)'] : ['rgb(255, 0, 0)', 'rgb(255, 255, 255)']
    });

    Animated.timing(heightAnim, { toValue: map(props.currLevel, 0, props.maxLevel, 0, statWidth), duration: 1000, useNativeDriver: false }).start();

    return (
        <TouchableWithoutFeedback onPress={() => props.fireAlert({ title, message: description })}>
            <View style={styles.stat}>
                <Animated.View style={{
                    ...styles.fillLevel,
                    height: heightAnim,
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
        bottom: 0,
    },
});