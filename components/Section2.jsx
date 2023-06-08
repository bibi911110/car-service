import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../styles/global';

const Section2 = ({ state, step, handleDone, handleChange }) => {
    return (
        <View>
            <Text style={styles.selectedTitle}>{step === 'passenger' ? 'Passenger' : 'Driver'}</Text>
            <View style={styles.inputWrapper}>
                <TextInput
                    value={state.name}
                    onChangeText={(text) => handleChange('name', text)}
                    placeholder='Name'
                    placeholderTextColor='#eee'
                    style={styles.input}
                />
                <TextInput
                    value={state.address}
                    onChangeText={(text) => handleChange('address', text)}
                    placeholder='Address'
                    placeholderTextColor='#eee'
                    style={styles.input}
                />
                <TextInput
                    value={state.comment}
                    onChangeText={(text) => handleChange('comment', text)}
                    editable
                    multiline
                    numberOfLines={6}
                    textAlignVertical='top'
                    placeholder='Comment'
                    placeholderTextColor='#eee'
                    style={styles.textarea}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleDone}>
                <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Section2;
