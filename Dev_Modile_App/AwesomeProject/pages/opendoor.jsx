import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { supabase } from '../supabaseClient';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Opendoor = () => {
    const [loading, setLoading] = useState(false);
    const [hour, setHour] = useState(null);
    const [selectedValue, setSelectedValue] = useState("HUB");
    const [timers, setTimers] = useState(null);
    const [doors, setDoors] = useState(null);
    const all_services = ["HUB", "4eme", "Foyer", "Meetup", "SM1", "SM2", "Stream", "Admissions"];
    let session = JSON.parse(localStorage.getItem('session'));
    const navigation = useNavigation();

    const door = async (name_door) => {
        setLoading(true);
        try {
            const opt = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ name_door: name_door })
            };
            const ans = await axios.post("http://localhost:8080/api/door", opt);
            console.log(ans);
            if (ans.status !== 200 || ans.status === 400) {
                throw new Error(ans.error);
            }
        } catch (error) {
            console.log("err: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const getAllButtons = () => {
        return all_services.map((service) => (
            <TouchableOpacity
                key={service}
                onPress={() => door(service)}
                style={styles.button}>
                <Text style={styles.buttonText}>Open {service}</Text>
            </TouchableOpacity>
        ));
    };

    const getAllDropDown = () => {
        return all_services.map((service) => (
            <Picker.Item key={service} label={service} value={service} />
        ));
    };

    const saveTimer = async () => {
        setLoading(true);
        try {
            if (!hour || !selectedValue) {
                throw new Error('Missing hour or door');
            }
            const opt = {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ name_door: selectedValue, session: session, hour: hour }),
            };
            console.log('session: ', session);
            const ans = await axios.post('http://localhost:8080/api/door_save', opt);
            console.log(ans);
            if (ans.status !== 200 || ans.status === 400) {
                throw new Error(ans.error);
            }
        } catch (error) {
            console.log('err: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const getAllTimer = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.from('timer_door').select('time, doors').eq('id', session.user.id);
            if (error) throw error;
            setDoors(data[0].doors);
            setTimers(data[0].time);
            if (data.error) {
                throw new Error(data.error.message);
            }
        } catch (error) {
            console.log('err: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const displayTimers = () => {
        if (!timers || !doors) {
            return <Text>No timers</Text>;
        }
        return timers.map((timer, index) => (
            <View key={timer} style={styles.timerContainer}>
                <Text style={styles.timerText}>at {timer} open {doors[index]}</Text>
            </View>
        ));
    };


}

export default Opendoor;