import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import 'semantic-ui-css/semantic.min.css'
import { Card } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import "./meteo.scss"

const Meteo = ({ session }) => {
    const [loading, setLoading] = useState(false)
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [data, setData] = useState(null);
    const [city, setCity] = useState("Montpellier");
    const [hour, setHour] = useState(null);
    const [timers, setTimers] = useState(null);
    const [confirmationMail, setConfirmationMail] = useState(false);
    const navigate = useNavigate();

    if (!session) {
        const va = localStorage.getItem('session');
        session = JSON.parse(va);
    }

    const getData = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(result => {
                setData(result)
                console.log(result);
            });
    }

    const getData2 = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/weather/?q=${city}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(result => {
                setData(result)
                console.log(result);
            });
    }

    const getD = async () => {
        const successCallback = (position) => {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
            getData();
            if (data !== null) {
                const wdataElement = document.getElementById("wdata");
                if (wdataElement !== null) {
                    wdataElement.value = data;
                }
            }
        };
        const errorCallback = (error) => {
            console.error(error);
        };
        console.log(session);
        try {
            const { data, error } = await supabase
                .from('meteo')
                .select('lat, long')
                .eq('id', session.user.id);
            if (error) {
                throw error
            }
            if (data !== null) {
                console.log(data);
                setLat(data[0].lat);
                setLong(data[0].long);
            } else {
                navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
            }
        } catch (error) {
            console.log("error: " + error.message)
        } finally {
            setLoading(false)
        }
    }

    const getCity = async () => {
        console.log(session);
        try {
            const { data, error } = await supabase
                .from('meteo')
                .select('city')
                .eq('id', session.user.id);
            if (error) {
                throw error
            }
            console.log("data", data)
            if (data !== null) {
                if (data[0].city !== null && data[0].city.length > 0) {
                    setCity(data[0].city);
                    getData2();
                }
            }
        } catch (error) {
            console.log("error: " + error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCity();
        if (!city)
            getD();
    }, []);

    useEffect(() => {
        console.log("city: ", city);
        if (city !== null && city.length > 0) {
            getData2();
            if (data !== null && data.cod !== '400') {
                const wdataelement = document.getElementById("wdata");
                if (wdataelement !== null) {
                    wdataelement.value = data;
                }
            }
            return;
        }
        if (lat !== null) {
            console.log("Latitude is:", lat);
            document.getElementById("lat").value = lat;
        }
        if (long !== null) {
            console.log("Longitude is:", long);
            document.getElementById("long").value = long;
        }
        if (lat !== null && long !== null) {
            getData();
            if (data !== null && data.cod !== '400') {
                const wdataelement = document.getElementById("wdata");
                if (wdataelement !== null) {
                    wdataelement.value = data;
                }
            }
        }
    }, [lat, long]);

    const CardExampleCard = ({ weatherData }) => {
        console.log(weatherData);
        if (!weatherData || weatherData.cod === '400')
            return (
                <Card>
                    <Card.Content>
                        <Card.Header className="header">No data</Card.Header>
                    </Card.Content>
                </Card>
            )
        return (
            <Card>
                <Card.Content className='card-size'>
                    <Card.Header className="header">City Name: {weatherData.name}</Card.Header>
                    <p>Temprature: {weatherData.main.temp} &deg;C</p>
                    <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
                    <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
                    <p>Description: {weatherData.weather[0].main}</p>
                    <p>Humidity: {weatherData.main.humidity} %</p>
                </Card.Content>
            </Card>
        )
    }

    const save = async () => {
        setLoading(true)
        try {
            console.log(session);
            const { data, error } = await supabase
                .from('meteo')
                .select()
                .eq('id', session.user.id);
            if (error) throw error
            if (data.length === 0) {
                await supabase
                    .from('meteo')
                    .insert([
                        { lat: lat, long: long, id: session.user.id, city: city },
                    ])
                    .then(({ data, error }) => {
                        if (error) throw error
                        alert('Data saved successfully!')
                    })
            } else {
                await supabase
                    .from('meteo')
                    .update({ lat: lat, long: long, city: city })
                    .eq('id', session.user.id)
                    .then(({ data, error }) => {
                        if (error) throw error
                        alert('Data saved successfully!')
                    })
            }
        } catch (error) {
            alert('Data not saved!')
            console.log('error: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const getCurrentLocation = () => {
        const successCallback = (position) => {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
            getData();
            if (data !== null) {
                const wdataElement = document.getElementById("wdata");
                if (wdataElement !== null) {
                    wdataElement.value = data;
                }
            }
        };
        const errorCallback = (error) => {
            console.error(error);
        };
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }

    const getSavedLocation = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('meteo')
                .select('lat, long')
                .eq('id', session.user.id);
            if (error) throw error
            if (data !== null) {
                console.log(data);
                setLat(data[0].lat);
                setLong(data[0].long);
            }
        } catch (error) {
            console.log("error: " + error.message)
        } finally {
            setLoading(false)
        }
    }

    const addTimer = async () => {
        setLoading(true)
        try {
            const opt = {
                Headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ time: hour, session }),
            }
            const data = await Axios.post('http://localhost:8080/api/timer_meteo', opt);
            if (data.status !== 200 || data.data.error) {
                throw new Error(data.data.error);
            }
        } catch (error) {
            console.log("error: " + error.message)
        } finally {
            setLoading(false)
        }
    }

    const getAllExistentTimer = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('timer_meteo')
                .select('id, mail, time')
                .eq('id', session.user.id);
            if (error) throw error
            if (data !== undefined && data.length !== 0) {
                setTimers(data[0].time);
                setLoading(false);
            } else {
                console.log("No timer");
                setLoading(false);
            }
        } catch (error) {
            console.log("error: " + error.message)
            setLoading(false)
        }
    }

    const printAllTimers = () => {
        console.log("timer", timers)
        if (!timers)
            return (
                <div>
                    <h1>no timer</h1>
                </div>
            )
        const allTimers = timers.map((timer) => (
            <li key={timer}>
                at <strong>{timer}</strong> send a mail to <strong>{session.user.email}</strong>
            </li>
        ));
        return allTimers;
    }

    return (
        <div aria-live="polite">
            {loading ? ('Saving ...') : (
                <div className="card card-meteo">
                    <h1>Weather Report</h1>
                    <div className="input-meteo">
                        <div className="input-group">
                            <h3>latitude</h3>
                            <input className='input-text-meteo' type="float" placeholder="latitude" id="lat" onChange={(event) => { setLat(event.target.value) }} />
                        </div>
                        <div className="input-group">
                            <h3>longitude</h3>
                            <input className='input-text-meteo' type="float" placeholder="longitude" id="long" onChange={(event) => { setLong(event.target.value) }} />
                        </div>
                        <div className="input-group">
                            <h3>City</h3>
                            <input className='input-text-meteo' type="text" placeholder="ville" id="ville" onChange={(event) => { setCity(event.target.value) }} />
                        </div>
                    </div>
                    <div className='save-meteo'>
                        <button type="button" className="button" onClick={() => save()}>
                            Save
                        </button>
                        <button type="button" className="button" onClick={() => getCurrentLocation()}>
                            getCurrentLocation
                        </button>
                        <button type="button" className="button" onClick={() => getSavedLocation()}>
                            getSavedLocation
                        </button>
                        <button type="button" className="button" onClick={() => getData2()}>
                            getFromCity
                        </button>
                    </div>
                    <CardExampleCard weatherData={data} id="wdata" />
                    <div className="service">
                        <h3>Service</h3>
                        <h4>Send at a specific hour:</h4>
                        {printAllTimers()}
                        <h3>Enter a hour: </h3>
                        <div className='input-time-meteo'> 
                            <input type="time" id="hour" name="hour" onChange={(event) => { setHour(event.target.value) }} />
                            <button type="button" className="button" onClick={() => addTimer()}>
                                Add timer
                            </button>
                            <button type="button" className="button" onClick={async () => await getAllExistentTimer()}>
                                Get all timers
                            </button>
                        </div>
                    </div>
                    <button type="button" className="button" onClick={() => navigate('/')}>
                        Return main menu
                    </button>
                </div>
            )}
        </div>
    )
}

export default Meteo