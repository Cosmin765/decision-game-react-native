import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Card from './Card';
import uuid from './uuid';

export default function CardsContainer(props) {
    let count = 0; // for assigning values to cards

    const getVisibleCard = () => cards.reduce((prev, curr) => curr.props.offset > prev.props.offset ? curr : prev, cards[0]);

    const cards = Array.from(Array(props.cardsCount).keys()).map(i => 
        <Card 
            key={uuid()} offset={i * 3} id={uuid()} gameEvent={props.gameEvents[count++]} getVisibleCard={getVisibleCard} 
            updateStatsLevel={props.updateStatsLevel} removeCard={props.removeCard}/>
    );

    return (
        <View style={styles.cardsContainer}>
            <View style={styles.cardsHolder}>
                { cards }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardsContainer: {
        flex: 6,
        backgroundColor: "rgb(0, 15, 153)",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#fff",
    },
    cardsHolder: {
        width: 70 + '%',
        height: 70 + '%',
    },
});