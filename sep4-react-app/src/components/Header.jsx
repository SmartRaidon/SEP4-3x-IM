import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header className="topbar">
      <div>SmartHome</div>
      <div className="user-section">
        <span>Hello, {user.name}</span>
        <button className="auth-button" onClick={logout}>Logout</button>
      </div>
    </header>
  );
}