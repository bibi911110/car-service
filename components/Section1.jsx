import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, Text } from 'react-native';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from '../styles/global';

const Section1 = ({ state, handleNextStep, handleChange, handleDate }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        hideDatePicker();
        handleDate(moment(date).format('YYYY-MM-DD'));
    };

    return (
        <View>
            <View style={styles.inputWrapper}>
                <TextInput
                    value={state.driver}
                    onChangeText={(text) => handleChange('driver', text)}
                    placeholder='Driver'
                    placeholderTextColor='#eee'
                    style={styles.input}
                />
                <TextInput
                    value={state.vehicle}
                    onChangeText={(text) => handleChange('vehicle', text)}
                    placeholder='Vehicle'
                    placeholderTextColor='#eee'
                    style={styles.input}
                />
                <TextInput
                    value={state.plate}
                    onChangeText={(text) => handleChange('plate', text)}
                    placeholder='Plate'
                    placeholderTextColor='#eee'
                    style={styles.input}
                />
                <TouchableOpacity onPress={showDatePicker} activeOpacity={1}>
                    <TextInput value={state.date} editable={false} placeholder='Date' placeholderTextColor='#eee' style={styles.input} />
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.button} onPress={() => handleNextStep('passenger')}>
                    <Text style={styles.buttonText}>Passenger</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleNextStep('driver')}>
                    <Text style={styles.buttonText}>Driver</Text>
                </TouchableOpacity>
            </View>
            <DateTimePickerModal
                date={state.date ? new Date(state.date) : new Date()}
                isVisible={isDatePickerVisible}
                mode='date'
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
};

export default Section1;
