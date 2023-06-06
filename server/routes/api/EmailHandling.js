const supabase = require('./supabaseClient');

const signInWithEmail = async (session, res) => {
    try {
        const { data, error } = await supabase?.auth?.signInWithPassword({
            email: session.email,
            password: session.password,
        });
        if (error) {
            throw error;
        } else {
            console.log("Connecté : " + data);
            res.send({ data: data, status: 200 })
        }
    } catch (error) {
        console.log("Erreur : " + error);
        res.send({ data: error, status: 400 })
    }
}

const signUpWithEmail = async (session, res) => {
    try {
        const { data, error } = await supabase?.auth?.signUp({
            email: session.email,
            password: session.password,
        })
        if (error) {
            throw error;
        } else {
            console.log("signed up: " + data);
            res.send({ data: data, status: 200 })
        }
    } catch (error) {
        console.log("error: " + error);
        res.send({ data: error, status: 400 })
    }
}

module.exports = { signInWithEmail, signUpWithEmail };