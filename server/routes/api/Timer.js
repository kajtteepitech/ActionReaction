const supabase = require('./supabaseClient');
const sgMail = require('@sendgrid/mail');
const { getCity, getD } = require('./Meteo');
const moment = require('moment-timezone');

const sendTime = async (session, res) => {
    try {
        const { data, error } = await supabase
            .from('timer')
            .select()
            .eq('id', session.id);
        if (error) throw error
        if (data.length !== 0) {
            await supabase.from('timer')
                .update({ hour: session.input_hour, email: session.email, timezone: session.timezone })
                .eq('id', session.id);
        } else {
            await supabase.from('timer')
                .insert({ id: session.id, hour: session.input_hour, email: session.email, timezone: session.timezone }).then((data) => {
                    console.log(data);
                }).catch((error) => {
                    throw new Error(error);
                });
        }
        res.sendStatus(200);
    } catch (error) {
        console.log("error: " + error.message)
        res.sendStatus(400);
    }
}

const getTime = async () => {
    let hour = "";
    let minute = "";
    let email = "";
    let timezone = "";
    try {
        const { data, error } = await supabase
            .from('timer')
            .select("hour, email, timezone")
        if (error) throw error
        if (data.length !== 0) {
            data.forEach(element => {
                [hour, minute] = element.hour.split(":");
                email = element.email;
                timezone = element.timezone;
                const now = moment.tz(timezone);
                const asked = moment().tz(timezone).hours(hour).minutes(minute);
                if (now.hour() === asked.hour() && now.minute() === asked.minute()) {
                    sgMail.setApiKey('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');
                    const msg = {
                        to: email,
                        from: 'hugog11@hotmail.fr',
                        subject: 'It\'s time!',
                        html: `<p>It's "${asked.format('HH:mm')}" in "${timezone}"</p>`,
                    };
                    sgMail.send(msg);
                }
            });
        }
    } catch (error) {
        console.log("error: " + error)
    }
}

const setTimer = (fun) => {
    setInterval(async () => {
        await fun();
    }, 50000);
}

const setTimerMeteo = async (session, hour, res) => {
    try {
        const { data, error } = await supabase
            .from('timer_meteo')
            .select('time')
            .eq('id', session.session.user.id);
        if (error) throw error
        hour = hour + ":00";
        if (data.length !== 0) {
            let times = data[0].time || [];
            times.push(hour);
            console.log(times);
            await supabase
                .from('timer_meteo')
                .update({ time: times, mail: session.session.user.email })
                .eq('id', session.session.user.id)
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    throw new Error(error);
                });
        } else {
            let times = [];
            times.push(hour);
            await supabase
                .from('timer_meteo')
                .insert({ id: session.session.user.id, time: times, mail: session.session.user.email })
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    throw new Error(error);
                });
        }
        res.send(JSON.stringify({ status: 200 }));
    } catch (error) {
        console.log("error: ", error.message)
        res.send(JSON.stringify({ status: 400, error: error.message }));
    }
}

const getMeteoTime = async () => {
    try {
        const { data, error } = await supabase
            .from('timer_meteo')
            .select('time, mail, id')
        if (error) throw error
        if (data.length !== 0) {
            data.forEach(element => {
                element.time.forEach(async (time) => {
                    try {
                        const [hour, minute] = time.split(":");
                        const now = new Date();
                        const asked = new Date();
                        asked.setHours(hour);
                        asked.setMinutes(minute);
                        if (now.getHours() === asked.getHours() && now.getMinutes() === asked.getMinutes()) {
                            let meteoData = await getCity(element.id);
                            if (meteoData === 84)
                                meteoData = await getD(element.id);
                            console.log(meteoData);
                            if (meteoData === 84 || !meteoData)
                                throw new Error("City not found");
                            console.log("autheticate")
                            sgMail.setApiKey('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');
                            console.log("autheticated")
                            const msg = {
                                to: element.mail,
                                from: 'hugog11@hotmail.fr',
                                subject: 'It\'s time!',
                                html: `
                                <h1 className="header">City Name: ${meteoData.name}</h1>
                                <p>Temprature: ${meteoData.main.temp} &deg;C</p>
                                <p>Sunrise: ${new Date(meteoData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
                                <p>Sunset: ${new Date(meteoData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
                                <p>Description: ${meteoData.weather[0].main}</p>
                                <p>Humidity: ${meteoData.main.humidity} %</p>
                            `,
                            };
                            console.log("data received = ", element)
                            console.log("sending", msg)
                            sgMail.send(msg);
                            console.log("sent")
                        }
                    } catch (error) {
                        console.log("error: ", error)
                    }
                });
            });
        }
    } catch (error) {
        console.log("error: ", error)
    }
}

module.exports = { setTimer, sendTime, setTimerMeteo, getTime, getMeteoTime };