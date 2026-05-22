import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../auth/context/authContext";

export default function Header() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header className="topbar">
      <div className="topbar-brand">
        <Link to="/main" className="brand-link">SmartHome</Link>

        <nav className="topbar-nav">
          <NavLink
            to="/main"
            end
            className={({ isActive }) =>
              isActive ? "topbar-nav-link active" : "topbar-nav-link"
            }
          >
            Home
          </NavLink>
        </nav>
      </div>

      <div className="user-section">
        <span className="user-greeting">Hello, {user.name}</span>
        <button className="auth-button" onClick={logout}>Logout</button>
      </div>
    </header>
  );
}
