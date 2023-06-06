import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';
import Axios from 'axios';
import './heure.scss';

Array.prototype.contains = function (needle) {
    for (var i in this) {
        if (this[i] == needle)
        return true;
    }
    return false;
}

global.selectedTz = "Europe/Paris";
const Clock = ({}) => {
    const [time, setTime] = useState('');
    const [input, setInput] = useState('');
    let session = JSON.parse(localStorage.getItem('session'));
    const navigate = useNavigate();

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

    const handleInputChange = (event) => {
        console.log(global.selectedTz )
        setInput(event.target.value);
    };

    const setGlobal = (event) => {
        global.selectedTz = event.target.value;
    };

    return (
        <div>
            <div className='top-meteo'>
            <h1>Current time: {time}</h1>
            <select className="my-dropdown" value={global.selectedTz} onChange={(event) => setGlobal(event)}>
                {getAllDropDown()}
            </select>
            </div>
            <h2>Enter the time at which you'll receive a reminder mail</h2>
            <div className='send-mail-hour-input'>
                <input type="text" placeholder="ex. 14:58:00" value={input} onChange={handleInputChange} />
                <button className='button-hour' onClick={() => sendReminderToServer()}>Submit</button>
            </div>
            <button type="button" className="button button-return-main-menu" onClick={() => navigate('/')}>
                Return main menu
            </button>
        </div>
    );
};

export default Clock;