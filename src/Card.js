import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, Animated } from 'react-native';
import cardIcon from './../assets/card_icon.png';

const screen = Dimensions.get("window");

const map = (x, a, b, c, d) => (x-a)/(b-a)*(d-c)+c;
const nothing  = () => {};

export default function Card(props) {
    const [posX, setPosX] = useState(0);
    const animDuration = 400;

    const [animInfo, setAnimInfo] = useState({
        animate: false,
        anim: new Animated.Value(0),
        toValue: 0,
    });

    Animated.timing(animInfo.anim, {
        toValue: animInfo.toValue,
        duration: animDuration,
        useNativeDriver: true,
    }).start();

    const rot = animInfo.anim.interpolate({
        inputRange: [-screen.width/2, screen.width/2],
        outputRange: ["-35deg", "35deg"],
    });

    const visible = props.getVisibleCard().props.id === props.id;
    const handleTouchMove = e => setPosX(e.nativeEvent.pageX - screen.width/2);

    const fadeTo = dir => {
        const option = dir === -1 ? props.gameEvent.left : props.gameEvent.right;

        animateFade(dir * 1.1 * screen.width);

        setTimeout(() => {
            props.updateStatsLevel(Array.from(option.effect));
            props.removeCard();
        }, animDuration);
    };

    const handleTouchEnd = e => (Math.abs(posX) > screen.width / 4) ? fadeTo(posX < 0 ? -1 : 1) : setPosX(0);

    const animateFade = toValue => setAnimInfo({
        animate: true,
        anim: new Animated.Value(posX),
        toValue: toValue,
    });

    return (
        <Animated.View 
            style={{
                ...styles.card,
                top: -props.offset, 
                transform: [
                    { translateX: animInfo.animate ? animInfo.anim : posX - props.offset },
                    { rotate: animInfo.animate ? rot : map(posX, -screen.width / 2, screen.width / 2, -35, 35) + "deg" },
                ],
                backgroundColor: visible ? "rgb(148, 33, 0)" : "rgb(99, 22, 0)",
            }}
            onTouchStart={visible ? handleTouchMove : nothing}
            onTouchMove={visible ? handleTouchMove : nothing}
            onTouchEnd={visible ? handleTouchEnd : nothing}
        >

            <Text
                style={{
                    ...styles.decision, ...styles.decisionLeft,
                    opacity: map(posX, 0, screen.width / 8, 0, 1),
                }}
            > { props.gameEvent.right.decision || "Da" } </Text>

            <Text
                style={{
                    ...styles.decision, ...styles.decisionRight,
                    opacity: map(posX, 0, -screen.width / 8, 0, 1),
                }}
            > { props.gameEvent.left.decision || "Nu" } </Text>
            
            { visible ? <VisibleFace gameEvent={props.gameEvent}/> : <Image source={cardIcon} style={styles.img}/> }
        </Animated.View>
    );
}

const VisibleFace = props => {
    return (
        <View style={styles.visibleFace}>
            <Text 
                style={styles.question}

            > " { props.gameEvent.q } " </Text>
            <Text
                style={styles.name}
            > { props.gameEvent.name } </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 100 + '%',
        height: 100 + '%',
        borderRadius: 30,
        borderStyle: "solid",
        borderColor: "#000",
        borderWidth: 2,

        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
    },
    decision: {
        color: "#00ffff",
        position: "absolute",
        top: 0,
        width: 47 + '%',
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
    img: {
        width: 100 + '%',
        height: 70 + '%',
        opacity: 0.5,
    },
    visibleFace: {
        width: 100 + '%',
        height: 100 + '%',
        alignItems: "center",
        justifyContent: "center",
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
});