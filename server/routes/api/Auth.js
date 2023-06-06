const supabase = require('./supabaseClient');

async function getAuth (email, res) {
    // const { error } = await supabase.auth.signInWithOtp({ email });
    try {
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) {
            res.sendStatus(error);
            throw error;
        };
        res.send(200);
    } catch (error) {
        console.log('error: ', error);
    }
}

module.exports = { getAuth };