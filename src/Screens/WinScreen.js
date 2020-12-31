import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated, Dimensions, Image } from 'react-native';
import uuid from 'src/uuid'; 

import Confetti from 'components/Confetti';

import endGif from 'root/assets/end.gif';

import { replace } from 'src/navigation';

const screen = Dimensions.get("window");

const dialogues = [
    "Felicitari!",
    "Ai terminat jocul facut de mine :)",
    "O sa o zic in engleza pentru ca in romana suna prea cringe...",
    "Thanks for playing!",
    "Ca recompensa pentru terminarea jocului...",
    "Uite, niste confetti",
    "Bye"
];

const animationDuration = 300;
const animate = (anim, toValue) => Animated.timing(anim, { toValue, duration: animationDuration, useNativeDriver: true }).start();

const confettiWidth = screen.width / 3;

const confettiElements = Array(10).fill(0).map((_, i) => <Confetti key={uuid()} width={confettiWidth}/>);

const WinScreen = props => {
    const [dialogueCount, setDialogueCount] = useState(0);

    const dialogueEl = <Text style={styles.dialogue}> { dialogues[dialogueCount] } </Text>;
    
    const slideAnim = new Animated.Value(screen.width);

    animate(slideAnim, 0);

    const nextDialogue = () => {
        if(dialogueCount === dialogues.length - 1) replace(props.navigation, "About");

        animate(slideAnim, -screen.width);
        setTimeout(() => setDialogueCount(current => current + 1), animationDuration);
    };

    return (
        <View style={styles.main}>
            <Animated.View style={{ ...styles.dialogueContainer, transform: [ { translateX: slideAnim } ] }}>
                { dialogueEl }
            </Animated.View>

            <Image source={endGif} style={{ width: screen.width * 0.8 }}/>

            <TouchableOpacity style={styles.nextBtn} onPress={nextDialogue}>
                <Text style={styles.nextBtnText}> Next </Text>
            </TouchableOpacity>

            { dialogueCount === dialogues.length - 2 ? confettiElements : null }
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        height: "100%",
        width: "100%",
        backgroundColor: "lightgreen",

        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 50,
    },
    nextBtn: {
        backgroundColor: "magenta",
        padding: 20,
        borderRadius: 20,
        borderColor: "indigo",
        borderWidth: 4,
    },
    nextBtnText: {
        fontSize: 35,
        fontWeight: "bold",
        letterSpacing: 5,
        color: "yellow",

        textShadowColor: "darkblue",
        textShadowOffset: { width: 3, height: 2 },
        textShadowRadius: 2,
    },
    dialogue: {
        fontSize: 30,
        textAlign: "center",
        paddingVertical: 100,
        paddingHorizontal: 30,
    },
    dialogueContainer: {
        backgroundColor: "white",
        width: screen.width * 0.8,
        borderWidth: 3,
        borderColor: "red",
        borderRadius: 40,
        borderStyle: "dashed"
    },
});

export default WinScreen;