import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
 const [user, setUser] = useState(() => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
});

  const navigate = useNavigate();



  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl px-5 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link
            to="/"
            className="text-1xl font-bold text-primary font-mono tracking-tight"
          >
            Notely.AI
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              to="/create"
              className="btn btn-primary gap-2"
            >
              <PlusIcon size={18} />
              Create Note
            </Link>

          {user ? (
  <div className="dropdown dropdown-end">
    {/* Circle avatar */}
    <button
      tabIndex={0}
      className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm"
      title={user.username} // hover shows full username
    >
      {user.username.charAt(0).toUpperCase()}
    </button>

    {/* Dropdown content */}
    <ul
      tabIndex={0}
      className="dropdown-content menu bg-base-100 rounded-box z-[50] w-52 p-3 shadow"
    >
      {/* User info */}
      <li className="mb-2 border-b border-gray-200 pb-2">
        <p className="font-bold text-sm">{user.username}</p>
        {user.fullname && <p className="text-xs text-gray-500">{user.fullname}</p>}
        <p className="text-xs text-gray-400">{user.email}</p>
      </li>

      {/* Logout */}
      <li>
        <button onClick={handleLogout} className="text-sm hover:bg-gray-100 rounded">
          Logout
        </button>
      </li>
    </ul>
  </div>
) : (
  <Link to="/login" className="btn btn-outline">
    Login
  </Link>
)}

          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
