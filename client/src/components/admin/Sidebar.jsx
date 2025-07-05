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
              to="/admin/users"
              className={({ isActive }) =>
                isActive
                  ? 'block px-4 py-2 text-white bg-green-400 rounded'
                  : 'block px-4 py-2 text-white bg-green-400 hover:bg-green-500 rounded'
              }
            >
              Users
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/admin/feedback"
              className={({ isActive }) =>
                isActive
                  ? 'block px-4 py-2 text-white bg-green-400 rounded'
                  : 'block px-4 py-2 text-white bg-green-400 hover:bg-green-500 rounded'
              }
            >
              Feedback / Contact Submissions
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/admin/analytics"
              className={({ isActive }) =>
                isActive
                  ? 'block px-4 py-2 text-white bg-green-400 rounded'
                  : 'block px-4 py-2 text-white bg-green-400 hover:bg-green-500 rounded'
              }
            >
              Analytics
            </NavLink>
            <ul className="ml-4 mt-2">
              <li className="mb-2">
                
              </li>
            </ul>
          </li>
          <li className="mb-2">
            <NavLink
              to="/admin/rewards"
              className={({ isActive }) =>
                isActive
                  ? 'block px-4 py-2 text-white bg-green-400 rounded'
                  : 'block px-4 py-2 text-white bg-green-400 hover:bg-green-500 rounded'
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
