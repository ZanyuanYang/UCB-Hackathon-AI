import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  let path = window.location.pathname;

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Yonder
          </span>
        </Link>
        <div className="md:order-2">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/product"
                className={`block py-2 pl-3 pr-4 text-black rounded md:bg-transparent md:p-0 ${path === '/product' ? 'text-blue-700' : 'text-black '
                  }`}
              >
                Product Catalog
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
