import { useState } from "react";
import { supabase } from "../supabaseClient";
import axios from "axios";
import "./Auth.scss";
import { FaGithub } from 'react-icons/fa'
import { FaGoogle } from 'react-icons/fa';
import { FaTwitch } from 'react-icons/fa';
import { FaDiscord } from 'react-icons/fa';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios
        .post(
          "http://localhost:8080/api/auth",
          {
            email: email,
            other: type,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then()
        .catch((err) => {
          console.log(err);
          throw err;
        });
    } catch (error) {
      console.log(error);
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlelogin2 = async (e, t) => {
    e.preventDefault();

    try {
      setLoading(true);
      console.log(t);
      const { data } = await supabase.auth
        .signInWithOAuth({ provider: t })
        .catch((err) => {
          console.log(err);
          throw err;
        });
      console.log(data);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      console.log(t);
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-wrapper">
        <div className="form-widget">
          <h1 className="header">Email Sign In</h1>
          <p className="description">
            Sign in via magic link with your email below
          </p>
          {loading ? (
            "Sending magic link..."
          ) : (
            <form onSubmit={handleLogin}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className="inputField"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => {
                  setType("magic link");
                  setEmail(e.target.value);
                }}
              />
              <button className="button block" aria-live="polite">
                Send magic link
              </button>
            </form>
          )}
        </div>
        <div className="form-widget">
          <h1 className="header">Sign In with social media</h1>
          <p className="description">Sign in via a social network below</p>
          {loading ? (
            "redirecting..."
          ) : (
            <form onSubmit={handlelogin2}>
              <button
                className="button button-sign block"
                aria-live="polite"
                onClick={(e) => {
                  setType("github");
                  handlelogin2(e, "github");
                }}
              >
                <FaGithub className="icon" />
                <span className="button-text">Sign in with Github</span>
              </button>
              <button
                className="button button-sign block"
                aria-live="polite"
                onClick={(e) => {
                  setType("google");
                  handlelogin2(e, "google");
                }}
              >
                <FaGoogle className="icon" />
                <span className="button-text">Sign in with Google</span>
              </button>
              <button
                className="button button-sign block"
                aria-live="polite"
                onClick={(e) => {
                  setType("discord");
                  handlelogin2(e, "discord");
                }}
              >
                <FaDiscord className="icon" />
                <span className="button-text">Sign in with Discord</span>
              </button>
              <button
                className="button button-sign block"
                aria-live="polite"
                onClick={(e) => {
                  setType("twitch");
                  handlelogin2(e, "twitch");
                }}
              >
                <FaTwitch className="icon" />
                <span className="button-text">Sign in with Twitch</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
