import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../API/axios";
import { User } from "../Models/User";
import { useAuth } from "../Context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();


  const submit = async () => {
    try {
      const response = await api.post<User>("/account/login", {
        email,
        password,
      });

      // zapis usera + tokenu w kontekście
      login(response.data);

      // 👉 PRZEJŚCIE DO /cars
      navigate("/cars");
    } catch (error) {
      alert("Nieprawidłowy email lub hasło");
    }
  };

  return (
    <div>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={submit}>Login</button>
    </div>
  );
}
