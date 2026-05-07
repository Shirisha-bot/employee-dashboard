import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const employees = [
    { name: "John", email: "john@gmail.com", password: "1111" },
    { name: "David", email: "david@gmail.com", password: "2222" },
    { name: "Sam", email: "sam@gmail.com", password: "3333" }
  ];

  const handleLogin = () => {
    const user = employees.find(
      (emp) =>
        emp.email === email.trim() &&
        emp.password === password.trim()
    );

    if (user) {
      const loginData = {
        id: Date.now(),
        name: user.name,
        email: user.email,
        loginTime: new Date().toLocaleString(),
        logoutTime: null
      };

      localStorage.setItem("currentUser", JSON.stringify(loginData));

      const existing =
        JSON.parse(localStorage.getItem("employees")) || [];

      existing.push(loginData);

      localStorage.setItem("employees", JSON.stringify(existing));

      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      <input
        className="form-control mb-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-2"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;