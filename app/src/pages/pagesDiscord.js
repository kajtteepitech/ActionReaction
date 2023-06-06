import React, { useState } from 'react';
import axios from 'axios';
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom';
import './pagesDiscord.scss'

function DiscordMessageSender() {
    const [mess, setMess] = useState('');
    const [hour, setHour] = useState(null)
    const [timers, setTimers] = useState(null)
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState(null)
    const [wh, setWebh] = useState('')
    const [webhooks, setWebhooks] = useState(null)
    const navigate = useNavigate();
    let session = JSON.parse(localStorage.getItem('session'))

    const sendMessage = (e) => {
        const opt = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ message: mess, webhook: wh })
        }
        if (wh && mess) {
            const ans = axios.post('http://localhost:8080/api/discord', opt)
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
                body: JSON.stringify({ message: mess, session: session, hour: hour, webhook: wh})
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
    }

    const getAllTimer = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('timer_discord')
                .select('time, message, webhook')
                .eq('id', session.user.id)
            if (error) throw new Error("getAllTuimer:", error)
            setMessages(data[0].message)
            setTimers(data[0].time)
            setWebhooks(data[0].webhook)
            if (data.error) {
                throw new Error(data.error.mess)
            }
        } catch (error) {
            console.log("err: " + error.mess)
        } finally {
            setLoading(false)
        }
    }

    const displayTimers = () => {
        if (!timers) {
            return <p>No timers</p>
        }
        if (!messages) {
            return <p>No messages</p>
        }
        if (!webhooks) {
            return <p>No webhooks</p>
        }
        return timers.map((timer, index) => (
            <li key={timer}>
                at {timer} send {messages[index]} to this webhook: {webhooks[index]}
            </li>
        ));
    }

    return (
        <div>
            <h1>Send a mail on Discord</h1>
            <div className='input-message-discord'>
                <label className='message-text-discord'>Message:</label>
                <input type="text" value={mess} onChange={(e) => setMess(e.target.value)} />
                <br />
                <label>Webhook URL:</label>
                <input type="text" value={wh} onChange={(a) => setWebh(a.target.value)} />
            </div>
            <button className='button-send-mes-discord' onClick={sendMessage}>Send</button>
            <div className='set-timer-discord'>
                <input type="time" id="hour" name="hour" onChange={(event) => { setHour(event.target.value) }} />
                <button className="button-set-timer-discord" onClick={saveTimer}>Save</button>
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

export default DiscordMessageSender;