const axios = require('axios');
const supabase = require('./supabaseClient');

const door = async (name_door, res) => {
    try {
        await axios.get("https://epilogue.arykow.com/api/doors_open?token=qKMrJWl4QOos0woTgrOK8aT48fXZ1NPDYAuPeRsWDMu7YK402FYNsMglGjAoISIP&door_name=" + name_door).catch(err => {
            throw new Error(err);
        });
        res.sendStatus(200);
        console.log("200");
    } catch (error) {
        console.error(error);
        res.send({error: error.message, status: 400})
    }
}

const saveDoor = async (session, door, time, res) => {
    try {
        console.log("sessionsave: ", session)
        console.log("timesave: ", time)
        console.log("doorsave: ", door)
        const { data, error } = await supabase
            .from('timer_door')
            .select('time, doors')
            .eq('id', session.user.id);
        if (error) {
            throw error
        }
        if (data.length !== 0) {
            const { error } = await supabase
                .from('timer_door')
                .update({ time: [...data[0].time, time], doors: [...data[0].doors, door] })
                .eq('id', session.user.id);
            if (error) {
                throw error
            }
            res.sendStatus(200);
        } else {
            const { error } = await supabase
                .from('timer_door')
                .insert([{ id: session.user.id, time: [time], doors: [door] }]);
            if (error) {
                throw error
            }
            res.sendStatus(200);
        }
    } catch (error) {
        console.error(error);
        res.send({error: error.message, status: 400})
    }
}

module.exports = {door, saveDoor};
