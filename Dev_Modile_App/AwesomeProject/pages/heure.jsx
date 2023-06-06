import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import Axios from 'axios';

Array.prototype.contains = function (needle) {
    for (var i in this) {
        if (this[i] == needle)
            return true;
    }
    return false;
}

global.selectedTz = "Europe/Paris";

const Clock = ({ }) => {
    const [time, setTime] = useState('');
    const [input, setInput] = useState('');
    let session;
    try {
        async () => {
            session = await JSON.parse(AsyncStorage.getItem('session'));
        }
    } catch (error) {
        console.log("error: " + error.message);
    }

    useEffect(() => {
        const fetchTime = async () => {
            console.log(global.selectedTz);
            const time_ = moment.tz(global.selectedTz).format('HH:mm:ss');
            setTime(time_);
        };

        fetchTime();

        const interval = setInterval(() => {
            fetchTime();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const sendReminderToServer = async () => {
        try {
            console.log(session);
            const opt = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    id: session.user.id,
                    email: session.user.email,
                    input_hour: input,
                    timezone: global.selectedTz
                })
            };
            console.log(opt);
            await Axios.post("http://localhost:8080/api/timer_send", opt);
        } catch (error) {
            console.log("error: " + error.message);
        }
    };

    const getAllDropDown = () => {
        return moment.tz.names().map((zone) => (
            <option key={zone} value={zone}>
                {zone}
            </option>
        ));
    };

    const handleInputChange = (value) => {
        console.log(global.selectedTz)
        setInput(value);
    };

    const setGlobal = (value) => {
        global.selectedTz = value;
    };

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.title}>Current time: {time}</Text>
                <View style={styles.dropdownContainer}>
                    <Text style={styles.dropdownLabel}>Select Timezone</Text>
                    <Picker
                        selectedValue={global.selectedTz}
                        onValueChange={(value) => setGlobal(value)}
                    >
                        {getAllDropDown()}
                    </Picker>
                </View>
            </View>
            <Text style={styles.subtitle}>Enter the time at which you'll receive a reminder mail</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="ex. 14:58:00"
                    value={input}
                    onChangeText={handleInputChange}
                />
                <TouchableOpacity style={styles.button} onPress={() => sendReminderToServer()}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.returnButton} onPress={() => navigate('/')}>
                <Text style={styles.returnButtonText}>Return main menu</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    topMeteo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    currenttime: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    dropdown: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 10,
    },
    sendMailHourInput: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    buttonHour: {
        backgroundColor: '#007bff',
        color: '#fff',
        height: 40,
        borderRadius: 4,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonReturnMainMenu: {
        marginTop: 20,
        backgroundColor: '#007bff',
        color: '#fff',
        height: 40,
        borderRadius: 4,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Clock;