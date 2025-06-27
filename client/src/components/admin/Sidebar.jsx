import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-100 shadow-md">
      <div className="p-4 text-xl font-bold border-b border-gray-300">
        Admin Panel
      </div>
      <nav className="mt-4">
        <ul>
          <li className="mb-2">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive
                  ? 'block px-4 py-2 text-green-700 bg-green-100 rounded'
                  : 'block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded'
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive
                  ? 'block px-4 py-2 text-green-700 bg-green-100 rounded'
                  : 'block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded'
              }
            >
              Users
            </NavLink>
          </li>
         
          <li className="mb-2">
            <NavLink
              to="/admin/actions"
              className={({ isActive }) =>
                isActive
                  ? 'block px-4 py-2 text-green-700 bg-green-100 rounded'
                  : 'block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded'
              }
            >
              Actions
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/admin/analytics"
              className={({ isActive }) =>
                isActive
                  ? 'block px-4 py-2 text-green-700 bg-green-100 rounded'
                  : 'block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded'
              }
            >
              Analytics
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/admin/rewards"
              className={({ isActive }) =>
                isActive
                  ? 'block px-4 py-2 text-green-700 bg-green-100 rounded'
                  : 'block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded'
              }
            >
              Rewards
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
