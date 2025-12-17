import { useState, useRef } from "react";
import { useNavigate } from "react-router";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const passwordRef = useRef("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = passwordRef.current.value;

    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Login failed");
      return;
    }

    localStorage.removeItem("token");
    localStorage.setItem("token", data.token);

    window.dispatchEvent(new Event("storage"));

    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("role", role);

    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="w-full flex justify-center items-start py-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-amber-50/80 border border-amber-100 shadow-lg rounded-3xl px-8 py-10 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-amber-950 tracking-wide mb-4">
          LOGIN
        </h2>

        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}

        <div className="space-y-1">
          <label className="text-sm font-medium text-amber-900">
            Email
          </label>
          <input
            className="w-full p-2.5 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-amber-900">
            Password
          </label>
          <input
            className="w-full p-2.5 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            type="password"
            placeholder="Enter your password"
            ref={passwordRef}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-amber-900">
            Role
          </label>
          <select
            className="w-full p-2.5 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 w-full py-2.5 rounded-full bg-amber-900 text-white font-medium hover:bg-amber-800"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
