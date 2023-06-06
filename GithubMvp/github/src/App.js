import './App.css';
import { useState, useEffect } from 'react';

import { supabase } from './client';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    checkUser();
    window.addEventListener('hashchange', function() {
      checkUser();
    });
  }, [])
  async function checkUser() {
    const user = supabase.auth.user();
    setUser(user);
  }
  async function signInWithGitHub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    })
  }
  
  async function signout() {
    const { error } = await supabase.auth.signOut()
  }
  console.log(user);
  if (user) {
    return (
      <div className="App">
        <h1>Hello, {user.email}</h1>
        <button onClick={signout}>Sign out</button>
      </div>
    )
  }
  return (
    <div className="App">
      <h1>Hello, please sign in!</h1>
      <button onClick={signInWithGitHub}>Sign In</button>
    </div>
  );
}

export default App;