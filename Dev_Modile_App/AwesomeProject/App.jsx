import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Auth from './pages/Auth';
import Account from './pages/Account';
import supabase from './createClient';
import Discord from './pages/discord';
import Github from './pages/Github';
import Heure from './pages/heure';
import Meteo from './pages/meteo';
import Opendoor from './pages/opendoor';
import PageDiscord from './pages/pageDiscord';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

function App() {
    const [session, setSession] = useState(null);

    useEffect(() => {
        setSession(supabase.auth.session());
        AsyncStorage.setItem('session', JSON.stringify(session));

        supabase.auth.onAuthStateChange((_event, session) => {
            AsyncStorage.setItem('session', JSON.stringify(session));
            setSession(session);
        });
    }, []);

    function HomeScreen({ navigation }) {
        return (!session ? (
            <Auth navigation={navigation} setSession={setSession} />
        ) : (
            <Account navigation={navigation} session={session} setSession={setSession} />
        ))
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Home' }}
                />
                <Stack.Screen
                    name="Discord"
                    component={Discord}
                    options={{ title: 'Discord' }}
                />
                <Stack.Screen
                    name="Github"
                    component={Github}
                    options={{ title: 'Github' }}
                />
                <Stack.Screen
                    name="Heure"
                    component={Heure}
                    options={{ title: 'Heure' }}
                />
                <Stack.Screen
                    name="Meteo"
                    component={Meteo}
                    options={{ title: 'Meteo' }}
                />
                <Stack.Screen
                    name="Opendoor"
                    component={Opendoor}
                    options={{ title: 'Opendoor' }}
                />
                <Stack.Screen
                    name="PageDiscord"
                    component={PageDiscord}
                    options={{ title: 'PageDiscord' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
