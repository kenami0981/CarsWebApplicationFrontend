import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../API/axios";
import { User } from "../Models/User";
import { useAuth } from "../Context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);

    try {
      const response = await api.post<User>("/account/register", {
        email,
        password,
        displayName,
        userName,
      });

      // zapis usera + tokenu
      login(response.data);

      // 👉 po rejestracji od razu do /cars
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
    <div>
      <h2>Register</h2>

      <input
        placeholder="Display name"
        value={displayName}
        onChange={e => setDisplayName(e.target.value)}
      />

      <input
        placeholder="Username"
        value={userName}
        onChange={e => setUserName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={submit} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
}
