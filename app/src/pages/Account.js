import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'
import { useState } from 'react'
import './Account.css'

Array.prototype.contains = function (needle) {
    for (var i in this) {
        if (this[i] == needle)
            return true;
    }
    return false;
}

const Account = ({ session }) => {
    const all_opt = ['discord', 'github', 'meteo', 'Opendoor', 'heure', 'youtube']
    const all_links_pict = ['', '', '', '', '', '', ''] //tab of links to pictures
    const [loading, setLoading] = useState(false)
    const all_oauth = ['discord', 'github', 'google', 'twitter']
    const navigate = useNavigate();

    const getToken = async (provider) => {
        let test = false;
        try {
            setLoading(true)
            let { user } = session;
            user.identities.forEach(element => {
                if (element.provider === provider) {
                    test = true;
                }
            });
            if (!test && all_oauth.contains(provider)) {
                const { data } = await supabase.auth.signInWithOAuth({ provider: provider }).catch(err => {
                    console.log(err);
                    throw err;
                });
                user = data.user;
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
            navigate('/' + provider);
        }
    }

    const getAllButton = () => {
        console.log('all buttons', all_links_pict);
        return all_opt.map((provider, index) => (
            <button img={all_links_pict[index]} type="button" className="button button-action" onClick={() => getToken(provider)}>
                {provider}
            </button>
        ));
    }

    const handleDownload = async () => {
        const { data, error } = await supabase.storage
            .from('public')
            .download('apk/my-app.apk')

        if (error) {
            console.log(error)
            return
        }

        const url = window.URL.createObjectURL(data)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'my-app.apk')
        document.body.appendChild(link)
        link.click()
    }


    return (
        <div aria-live="polite">
            {loading ? ('Saving ...') : (
                <div className="card">
                    <nav>
                        <ul className='ul-action'>
                            {getAllButton()}
                        </ul>
                    </nav>
                    <button type="button" className="button block" onClick={() => supabase.auth.signOut()}>
                        Sign Out
                    </button>
                    <h3>Click here to download mobile version:</h3>
                    <button onClick={handleDownload}>Download for Android</button>
                </div>
            )
            }

        </div>
    )
}

export default Account