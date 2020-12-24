import React from 'react';
import { StyleSheet, View } from 'react-native';
import Card from './Card';
import uuid from './uuid';

import images from './../data/characters';

const CardsContainer = props => {

    const cards = Array(props.cardsCount).fill(0).map((_, i) => 
        <Card 
            key={uuid()} offset={i * 3} id={uuid()} gameEvent={props.gameEvents[i]} visible={i === props.cardsCount - 1} 
            updateStatsLevel={props.updateStatsLevel} removeCard={props.removeCard} image={images[props.gameEvents[i].id]}
        />
    );

    return (
        <View style={styles.cardsContainer}>
            <View style={styles.cardsHolder}>
                { cards }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardsContainer: {
        flex: 6,
        backgroundColor: "rgb(0, 15, 153)",
        justifyContent: "center",
        alignItems: "center",
    },
    cardsHolder: {
        width: "70%",
        height: "70%",
    },
});

export default CardsContainer;