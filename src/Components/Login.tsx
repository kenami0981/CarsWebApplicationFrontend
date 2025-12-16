import { useState } from "react";
import api from "../API/axios";
import { User } from "../Models/User";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const response = await api.post<User>("/account/login", {
      email,
      password,
    });

    const user = response.data;

    localStorage.setItem("jwt", user.token);
    console.log(user.userName);
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
