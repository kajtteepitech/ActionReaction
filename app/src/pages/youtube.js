import Axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './youtube.css';

const gapi = async (session, receiverEmail, playlistIds) => {
    if (!session) {
        const va = localStorage.getItem('session');
        session = JSON.parse(va);
    }
    try {
        while (!session) {
            const va = localStorage.getItem('session');
            session = JSON.parse(va);
        }
        const opt = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                session,
                receiverEmail,
                playlistIds,
            }),
        };
        const res = await Axios.post('http://localhost:8080/api/google', opt);
        console.log(res);
        console.log('status: ', res.data.status);
        console.log('is_video: ', res.data.is_video);
        if (res.status === 200) {
            console.log('ok is_video: ', res.data.is_video);
        }
    } catch (error) {
        console.log('error: ' + error.message);
    }
};

const Appyoutube = () => {
    const [receiverEmail, setEmail] = useState('');
    const [playlistIds, setPlaylistId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const session = JSON.parse(localStorage.getItem('session'));
        gapi(session, receiverEmail, playlistIds);
    };

    return (
        <div>
            <form className='form-yt' onSubmit={handleSubmit}>
                <h2>Enter the mail you want to send notifications on and the ID of the YouTube playlist</h2>
                <h3>(ex: flash221282@gmail.com | PLsyQDavE2_nezaFxPianFSaRiYRKd3Rl2)</h3>
                <input type="text" placeholder="Email" value={receiverEmail} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder="Playlist ID" value={playlistIds} onChange={(e) => setPlaylistId(e.target.value)} />
                <button className='button-submit-yt' type="submit">Submit</button>
            </form>
            <button type="button" className="button" onClick={() => navigate('/')}>
                Return main menu
            </button>
        </div>
    );
};

export default Appyoutube;
