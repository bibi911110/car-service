import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/global';

const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Car Service</Text>
        </View>
    );
};

export default Header;
