import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'
import axios from 'axios'

const Opendoor = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [hour, setHour] = useState(null)
    const [selectedValue, setSelectedValue] = useState("HUB")
    const [timers, setTimers] = useState(null)
    const [doors, setDoors] = useState(null)
    const all_services = ["HUB", "4eme", "Foyer", "Meetup", "SM1", "SM2", "Stream", "Admissions"]
    let session = JSON.parse(localStorage.getItem('session'))

    const door = async (name_door) => {
        setLoading(true)
        try {
            const opt = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ name_door: name_door })
            }
            const ans = await axios.post("http://localhost:8080/api/door", opt)
            console.log(ans)
            if (ans.status !== 200 || ans.status === 400) {
                throw new Error(ans.error)
            }
        } catch (error) {
            console.log("err: " + error.message)
        } finally {
            setLoading(false)
        }
    }

    const getAllButtons = () => {
        return all_services.map((service) => (
            <button type="button" className="button block" onClick={() => door(service)}>
                Open {service}
            </button>
        ));
    };

    const getAllDropDown = () => {
        return all_services.map((service) => (
            <option key={service} value={service}>
                {service}
            </option>
        ));
    };

    const saveTimer = async () => {
        setLoading(true)
        try {
            if (!hour || !selectedValue) {
                throw new Error("Missing hour or door")
            }
            const opt = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ name_door: selectedValue, session: session, hour: hour })
            }
            console.log("session: ", session)
            const ans = await axios.post("http://localhost:8080/api/door_save", opt)
            console.log(ans)
            if (ans.status !== 200 || ans.status === 400) {
                throw new Error(ans.error)
            }
        } catch (error) {
            console.log("err: " + error.message)
        } finally {
            setLoading(false)
        }
    }

    const getAllTimer = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('timer_door')
                .select('time, doors')
                .eq('id', session.user.id)
            if (error) throw error
            setDoors(data[0].doors)
            setTimers(data[0].time)
            if (data.error) {
                throw new Error(data.error.message)
            }
        } catch (error) {
            console.log("err: " + error.message)
        } finally {
            setLoading(false)
        }
    }

    const displayTimers = () => {
        if (!timers || !doors) {
            return <p>No timers</p>
        }
        return timers.map((timer, index) => (
            <li key={timer}>
                at {timer} open {doors[index]}
            </li>
        ));
    }

    return (
        <div>
            <button type="button" className="button block" onClick={() => navigate('/')}>
                Return main menu
            </button>
            {getAllButtons()}
            <input type="time" id="hour" name="hour" onChange={(event) => { setHour(event.target.value) }} />
            <select value={selectedValue} onChange={(event) => setSelectedValue(event.target.value)}>
                {getAllDropDown()}
            </select>
            <button type="button" className="button block" onClick={async () => await saveTimer()}>
                Save timer
            </button>
            <div className="timers">
                {displayTimers()}
            </div>
            <button type="button" className="button block" onClick={async () => await getAllTimer()}>
                Get all timer
            </button>
        </div>
    );
};

export default Opendoor