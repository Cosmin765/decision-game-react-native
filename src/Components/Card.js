import React, { useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, Animated, PanResponder } from 'react-native';

const screen = Dimensions.get("window");

const map = (x, a, b, c, d) => (x-a)/(b-a)*(d-c)+c;
const nothing  = () => {};
const animDuration = 400;

let count = 0;

const Card = props => {
    const { gameEvent, source, updateStatsLevel, removeCard } = props;

    const pos = useRef(new Animated.ValueXY()).current;
    
    const rot = pos.x.interpolate({ inputRange: [-screen.width/2, screen.width/2], outputRange: ["-35deg", "35deg"] });

    const opacity = {
        left: pos.x.interpolate({ inputRange: [0, screen.width/8], outputRange: [0, 1] }),
        right: pos.x.interpolate({ inputRange: [-screen.width/8, 0], outputRange: [1, 0] })
    };

    // let posX = 0;

    // pos.x.addListener(({ x }) => posX = x);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder : () => true,
            onPanResponderMove: Animated.event([null,{ //Step 3
                dx : pos.x,
                dy : pos.y
            }], { useNativeDriver: false }),
            onPanResponderRelease: e => {
                const x = e.nativeEvent.pageX;

                // if(Math.abs(x) > screen.width / 4) fadeTo();
                // else 
            } //Step 4
        })
    ).current;
    

    return (
        <Animated.View 
            {...panResponder.panHandlers}
            style={{
                ...styles.main,
                transform: [
                    { translateX: pos.x },
                    { rotate: rot },
                ],
            }}
        >

            <Animated.Text style={{ ...styles.decision, ...styles.decisionLeft, opacity: opacity.left }}> { gameEvent.right.decision || "Da" } </Animated.Text>
            <Animated.Text style={{ ...styles.decision, ...styles.decisionRight, opacity: opacity.right }}> { gameEvent.left.decision || "Nu" } </Animated.Text>
            
            <View style={styles.visibleFace}>
                <SizedBox height={"20%"}/>
                <Text style={styles.question}> " { gameEvent.q } " </Text>

                <Image source={source} style={styles.avatar}/>
                <Text style={styles.name}> { gameEvent.name } </Text>
            </View>
        </Animated.View>
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
        backgroundColor: "rgb(148, 33, 0)",
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