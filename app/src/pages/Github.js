import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'

const Github = ({ session }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    if (!session) {
        const va = localStorage.getItem('session');
        session = JSON.parse(va);
    }

    const sendToApi = async () => {
        setLoading(true)
        try {
            const opt = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(session)
            }
            await Axios.post("http://localhost:8080/api/github", opt)
        } catch (error) {
            console.log("error: " + error.message)
        } finally {
            setLoading(false)
        }
    }

    const getAllRepos = async (req, res) => {
        setLoading(true)
        try {
            const opt = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(session)
            }
            const { data, error } = await Axios.post("http://localhost:8080/api/getAllRepos", opt)
            if (error) {
                throw error
            }
            setData(data)
            if (data != undefined) {
                const reposElement = document.getElementById("repos");
                if (reposElement !== null) {
                    reposElement.value = data;
                }
            }
        } catch (error) {
            console.log("error: " + error.message)
        } finally {
            console.log("data", data)
            setLoading(false)
        }
    }

    const displayRepos = () => {
        console.log("data: ", data)
        if (data !== null && data !== undefined && data.status !== 400) {
            const reposList = data.repos.map((repo) => (
                <li key={repo.id}>
                    <a href={repo.html_url}>{repo.name}</a>
                </li>
            ));
            return <ul id="repos">{reposList}</ul>;
        } else {
            return null;
        }
    };

    return (
        <div aria-live="polite">
            {loading ? ('Saving ...') : (
                <div className="card">
                    <h1>Github Page</h1>
                    <button type="button" className="button block" onClick={() => sendToApi()}>
                        Send to API
                    </button>
                    <button type="button" className="button block" onClick={() => getAllRepos()}>
                        Get all repos
                    </button>
                    <div>
                        <h2>Repos</h2>
                            {displayRepos()}
                        <h2>----------------</h2>
                    </div>
                    <button type="button" className="button block" onClick={() => navigate('/')}>
                        Return main menu
                    </button>
                </div>
            )
            }
        </div>
    )
}

export default Github