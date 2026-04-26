import React, { useState } from "react";

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple authentication: check if userId and password are not empty
    if (userId.trim() === "" || password.trim() === "") {
      setError("Please enter both ID and password");
      return;
    }

    // Sample credentials (hardcoded for demo)
    if (userId === "admin" && password === "password") {
      // Store auth token/user info in localStorage (for backup)
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", userId);
      console.log("Login successful. Credentials stored in localStorage.");
      console.log("Redirecting to dashboard at http://localhost:3001...");

      // Redirect to dashboard on port 3001 with credentials as URL params
      window.location.href = `http://localhost:3001?authenticated=true&userId=${encodeURIComponent(userId)}`;
    } else {
      setError("Invalid ID or password");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Investra Login</h2>

              <img
                src="media/images/logo.svg"
                alt="Logo"
                className="d-block mx-auto mb-4"
                style={{ width: "320px" }}
              />

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="userId" className="form-label">
                    User ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="userId"
                    placeholder="Enter your ID"
                    value={userId}
                    onChange={(e) => {
                      setUserId(e.target.value);
                      setError("");
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  style={{ marginBottom: "15px" }}
                >
                  Login
                </button>
              </form>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
