import React from 'react';
import { Animated, StyleSheet, Image, Dimensions } from 'react-native';

import source from 'root/assets/confetti.png';

const screen = Dimensions.get("window");

const Confetti = props => {
    const posY = new Animated.Value(-150 + props.y);

    Animated.timing(posY, { toValue: screen.height + 100, duration: props.duration, useNativeDriver: false }).start();

    return (
        <Animated.View style={{...styles.main, top: posY, left: props.x}} pointerEvents="none">
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