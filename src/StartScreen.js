import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';

import infoIcon from './../assets/info.png';

export default function Timer(props) {
    
    const goTo = name => props.navigation.navigate(name);

    return (
        <SafeAreaView style={styles.startScreen}>
            <TouchableOpacity onPress={() => goTo("Game")}>
                <View style={styles.startBtn}>
                    <Text style={{...styles.text}}>
                        Start
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goTo("About")}>
              <View style={styles.infoContainer}>
                <Image source={infoIcon} style={styles.infoImg}/>
              </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    startScreen: {
        width: "100%",
        height: "100%",
        backgroundColor: "darkblue",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "lightgreen",
        fontSize: 150,
        letterSpacing: 4,
        fontWeight: "bold",
    },
    startBtn: {
        // backgroundColor: "rgb(0, 200, 0)",
        // borderRadius: 10,
        // padding: 30,
    },
    infoContainer: {
      width: 50,
      height: 50,
      backgroundColor: "red"
    },
    infoImg: {
      width: "100%",
      height: "100%",
      resizeMode: "contain",
    },
});