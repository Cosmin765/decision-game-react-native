import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Card from 'components/Card';
import uuid from 'src/uuid';

import cardIcon from 'root/assets/card_icon.png';

import images from 'root/data/characters';

const CardsContainer = props => {
    let cards = null;

    if(props.gameEvent && props.gameEvent.length) {
        cards = Array(props.gameEvent.length).fill(0).map((_, i) => {
            return <Card key={uuid()} source={images[props.gameEvent[i].id]} {...props} gameEvent={props.gameEvent[i]} visible={i === 0} />
        }).reverse();
    }

    return (
        <View style={styles.cardsContainer}>
            <View style={styles.cardsHolder}>
                { props.illusion ? <CardIllusion /> : null }

                { cards || (props.gameEvent ? <Card key={uuid()} source={images[props.gameEvent.id]} {...props} /> : null) }
            </View>
        </View>
    );
};

const CardIllusion = () => {
    return (
        <View style={styles.cardIllusion}>
            <Image source={cardIcon} style={styles.backImg}/>
        </View>
    );

};

const styles = StyleSheet.create({
    cardsContainer: {
        flex: 6,
        backgroundColor: "rgb(0, 15, 153)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },
    cardsHolder: {
        width: "70%",
        height: "70%",
    },
    cardIllusion: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 30,
        borderStyle: "solid",
        borderWidth: 2,

        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(99, 22, 0)",
        left: 3,
        top: 3,
    },
    backImg: {
        width: "100%",
        height: "100%",
        opacity: 0.5,
        resizeMode: "contain"
    },
});

export default CardsContainer;