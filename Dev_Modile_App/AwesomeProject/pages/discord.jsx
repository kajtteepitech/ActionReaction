import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MyComponent = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Hello World!</Text>
            <Text style={styles.paragraph}>This is a React Native component.</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Click me!</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MyComponent;
