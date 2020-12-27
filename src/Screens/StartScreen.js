import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';

import infoIcon from 'root/assets/info.png';

const StartScreen = props => {
    
    const goTo = name => props.navigation.navigate(name);

    return (
        <SafeAreaView style={styles.main}>
            <TouchableOpacity onPress={() => goTo("Game")}>
                <View style={styles.startBtn}>
                    <Text style={styles.btnText}>
                        Start
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goTo("About")} style={styles.infoContainer}>
                <Image source={infoIcon} style={styles.infoImg}/>
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