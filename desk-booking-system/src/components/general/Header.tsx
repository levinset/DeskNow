//importlibraries
import { Link } from "react-router-dom";
import Logo from "/images/Logo.png";

//base Url
const baseUrl = "/DeskNow";

//
const Header = () => {
  return (
    <div>
      <div className="py-0 border-b-4">
        <header className="flex flex-wrap items-center px-6 py-2 bg-white lg:px-16 lg:py-0">
          <div className="flex items-center justify-between flex-1">
            <img className="w-20 " src={Logo} alt="DeskNow" />
          </div>

          <label
            htmlFor="menu-toggle"
            className="block pointer-cursor lg:hidden"
          >
            <svg
              className="text-gray-900 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <title>menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </label>
          <input className="hidden" type="checkbox" id="menu-toggle" />

          <div
            className="hidden w-full lg:flex lg:items-center lg:w-auto"
            id="menu"
          >
            <nav>
              <ul className="items-center justify-between pt-4 text-base text-gray-700 lg:flex lg:pt-0">
                <li>
                  <Link
                    className="block px-0 py-3 border-b-2 border-transparent lg:p-4 hover:border-indigo-400"
                    to={`${baseUrl}/`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="block px-0 py-3 border-b-2 border-transparent lg:p-4 hover:border-indigo-400"
                    to={`${baseUrl}/register`}
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    className="block px-0 py-3 border-b-2 border-transparent lg:p-4 hover:border-indigo-400"
                    to={`${baseUrl}/login`}
                  >
                    Sign in
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
