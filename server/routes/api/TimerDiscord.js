const supabase = require('./supabaseClient');
const {sendmess} = require('./apiDiscord')

const timerdiscord = async () => {
    try {
        const { data, error } = await supabase
            .from('timer_discord')
            .select('time, message, webhook')
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
                            await sendmess({message:element.message[index], webhook:element.webhook[index]}).catch(err => {
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

module.exports = { timerdiscord };