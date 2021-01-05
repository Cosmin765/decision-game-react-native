import React, { useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';

import NamePrompt from 'components/NamePrompt';

import infoIcon from 'root/assets/info.png';

import { push } from 'src/navigation';
import { getItem, removeItem } from 'src/storage';

const StartScreen = props => {

    const handleStart = () => getItem('username').then(name => name ? push(props.navigation, "Game") : firePrompt());

    const namePromptRef = useRef();

    const firePrompt = () => namePromptRef.current.firePrompt();
    
    return (
        <SafeAreaView style={styles.main}>
            <TouchableOpacity onPress={handleStart}>
                <View style={styles.startBtn}>
                    <Text style={styles.btnText}>
                        Start
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => push(props.navigation, "About")} style={styles.infoContainer}>
                <Image source={infoIcon} style={styles.infoImg}/>
            </TouchableOpacity>

            <NamePrompt ref={namePromptRef}/>

            {/* TODO: delete this */}
            <TouchableOpacity onPress={() => removeItem('username')} style={{position: "absolute", bottom: 0, left: 0, backgroundColor: "red", padding: 20, borderRadius: 20}}>
                <Text style={{color: "#fff"}}> Delete name </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: "100%",
        backgroundColor: "darkblue",
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        color: "lightgreen",
        fontSize: 150,
        letterSpacing: 4,
        fontWeight: "bold",
    },
    startBtn: {

    },
    infoContainer: {
        position: "absolute",
        top: 30,
        right: 30,
        width: 60,
        height: 60,
        padding: 10,
        borderRadius: 20,
        borderColor: "#fff",
        borderWidth: 1,
        backgroundColor: "rgb(30, 30, 30)"
    },
    infoImg: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
});

export default StartScreen;