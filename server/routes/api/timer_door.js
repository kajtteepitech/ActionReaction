const supabase = require('./supabaseClient');
const axios = require('axios');

const timerdoor = async () => {
    try {
        const { data, error } = await supabase
            .from('timer_door')
            .select('time, doors')
        if (error) throw error
        if (data.length !== 0) {
            data.forEach(element => {
                element.time.forEach(async (time, index) => {
                    try {
                        const [hour, minute] = time.split(":");
                        const now = new Date();
                        const asked = new Date();
                        asked.setHours(hour);
                        asked.setMinutes(minute);
                        if (now.getHours() === asked.getHours() && now.getMinutes() === asked.getMinutes()) {
                            console.log("open door: ", element.doors[index])
                            await axios.get("https://epilogue.arykow.com/api/doors_open?token=qKMrJWl4QOos0woTgrOK8aT48fXZ1NPDYAuPeRsWDMu7YK402FYNsMglGjAoISIP&door_name=" + element.doors[index]).catch(err => {
                                throw new Error(err);
                            });
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

module.exports = { timerdoor };