const supabase = require('./supabaseClient');

const getData = async (lat, long) => {
    return await fetch(`${'https://api.openweathermap.org/data/2.5'}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${"8463d7baac6b7445c2930bd70464704c"}`)
        .then(res => res.json())
        .then(result => {
            console.log("res data", result);
            return result;
        });
}

const getData2 = async (city) => {
    return await fetch(`${'https://api.openweathermap.org/data/2.5'}/weather/?q=${city}&units=metric&APPID=${"8463d7baac6b7445c2930bd70464704c"}`)
        .then(res => res.json())
        .then(result => {
            console.log("res data2", result);
            return result;
        });
}

const getD = async (id) => {
    try {
        const { data, error } = await supabase
            .from('meteo')
            .select('lat, long')
            .eq('id', id);
        if (error) {
            throw error
        }
        if (data !== null) {
            console.log(data);
            const datab = await getData(data[0].lat, data[0].long)
            console.log("data lat long", datab)
            return datab;
        } else {
            throw new Error("No data");
        }
    } catch (error) {
        console.log("error: " + error.message)
        return 84;
    }
}

const getCity = async (id) => {
    try {
        const { data, error } = await supabase
            .from('meteo')
            .select('city')
            .eq('id', id);
        if (error) {
            throw error
        }
        if (data !== null) {
            if (data[0].city !== null && data[0].city.length > 0) {
                const datab = await getData2(data[0].city);
                console.log("data city", datab)
                return datab;
            }
        } else {
            throw new Error("No data");
        }
    } catch (error) {
        console.log("error: " + error.message)
        return 84;
    }
}

module.exports = {getCity, getData, getData2, getD}