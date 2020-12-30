import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, Animated } from 'react-native';
import cardIcon from 'root/assets/card_icon.png';

const screen = Dimensions.get("window");

const map = (x, a, b, c, d) => (x-a)/(b-a)*(d-c)+c;
const nothing  = () => {};
const animDuration = 400;

let count = 0;

const Card = ({ props }) => {
    const { offset, id, gameEvent, visible, source, updateStatsLevel, removeCard } = props;

    const [posX, setPosX] = useState(0);
    const [animInfo, setAnimInfo] = useState({ animate: false, anim: new Animated.Value(0), toValue: 0 });

    Animated.timing(animInfo.anim, { toValue: animInfo.toValue, duration: animDuration, useNativeDriver: true }).start();

    const rot = animInfo.anim.interpolate({ inputRange: [-screen.width/2, screen.width/2], outputRange: ["-35deg", "35deg"] });

    const handleTouchMove = visible ? (e => count++ % 2 === 0 ? setPosX(e.nativeEvent.pageX - screen.width/2) : nothing()) : nothing;

    const fadeTo = dir => {
        const option = dir === -1 ? gameEvent.left : gameEvent.right;

        animateFade(dir * 1.1 * screen.width);

        setTimeout(() => {
            updateStatsLevel(Array.from(option.effect));
            removeCard();
        }, animDuration);
    };

    const handleTouchEnd = visible ? (() => (Math.abs(posX) > screen.width / 4) ? fadeTo(posX < 0 ? -1 : 1) : setPosX(0)) : nothing;

    const animateFade = toValue => setAnimInfo({ animate: true, anim: new Animated.Value(posX), toValue: toValue });

    return (
        <Animated.View 
            style={{
                ...styles.main,
                top: -offset, 
                transform: [
                    { translateX: animInfo.animate ? animInfo.anim : posX - offset },
                    { rotate: animInfo.animate ? rot : map(posX, -screen.width / 2, screen.width / 2, -35, 35) + "deg" },
                ],
                backgroundColor: visible ? "rgb(148, 33, 0)" : "rgb(99, 22, 0)",
            }}
            onTouchStart={handleTouchMove}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >

            <Text style={{ ...styles.decision, ...styles.decisionLeft, opacity: map(posX, 0, screen.width / 8, 0, 1) }}> { gameEvent.right.decision || "Da" } </Text>
            <Text style={{ ...styles.decision, ...styles.decisionRight, opacity: map(posX, 0, -screen.width / 8, 0, 1) }}> { gameEvent.left.decision || "Nu" } </Text>
            
            { visible ? <VisibleFace gameEvent={gameEvent} source={source}/> : <Image source={cardIcon} style={styles.backImg}/> }
        </Animated.View>
    );
};

const VisibleFace = ({ gameEvent, source }) => {
    return (
        <View style={styles.visibleFace}>
            <SizedBox height={"20%"}/>
            <Text style={styles.question}> " { gameEvent.q } " </Text>

            <Image source={source} style={styles.avatar}/>
            <Text style={styles.name}> { gameEvent.name } </Text>
        </View>
    );
};

const SizedBox = ({ height }) => <View style={{ height }}></View>

const styles = StyleSheet.create({
    main: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 30,
        borderStyle: "solid",
        borderWidth: 2,

        justifyContent: "center",
        alignItems: "center",
    },
    decision: {
        position: "absolute",
        color: "#00ffff",
        top: 0,
        width: "47%",
        fontSize: 18,
        padding: 25,
    },
    decisionLeft: {
        textAlign: "left",
        left: 0,
    },
    decisionRight: {
        textAlign: "right",
        right: 0,
    },
    backImg: {
        width: "100%",
        height: "70%",
        opacity: 0.5,
    },
    visibleFace: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    question: {
        color: '#fff',
        fontSize: 18,
        paddingHorizontal: 30
    },
    name: {
        color: "#fff",
        position: "absolute",
        bottom: 20,
        fontSize: 18,
    },
    avatar: {
        width: "100%",
        height: 150,
        resizeMode: "contain",
    },
});

export default Card;