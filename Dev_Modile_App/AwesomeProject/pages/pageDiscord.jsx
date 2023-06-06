import React, { useState } from 'react';
import axios from 'axios';
import { supabase } from '../supabaseClient';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

function Discord() {
    const [mess, setMess] = useState('');
    const [hour, setHour] = useState(null);
    const [timers, setTimers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState(null);
    const [wh, setWebh] = useState('');
    const [webhooks, setWebhooks] = useState(null);
    const navigation = useNavigation();
    let session = JSON.parse(localStorage.getItem('session'));

    const sendMessage = () => {
        const opt = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: { message: mess, webhook: wh }
        }
        if (wh && mess) {
            axios.post('http://localhost:8080/api/discord', opt)
                .then(response => {
                    console.log('Message envoyé !');
                })
                .catch(error => {
                    console.log('Erreur lors de l\'envoi du message :', error);
                });
        }
    };

    const saveTimer = async () => {
        setLoading(true)
        try {
            if (!hour) {
                throw new Error("Missing hour")
            }
            const opt = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: { message: mess, session: session, hour: hour, webhook: wh }
            }
            const ans = await axios.post("http://localhost:8080/api/message_save", opt)
            if (ans.status !== 200 || ans.status === 400) {
                throw new Error(ans.error)
            }
        } catch (error) {
            console.log("err: " + error.mess)
        } finally {
            setLoading(false)
        }
    };

    // Function to retrieve all timers from the database
    const getAllTimer = async () => {
        setLoading(true) // Set loading state to true
        try {
            const { data, error } = await supabase // Retrieve data and error from Supabase
                .from('timer_discord')
                .select('time, message, webhook')
                .eq('id', session.user.id)
            if (error) throw new Error("getAllTuimer:", error) // Throw an error if there's an error
            setMessages(data[0].message) // Set the messages state with data from the database
            setTimers(data[0].time) // Set the timers state with data from the database
            setWebhooks(data[0].webhook) // Set the webhooks state with data from the database
            if (data.error) {
                throw new Error(data.error.mess) // Throw an error if there's an error in the data
            }
        } catch (error) {
            console.log("err: " + error.mess) // Log the error
        } finally {
            setLoading(false) // Set loading state to false
        }
    }

    // Function to display all timers retrieved from the database
    const displayTimers = () => {
        if (!timers) {
            return <p>No timers</p> // Return a message if there are no timers
        }
        if (!messages) {
            return <p>No messages</p> // Return a message if there are no messages
        }
        if (!webhooks) {
            return <p>No webhooks</p> // Return a message if there are no webhooks
        }
        return timers.map((timer, index) => ( // Map through the timers array and return a list item for each timer
            <li key={timer}>
                at {timer} send {messages[index]} to this webhook: {webhooks[index]}
            </li>
        ));
    }

    return (
        <div>
            <h1>Envoyer un message sur Discord</h1>
            <div className='input-message-discord'>
                <label className='message-text-discord'>Message:</label>
                <input type="text" value={mess} onChange={(e) => setMess(e.target.value)} />
                <br />
                <label>Webhook URL:</label>
                <input type="text" value={wh} onChange={(a) => setWebh(a.target.value)} />
            </div>
            <button className='button-send-mes-discord' onClick={sendMessage}>Envoyer</button>
            <div className='set-timer-discord'>
                <input type="time" id="hour" name="hour" onChange={(event) => { setHour(event.target.value) }} />
                <button className="button-set-timer-discord" onClick={saveTimer}>Sauvegarder</button>
            </div>
            <div className="timers">
                {displayTimers()}
            </div>
            <button type="button" className="button button-get-timer-discord" onClick={async () => await getAllTimer()}>
                Get all timer
            </button>
            <button type="button" className="button " onClick={() => navigate('/')}>
                Return main menu
            </button>
        </div>
    );
}

const style = {
    container: {
        margin: '50px auto',
        maxWidth: '800px',
        padding: '0 20px',
        textAlign: 'center'
    },
    inputMessageDiscord: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px'
    },
    labelMessageTextDiscord: {
        marginRight: '20px'
    },
    setTimerDiscord: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px'
    },
    buttonSendMesDiscord: {
        backgroundColor: '#4CAF50',
        border: 'none',
        color: 'white',
        padding: '10px 20px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '4px 2px',
        cursor: 'pointer'
    },
    buttonSetTimerDiscord: {
        backgroundColor: '#4CAF50',
        border: 'none',
        color: 'white',
        padding: '10px 20px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '4px 2px',
        cursor: 'pointer'
    },
    buttonGetTimerDiscord: {
        backgroundColor: '#008CBA',
        border: 'none',
        color: 'white',
        padding: '10px 20px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '4px 2px',
        cursor: 'pointer'
    },
    buttonReturnMainMenu: {
        backgroundColor: '#008CBA',
        border: 'none',
        color: 'white',
        padding: '10px 20px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '4px 2px',
        cursor: 'pointer'
    },
    messageError: {
        color: 'red',
        marginTop: '10px'
    },
    timers: {
        marginTop: '20px'
    }
};

export default Discord;