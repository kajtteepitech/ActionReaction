import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button } from 'react-native';
import supabase from '../createClient';

const Account = ({ session }) => {
    const all_opt = ['Home', 'Discord', 'Github', 'Heure', 'Meteo', 'Opendoor', 'PageDiscord'];
    const all_links_pict = ['', '', '', '', '', '', '']
    const [loading, setLoading] = useState(false);
    const all_oauth = ['discord', 'github', 'google', 'twitter'];
    const navigation = useNavigation();

    const getToken = async (provider) => {
        let test = false;
        try {
            setLoading(true);
            let { user } = session;
            user.identities.forEach(element => {
                if (element.provider === provider) {
                    test = true;
                }
            });
            if (!test && all_oauth.includes(provider)) {
                const { data } = await supabase.auth.signInWithOAuth({ provider: provider }).catch(err => {
                    console.log(err);
                    throw err;
                });
                user = data.user;
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
            navigation.navigate(provider);
        }
    }

    const getAllButton = () => {
        return all_opt.map((provider) => (
            <Button key={provider} title={provider} onPress={() => getToken(provider)} />
        ));
    }

    return (
        <View>
            {loading ? (<Text>Saving ...</Text>) : (
                <View>
                    <View>
                        {getAllButton()}
                    </View>
                    <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
                </View>
            )}
        </View>
    )
}

export default Account;
