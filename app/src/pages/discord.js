import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Discord = ({ session }) => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    return (
        <div aria-live="polite">
            {loading ? ('Saving ...') : (
                <div className="card">
                    <h1>Discord Page</h1>
                    <h3>enter mail to send :</h3>
                    <input type="text" placeholder="email" id="email_notif" />
                    <script>
                        document.getElementById("email_notif").value = session.user.email;
                    </script>
                    <button type="button" className="button block" onClick={() => navigate('/')}>
                        Return main menu
                    </button>
                </div>
            )
            }
        </div>
    )
}

export default Discord