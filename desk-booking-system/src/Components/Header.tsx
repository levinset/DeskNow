import React from "react";
import Logo from '../Images/Logo.jpg'

const Header = () => {

  return (
    <div>
      <div className="lg:px-24 border-b-4  py-10">
        <header className="lg:px-16 px-6 bg-white flex flex-wrap items-center lg:py-0 py-2">
          <div className="flex-1 flex justify-between items-center">
            <img src={Logo} alt="DeskNow"/>
          </div>

          <label for="menu-toggle" class="pointer-cursor lg:hidden block">
            <svg
              className="fill-current text-gray-900"
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
            className="hidden lg:flex lg:items-center lg:w-auto w-full"
            id="menu"
          >
            <nav>
              <ul className="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
                <li>
                  <a
                    className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
                    href="#"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
                    href="#"
                  >
                    Register
                  </a>
                </li>
                <li>
                  <a
                    className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
                    href="#"
                  >
                    Sign in
                  </a>
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
