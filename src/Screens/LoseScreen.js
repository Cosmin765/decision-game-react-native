import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';

import { replace } from 'src/navigation';

const loseMessage = new Map([
    ["Timp Liber", "Ti-ai planificat prea multe treburi si ai uitat sa mai ai si niste timp liber"],
    ["Note", "Chiar daca e tentant sa nu inveti, trebuie sa te gandesti la efecte"],
    ["Bani", "Banii vin si pleaca, dar la tine doar pleaca"],
    ["Popularitate", "Nu esti tu chiar sufletul petrecerii, este?"]
]);

const screen = Dimensions.get("window");
const statWidth = screen.width / 8;

const LoseScreen = props => {
    const info = props.route.params;

    const handlePress = () => replace(props.navigation, "Game");

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.stat}> 
                <Image source={info.source} style={styles.image}/> 
            </View>

            <Text style={{ color: "#fff", fontSize: 50 }}> Hopa... pierduși? </Text>

            <Text style={styles.message}> { loseMessage.get(info.title) } </Text>

            <TouchableOpacity style={styles.btn} onPress={handlePress}>
                <Text style={{ color: "#000", fontSize: 30 }}> Restart </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: "100%",
        backgroundColor: "red",

        alignItems: "center",
        justifyContent: "space-around",
    },
    btn: {
        backgroundColor: "lightgreen",
        padding: 20,
        width: "60%",
        alignItems: "center",
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "green"
    },
    message: {
        color: "lightgreen",
        textAlign: "center",
        fontSize: 30,
        paddingHorizontal: 50
    },
    image: {
        width: statWidth * 0.9,
        height: statWidth * 0.9,
    },
    stat: {
        borderColor: "#000",
        borderWidth: 5,
        padding: 10,
        borderRadius: 50,
        backgroundColor: "pink",
    },
});

export default LoseScreen;