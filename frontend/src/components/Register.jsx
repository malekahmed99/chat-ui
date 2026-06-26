import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Register({ onNavigate }) {
  const { signUp } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    try {
      await signUp(identifier, password);
      // App.jsx will handle navigation after successful signUp
    } catch (err) {
      setError(err.message || "Failed to register");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo-mark">φ</div>
          <h2>Create an account</h2>
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
              minLength={6}
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              disabled={isSubmitting}
            />
          </div>
          <button type="submit" className="auth-btn" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Sign up"}
          </button>
        </form>
        <p className="auth-footer">
          Already have an account?{" "}
          <button className="link-btn" onClick={() => onNavigate("login")} disabled={isSubmitting}>
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
