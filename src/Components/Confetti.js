import React from 'react';
import { Animated, StyleSheet, Image, Dimensions } from 'react-native';

import source from 'root/assets/confetti.png';

const screen = Dimensions.get("window");

const random = (min, max) => Math.random() * (max - min) + min;

const Confetti = props => {
    const posY = new Animated.Value(-150 + random(-100, 100));

    Animated.timing(posY, { toValue: screen.height + 100, duration: random(2000, 3000), useNativeDriver: false }).start();

    return (
        <Animated.View style={{...styles.main, top: posY, left: random(0, screen.width)}} pointerEvents="none">
            <Image source={source} style={{ ...styles.image, width: props.width, height: props.width }}/>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    main: {
        position: "absolute",
    },
    image: {
        resizeMode: "contain", 
    },
});

export default Confetti;