import './index.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './pages/Auth'
import Account from './pages/Account'
import Discord from './pages/pagesDiscord'
import Meteo from './pages/meteo'
import Github from './pages/Github'
import Heure from './pages/heure'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Opendoor from './pages/opendoor'
import Appyoutube from './pages/youtube'
const cors = require("cors")

cors({ origin: true })

export default function App() {
    const [session, setSession] = useState(null)
    global.service = "";
    global.sess = session;

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            global.sess = session;
            localStorage.setItem('session', JSON.stringify(session))
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            global.sess = session;
            localStorage.setItem('session', JSON.stringify(session))
        })
    }, [])

    const Home = () => {
        return session ? <Account session={session} /> : <Auth />;
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/discord" element={<Discord />} />
                <Route path="/opendoor" element={<Opendoor />} />
                <Route path="/discord" element={<Discord session={session}/>} />
                <Route path="/meteo" element={<Meteo session={session}/>} />
                <Route path="/github" element={<Github session={session}/>} />
                <Route path="/heure" element={<Heure city="Europe/Paris"/>} />
                <Route path="/youtube" element={<Appyoutube session={session}/>} />
            </Routes>
        </BrowserRouter>
    )
}
