import React from 'react';
import { StyleSheet, View, Dimensions, Image, Animated, TouchableWithoutFeedback } from 'react-native';

import { replace } from 'src/navigation';

const map = (x, a, b, c, d) => (x - a) / (b - a) * (d - c) + c;

const screen = Dimensions.get("window");
const statWidth = screen.width / 8;
const animationDuration = 1500;

const handleLose = (navigation, data) => setTimeout(() => replace(navigation, "LoseScreen", data), animationDuration);

const Stat = ({ props }) => {
    const { maxLevel, fireAlert, navigation, currLevel, lastLevel, source } = props;

    const heightAnim = new Animated.Value(map(lastLevel, 0, maxLevel, 0, statWidth));
    const colorAnim = currLevel === lastLevel ? new Animated.Value(1) : new Animated.Value(0);
    
    const { title, description } = props.info;
    
    const levelHasIncreased = currLevel > lastLevel;

    Animated.timing(colorAnim, { toValue: 1, duration: animationDuration, useNativeDriver: false }).start();

    const color = colorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: levelHasIncreased ? ['rgb(0, 255, 0)', 'rgb(255, 255, 255)'] : ['rgb(255, 0, 0)', 'rgb(255, 255, 255)']
    });

    Animated.timing(heightAnim, { toValue: map(currLevel, 0, maxLevel, 0, statWidth), duration: 1000, useNativeDriver: false }).start();

    if(currLevel <= 0) handleLose(navigation, { title, source });

    return (
        <TouchableWithoutFeedback onPress={() => fireAlert({ title, message: description })}>
            <View style={styles.main}>
                <Animated.View style={{
                    ...styles.fillLevel,
                    height: heightAnim,
                    backgroundColor: color 
                }}></Animated.View>
                <Image source={source} style={styles.image}/>
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