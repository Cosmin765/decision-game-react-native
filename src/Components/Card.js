import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, Animated, PanResponder } from 'react-native';
import names from 'root/data/names.json';

import { getItem } from 'src/storage';

const transformString = async str => {
    const keys = [];

    let lastIndex = -1;

    while(true)
    {
        let key = "";
        let index = str.indexOf('$', lastIndex + 1);

        if(index === -1) break;

        for(let i = index + 1; str[i] != ' '; ++i)
            key += str[i];

        lastIndex = index;
    
        keys.push(key);
    }

    for(const key of keys)
    {
        const item = await getItem(key);
        str = str.replace(`$${key} `, item);
    }

    return str;
};

const screen = Dimensions.get("window");
const animDuration = 600;

const Card = props => {
    const { gameEvent, source, updateStatsLevel } = props;

    const [question, setQuestion] = useState(null);

    const pos = useRef(new Animated.ValueXY()).current;
    
    const rot = pos.x.interpolate({ inputRange: [-screen.width/2, screen.width/2], outputRange: ["-35deg", "35deg"] });

    const opacity = {
        left: pos.x.interpolate({ inputRange: [0, screen.width/8], outputRange: [0, 1] }),
        right: pos.x.interpolate({ inputRange: [-screen.width/8, 0], outputRange: [1, 0] })
    };

    const resetPos = () => Animated.spring(pos, { toValue: { x: 0, y: 0 }, useNativeDriver: false, mass: 0.7 }).start();

    const fadeTo = dir => {
        const option = dir === -1 ? gameEvent.left : gameEvent.right;

        Animated.timing(pos, { toValue: { x: dir * 1.1 * screen.width, y: 0 }, useNativeDriver: false, duration: animDuration }).start();

        setTimeout(() => updateStatsLevel(option ? (option.effect || Array(4).fill(0)) : Array(4).fill(0)), animDuration);
    };

    const visible = props.visible !== false;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder : () => visible, // doing this because if it's undefined, it's automatically visible
            onPanResponderMove: Animated.event([null, { dx : pos.x, dy : pos.y }], { useNativeDriver: false }),
            onPanResponderRelease: e => {
                const x = e.nativeEvent.pageX - screen.width / 2;

                if(Math.abs(x) > screen.width / 3) fadeTo(x > 0 ? 1 : -1);
                else resetPos();
            }
        })
    ).current;
    
    if(!visible) return null;

    if(!question) transformString(gameEvent.q).then(str => setQuestion(str));

    return (
        <Animated.View 
            {...panResponder.panHandlers}
            style={{
                ...styles.main,
                transform: [
                    { translateX: pos.x },
                    { translateY: pos.y },
                    { rotate: rot },
                ],
            }}
        >

            <Animated.Text style={{ ...styles.decision, ...styles.decisionLeft, opacity: opacity.left }}> { gameEvent.left ? (gameEvent.right.decision || "Da") : "..." } </Animated.Text>
            <Animated.Text style={{ ...styles.decision, ...styles.decisionRight, opacity: opacity.right }}> { gameEvent.right ? (gameEvent.left.decision || "Nu") : "..." } </Animated.Text>
            
            <View style={styles.visibleFace}>
                <SizedBox height={"20%"}/>
                <Text style={styles.question}> " { question } " </Text>

                <Image source={source} style={styles.avatar}/>
                <Text style={styles.name}> { names[gameEvent.id] } </Text>
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
        width: "70%",
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