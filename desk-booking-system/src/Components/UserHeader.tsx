import React from "react";

const UserHeader = () => {
  const imageUrl =
    "https://i.pinimg.com/564x/de/0f/3d/de0f3d06d2c6dbf29a888cf78e4c0323.jpg";

  return (
    <div>
      <div className="lg:px-24 border-b-4  py-5">
        <header className="lg:px-16 px-6 bg-white flex flex-wrap items-center lg:py-0 py-2">
          <div className="flex-1 flex justify-between items-center">
            <h1>DeskNow</h1>
          </div>

          <label for="menu-toggle" class="pointer-cursor lg:hidden block">
            <svg
              className="fill-current text-gray-900 border-2 border-gray-400 rounded toggle icon"
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
                    Favourites
                  </a>
                </li>
                <li>
                  <a
                    className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
                    href="#"
                  >
                    Booking Plan
                  </a>
                </li>

                <li>
                  <a
                    className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
                    href="#"
                  >
                    Reservation
                  </a>
                </li>
              </ul>
            </nav>
            <div
                className="bg-center bg-cover bg-no-repeat rounded-full inline-block h-12 w-12 ml-2"
                style={{ backgroundImage: `url(${imageUrl})` }}
              ></div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default UserHeader;
