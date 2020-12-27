import React from 'react';
import { StyleSheet, View, Dimensions, Image, Animated, TouchableWithoutFeedback } from 'react-native';

const map = (x, a, b, c, d) => (x - a) / (b - a) * (d - c) + c;

const screen = Dimensions.get("window");
const statWidth = screen.width / 8;

const Stat = props => {
    const heightAnim = new Animated.Value(map(props.lastLevel, 0, props.maxLevel, 0, statWidth));
    const colorAnim = props.currLevel === props.lastLevel ? new Animated.Value(1) : new Animated.Value(0);
    const { title, description } = props.info;
    
    const levelHasIncreased = props.currLevel > props.lastLevel;

    Animated.timing(colorAnim, { toValue: 1, duration: 1500, useNativeDriver: false }).start();

    const color = colorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: levelHasIncreased ? ['rgb(0, 255, 0)', 'rgb(255, 255, 255)'] : ['rgb(255, 0, 0)', 'rgb(255, 255, 255)']
    });

    Animated.timing(heightAnim, { toValue: map(props.currLevel, 0, props.maxLevel, 0, statWidth), duration: 1000, useNativeDriver: false }).start();

    return (
        <TouchableWithoutFeedback onPress={() => props.fireAlert({ title, message: description })}>
            <View style={styles.main}>
                <Animated.View style={{
                    ...styles.fillLevel,
                    height: heightAnim,
                    backgroundColor: color 
                }}></Animated.View>
                <Image source={props.source} style={styles.image}/>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    main: {
        backgroundColor: "rgb(150, 150, 150)",
        width: statWidth,
        height: statWidth,
        borderRadius: 100,
        
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

export default Stat;