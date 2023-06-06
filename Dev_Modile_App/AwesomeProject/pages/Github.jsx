import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Axios from 'axios';
import {StackNavigator} from '@react-navigation/native'

const Github = ({ session }) => {
    const navigate = StackNavigator();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    if (!session) {
        const va = localStorage.getItem('session');
        session = JSON.parse(va);
    }

    const sendToApi = async () => {
        setLoading(true);
        try {
            const opt = {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(session),
            };
            await Axios.post('http://localhost:8080/api/github', opt);
        } catch (error) {
            console.log('error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const getAllRepos = async (req, res) => {
        setLoading(true);
        try {
            const opt = {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(session),
            };
            const { data, error } = await Axios.post(
                'http://localhost:8080/api/getAllRepos',
                opt
            );
            if (error) {
                throw error;
            }
            setData(data);
            if (data != undefined) {
                const reposElement = document.getElementById('repos');
                if (reposElement !== null) {
                    reposElement.value = data;
                }
            }
        } catch (error) {
            console.log('error: ' + error.message);
        } finally {
            console.log('data', data);
            setLoading(false);
        }
    };

    const displayRepos = () => {
        console.log('data: ', data);
        if (
            data !== null &&
            data !== undefined &&
            data.status !== 400 &&
            data.repos !== undefined
        ) {
            const reposList = data.repos.map((repo) => (
                <View key={repo.id}>
                    <TouchableOpacity onPress={() => Linking.openURL(repo.html_url)}>
                        <Text style={styles.link}>{repo.name}</Text>
                    </TouchableOpacity>
                </View>
            ));
            return <View style={styles.reposContainer}>{reposList}</View>;
        } else {
            return null;
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <Text style={styles.loading}>Saving ...</Text>
            ) : (
                <View style={styles.card}>
                    <Text style={styles.title}>Github Page</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => sendToApi()}
                    >
                        <Text style={styles.buttonText}>Send to API</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => getAllRepos()}
                    >
                        <Text style={styles.buttonText}>Get all repos</Text>
                    </TouchableOpacity>
                    <View style={styles.repos}>
                        <Text style={styles.subtitle}>Repos</Text>
                        {displayRepos()}
                        <Text style={styles.divider}>----------------</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigate('/')}
                    >
                        <Text style={styles.buttonText}>Return main menu</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        width: '100%',
        marginBottom: 20,
    },
    h1: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007aff',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    repos: {
        marginTop: 10,
        marginBottom: 20,
        width: '100%',
    },
    repoItem: {
        marginBottom: 10,
    },
    repoLink: {
        color: '#007aff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Github;