import React, { useRef, forwardRef, useImperativeHandle, useState } from 'react';
import { Animated, StyleSheet, SafeAreaView, TextInput, Dimensions, TouchableOpacity, Text, Keyboard } from 'react-native';

import { setItem } from 'src/storage';

const screen = Dimensions.get("window");

const animationDuration = 300;
const animate = (anim, toValue, callback = () => {}) => Animated.spring(anim, { toValue, duration: animationDuration, useNativeDriver: false }).start(callback);

const NamePrompt = forwardRef((props, ref) => {
    let name = '';
    const [visible, setVisible] = useState(false);

    const handleSubmit = async () => {
        if(name) await setItem('username', name);
        Keyboard.dismiss();
        
        fetch('http://92.83.198.30:5000/store', {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ msg: name })
        });
        
        inputRef.current.clear();
        name = '';

        animate(scale, 0, () => setVisible(false));
    };

    const inputRef = useRef();

    const scale = new Animated.Value(0);

    useImperativeHandle(ref, () => ({ firePrompt: () => animate(scale, 1, () => setVisible(true)) }));
    
    return (
        <Animated.View style={{...styles.main, transform: [ { scale } ]}} pointerEvents={visible ? "auto" : "none"}>
            <SafeAreaView>
                    <TextInput style={styles.textInput} placeholder="Introduceti-va numele..." placeholderTextColor="black" onSubmitEditing={handleSubmit} ref={inputRef} onChange={event => name = event.nativeEvent.text}/>
            </SafeAreaView>

            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}> Submit </Text>
            </TouchableOpacity>
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    main: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightblue",
        borderRadius: 50,
        flexDirection: "row",
        borderWidth: 2,
        borderRadius: 30,
        borderColor: "white",
        height: 80
    },
    textInput: {
        width: screen.width * 0.7,
        padding: 20,
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
        color: "#000",
    },
    btn: {
        backgroundColor: "rgb(0, 210, 100)",
        padding: 5,
        borderRadius: 50,
        height: "100%",
        width: 80,
        justifyContent: "center",
        borderWidth: 2,
    },
});

export default NamePrompt;