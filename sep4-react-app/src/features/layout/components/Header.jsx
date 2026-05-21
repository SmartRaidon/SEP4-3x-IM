import { useAuth } from "../../auth/context/authContext";

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