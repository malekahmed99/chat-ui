import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Login({ onNavigate }) {
  const { signIn } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await signIn(identifier, password);
      // App.jsx will automatically navigate to chat because accessToken will be set
    } catch (err) {
      setError(err.message || "Failed to login");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo-mark">φ</div>
          <h2>Welcome back</h2>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          <div className="form-group">
            <label>Email or Username</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              minLength={3}
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <button type="submit" className="auth-btn" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="auth-footer">
          Don't have an account?{" "}
          <button className="link-btn" onClick={() => onNavigate("register")} disabled={isSubmitting}>
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
