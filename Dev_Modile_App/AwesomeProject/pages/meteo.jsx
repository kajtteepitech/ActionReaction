import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Card } from 'react-native-elements';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import supabase from '../createClient';
import { useRef } from 'react';
import Axios from 'axios';

const Meteo = (session) => {
    const [loading, setLoading] = useState(false);
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [data, setData] = useState(null);
    const [city, setCity] = useState("Montpellier");
    const [hour, setHour] = useState(null);
    const [timers, setTimers] = useState(null);
    const [confirmationMail, setConfirmationMail] = useState(false);
    const navigation = useNavigation();
    const latRef = useRef(null);
    const longRef = useRef(null);

    if (!session) {
        const va = localStorage.getItem('session');
        session = JSON.parse(va);
    }

    const getData = async () => {
        try {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${'8463d7baac6b7445c2930bd70464704c'}`);
            const result = await response.json();
            setData(result);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    const getData2 = async () => {
        try {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${'8463d7baac6b7445c2930bd70464704c'}`);
            const result = await response.json();
            setData(result);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    const getD = async () => {
        const successCallback = (position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            setLat(lat);
            setLong(long);
        };
        const errorCallback = (error) => {
            console.error(error);
        };
        console.log(session);
        try {
            const { data, error } = await supabase
                .from('meteo')
                .select('lat, long')
                .eq('id', session.user.id);
            if (error) {
                throw error;
            }
            if (data !== null) {
                console.log(data);
                setLat(data[0].lat);
                setLong(data[0].long);
            } else {
                navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
            }
        } catch (error) {
            console.log("error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const getCity = async () => {
        console.log(session);
        try {
            const { data, error } = await supabase
                .from('meteo')
                .select('city')
                .eq('id', session.user.id);
            if (error) {
                throw error;
            }
            console.log("data", data);
            if (data !== null) {
                if (data[0].city !== null && data[0].city.length > 0) {
                    setCity(data[0].city);
                    getData2();
                }
            }
        } catch (error) {
            console.log("error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCity();
        if (!city) {
            getD();
        }
    }, []);

    useEffect(() => {
        console.log("city: ", city);
        if (city !== null && city.length > 0) {
            getData2();
            if (data !== null && data.cod !== '400') {
                const wdataelement = document.getElementById("wdata");
                if (wdataelement !== null) {
                    wdataelement.value = data;
                }
            }
            return;
        }
        if (lat !== null) {
            console.log("Latitude is:", lat);
            latRef.current.value = lat;
        }
        if (long !== null) {
            console.log("Longitude is:", long);
            longRef.current.value = long;
        }
        if (lat !== null && long !== null) {
            getData();
            if (data !== null && data.cod !== '400') {
                const wdataelement = document.getElementById("wdata");
                if (wdataelement !== null) {
                    wdataelement.value = data;
                }
            }
        }
    }, [lat, long]);

    const CardExampleCard = ({ weatherData }) => {
        console.log(weatherData);
        if (!weatherData || weatherData.cod === '400') {
            return (
                <Card>
                    <Card.Content>
                        <Card.Title>No data</Card.Title>
                    </Card.Content>
                </Card>
            );
        }
        return (
            <Card>
                <Card.Content style={styles.cardSize}>
                    <Card.Title>City Name: {weatherData.name}</Card.Title>
                    <Card.Content>Temperature: {weatherData.main.temp} &deg;C</Card.Content>
                    <Card.Content>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</Card.Content>
                    <Card.Content>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</Card.Content>
                    <Card.Content>Description: {weatherData.weather[0].main}</Card.Content>
                    <Card.Content>Humidity: {weatherData.main.humidity} %</Card.Content>
                </Card.Content>
            </Card>
        );
    };

    const save = async () => {
        setLoading(true);
        try {
            console.log(session);
            const { data, error } = await supabase.from('meteo').select().eq('id', session.user.id);
            if (error) throw error;
            if (data.length === 0) {
                await supabase.from('meteo').insert([{ lat: lat, long: long, id: session.user.id, city: city }]).then(({ data, error }) => {
                    if (error) throw error;
                    alert('Data saved successfully!');
                });
            } else {
                await supabase.from('meteo').update({ lat: lat, long: long, city: city }).eq('id', session.user.id).then(({ data, error }) => {
                    if (error) throw error;
                    alert('Data saved successfully!');
                });
            }
        } catch (error) {
            alert('Data not saved!');
            console.log('error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };


    const getCurrentLocation = () => {
        const successCallback = (position) => {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
            getData();
            if (data !== null) {
                const wdataElement = document.getElementById("wdata");
                if (wdataElement !== null) {
                    wdataElement.value = data;
                }
            }
        };
        const errorCallback = (error) => {
            console.error(error);
        };
        Geolocation.getCurrentPosition(successCallback, errorCallback);
    }

    const getSavedLocation = async () => {
        setLoading(true);
        try {
            const response = await supabase
                .from('meteo')
                .select('lat, long')
                .eq('id', session.user.id);
            if (response.error) throw response.error;
            if (response.data !== null) {
                console.log(response.data);
                setLat(response.data[0].lat);
                setLong(response.data[0].long);
            }
        } catch (error) {
            console.log("error: " + error.message);
        } finally {
            setLoading(false);
        }
    }

    const addTimer = async () => {
        setLoading(true);
        try {
            const opt = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ time: hour, session }),
            }
            const response = await fetch('http://localhost:8080/api/timer_meteo', opt);
            const data = await response.json();
            if (response.status !== 200 || data.error) {
                throw new Error(data.error);
            }
        } catch (error) {
            console.log("error: " + error.message);
        } finally {
            setLoading(false);
        }
    }

    const getAllExistentTimer = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('timer_meteo')
                .select('id, mail, time')
                .eq('id', session.user.id);
            if (error) throw error;
            if (data !== undefined && data.length !== 0) {
                setTimers(data[0].time);
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.warn("error: " + error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllExistentTimer();
    }, []);

    const printAllTimers = () => {
        if (!timers) {
            return (
                <View>
                    <Text>No timer</Text>
                </View>
            );
        }
        const allTimers = timers.map((timer) => (
            <View key={timer}>
                <Text>
                    at <Text style={{ fontWeight: 'bold' }}>{moment(timer).format('LT')}</Text> send a mail to <Text style={{ fontWeight: 'bold' }}>{session.user.email}</Text>
                </Text>
            </View>
        ));
        return allTimers;
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Saving ...</Text>
            ) : (
                <View style={styles.card}>
                    <Text style={styles.title}>Weather Reporte</Text>
                    <View style={styles.inputMeteo}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>latitude</Text>
                            <TextInput
                                style={styles.inputTextMeteo}
                                placeholder="latitude"
                                keyboardType="decimal-pad"
                                onChangeText={(text) => setLat(text)}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>longitude</Text>
                            <TextInput
                                style={styles.inputTextMeteo}
                                placeholder="longitude"
                                keyboardType="decimal-pad"
                                onChangeText={(text) => setLong(text)}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Ville</Text>
                            <TextInput
                                style={styles.inputTextMeteo}
                                placeholder="ville"
                                onChangeText={(text) => setCity(text)}
                            />
                        </View>
                    </View>
                    <View style={styles.saveMeteo}>
                        <TouchableOpacity style={styles.button} onPress={() => save()}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => getCurrentLocation()}>
                            <Text style={styles.buttonText}>getCurrentLocation</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => getSavedLocation()}>
                            <Text style={styles.buttonText}>getSavedLocation</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => getData2()}>
                            <Text style={styles.buttonText}>getFromVille</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <CardExampleCard weatherData={data} id="wdata" /> */}
                    <View style={styles.service}>
                        <Text style={styles.title}>Service</Text>
                        <Text style={styles.subtitle}>Send at a specific hour:</Text>
                        {printAllTimers()}
                        <Text style={styles.subtitle}>Enter a hour: </Text>
                        <View style={styles.inputTimeMeteo}>
                            <TextInput
                                style={styles.inputTime}
                                placeholder="00:00"
                                keyboardType="numeric"
                                onChangeText={(text) => setHour(text)}
                            />
                            <TouchableOpacity style={styles.button} onPress={() => addTimer()}>
                                <Text style={styles.buttonText}>Add timer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={async () => await getAllExistentTimer()}>
                                <Text style={styles.buttonText}>Get all timers</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => navigate('/')}>
                        <Text style={styles.buttonText}>Return main menu</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

const styles = {
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        padding: 20,
        marginBottom: 20,
    },
    inputMeteo: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    },
    inputTextMeteo: {
        padding: 5,
        border: 'none',
        borderBottom: '1px solid #ccc',
        width: '100%',
        boxSizing: 'border-box',
        fontSize: 16,
        fontWeight: 'bold',
    },
    saveMeteo: {
        display: 'flex',
        gap: 10,
        marginTop: 20,
    },
    button: {
        backgroundColor: '#2196f3',
        border: 'none',
        color: '#fff',
        padding: 10,
        borderRadius: 5,
        cursor: 'pointer',
        fontSize: 16,
        fontWeight: 'bold',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
        transition: 'background-color 0.2s',
    },
    buttonHover: {
        backgroundColor: '#0c7cd5',
    },
    service: {
        marginTop: 20,
    },
    inputTimeMeteo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    timer: {
        marginTop: 10,
    },
    timerItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    strong: {
        fontWeight: 'bold',
    },
};

export default Meteo;