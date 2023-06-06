import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import supabase from '../createClient';

export default function Auth() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');
    const allOAuthProviders = ['github', 'google', 'discord', 'twitch'];
    const supabaseUrl = "https://ctdrtthmzqlqqqnxhxcf.supabase.co"

    async function signInWithEmail() {
        setLoading(true);
        try {
            // const opt = {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Accept': 'application/json'
            //     },
            //     body: JSON.stringify({ is_new_user: false, email: email, password: password })
            // }
            // const res = await axios.post('http://localhost:8080/api/login', opt);
            // if (res.status !== 200) {
            //     throw new Error(res.data.message);
            // }
            // const session = res.data.data;
            const { user, error } = await supabase.auth.signIn({ email: email, password: password });
            if (error) {
                throw new Error(error.message);
            }
            console.log('Utilisateur connecté:', user);
        } catch (error) {
            console.log('Erreur : ', error);
        }
        setLoading(false);
    }

    async function signUpWithEmail() {
        setLoading(true)
        try {
            const opt = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ is_new_user: true, email: email, password: password })
            }
            const res = await axios.post('http://localhost:8080/api/login', opt);
            if (res.status !== 200) {
                throw new Error(res.data.message);
            }
        } catch (error) {
            console.log('Erreur : ', error);
        }
        setLoading(false)
    }

    // const handleLoginOAuth = async (provider) => {
    //     try {
    //         setLoading(true);
    //         const { data, error } = await supabase.auth.signIn({ provider: provider });
    //         console.log("data", data, "\terror", error);
    //         if (error) {
    //             throw new Error(error.message);
    //         }
    //     } catch (error) {
    //         console.log('Erreur : ', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    const handleLoginOAuth = (provider) => {
        try {
            startAsync({
                authUrl: `${supabaseUrl}/auth/v1/authorize?provider=${provider}&redirect_to=${"http://localhost:8081"}`,
                returnUrl: returnUrl,
            }).then(async (response) => {
                if (!response) {
                    return;
                }
                const { user, session, error } = await supabase.auth.signIn({
                    refreshToken: response.params?.refresh_token,
                });
                if (error) {
                    throw new Error(error.message);
                }
            });
        } catch (error) {
            console.log('Erreur : ', error);
        }
    };

    const renderMagicLinkForm = () => {
        return (
            <>
                <Text style={styles.title}>Connectez-vous via un lien magique avec votre e-mail ci-dessous</Text>
                <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="Votre e-mail" keyboardType="email-address" autoCompleteType="email" />
                <TextInput value={password} onChangeText={setPassword} style={styles.input} placeholder="Votre mot de passe" keyboardType="default" autoCompleteType="Password" />
                <TouchableOpacity onPress={() => { setType('magic link'); signUpWithEmail(); }} disabled={loading} style={styles.button}>
                    <Text style={styles.buttonText}>{loading ? 'Inscription...' : 'Inscription'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setType('magic link'); signInWithEmail(); }} disabled={loading} style={styles.button}>
                    <Text style={styles.buttonText}>{loading ? 'Connexion...' : 'Connexion'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setType(""); }} disabled={loading} style={styles.button} >
                    <Text style={styles.buttonText}>Connectez-vous avec OAuth</Text>
                </TouchableOpacity>
            </>
        );
    }

    const getAuthButtons = () => {
        return allOAuthProviders.map((provider) => {
            return (
                <TouchableOpacity key={provider} onPress={async () => { setType("oauth"); await handleLoginOAuth(provider); }} disabled={loading} style={styles.button}>
                    <Text style={styles.buttonText}>Connectez-vous avec {provider}</Text>
                </TouchableOpacity>
            );
        });
    }

    const renderOAuthButtons = () => {
        return (
            <>
                <Text style={styles.title}>Connectez-vous via OAuth ci-dessous</Text>
                {getAuthButtons()}
                <TouchableOpacity onPress={() => { setType("magic link"); }} disabled={loading} style={styles.button}>
                    <Text style={styles.buttonText}>Connectez-vous avec ID</Text>
                </TouchableOpacity>
            </>
        );
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.logo}>Supabase + React</Text>
                {type === 'magic link' ? renderMagicLinkForm() : renderOAuthButtons()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        width: '80%',
    },
    button: {
        backgroundColor: '#007aff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: '80%',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
});
