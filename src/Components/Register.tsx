import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../API/axios";
import { User } from "../Models/User";
import { useAuth } from "../Context/AuthContext";
import "../Styles/Login.css";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post<User>("/account/register", {
        email,
        password,
        displayName,
        userName,
      });

      // zapis usera + tokenu w kontekście
      login(response.data);

      // 👉 po rejestracji przejście do /cars
      navigate("/cars");
    } catch (error: any) {
      if (error.response?.data?.errors) {
        alert(
          Object.values(error.response.data.errors)
            .flat()
            .join("\n")
        );
      } else {
        alert("Rejestracja nie powiodła się");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h1>Register</h1>

      <form onSubmit={submit} className="auth-form">
        <label>Display name:</label>
        <input
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          required
        />

        <label>Username:</label>
        <input
          value={userName}
          onChange={e => setUserName(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="primary-btn"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <button
        className="back-btn"
        onClick={() => navigate("/login")}
      >
        Back to login
      </button>
    </div>
  );
}
