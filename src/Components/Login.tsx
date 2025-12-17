import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../API/axios";
import { User } from "../Models/User";
import { useAuth } from "../Context/AuthContext";
import "../Styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post<User>("/account/login", {
        email,
        password,
      });

      login(response.data);
      navigate("/cars");
    } catch {
      alert("Nieprawidłowy email lub hasło");
    }
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>

      <form onSubmit={submit} className="auth-form">
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

        <button type="submit" className="primary-btn">
          Login
        </button>
      </form>

      <button
        className="back-btn"
        onClick={() => navigate("/register")}
      >
        Create account
      </button>
    </div>
  );
}
