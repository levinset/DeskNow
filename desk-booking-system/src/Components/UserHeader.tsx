//
//importlibraries
import Logo from "../Images/Logo.png";
//
const UserHeader = () => {
  const imageUrl =
    "https://i.pinimg.com/564x/de/0f/3d/de0f3d06d2c6dbf29a888cf78e4c0323.jpg";

  return (
    <div>
      <div className="">
        <header className="flex flex-wrap items-center px-6 py-4 bg-white lg:px-16 lg:py-4">
          <div className="flex items-center justify-between flex-1">
            <img className="w-20 " src={Logo} alt="DeskNow" />
          </div>

          <label
            htmlFor="menu-toggle"
            className="block pointer-cursor lg:hidden"
          >
            <svg
              className="text-gray-900 border-2 border-gray-400 rounded fill-current toggle icon"
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
                  <a
                    className="block px-0 py-3 border-b-2 border-transparent lg:p-4 hover:border-indigo-400"
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="block px-0 py-3 border-b-2 border-transparent lg:p-4 hover:border-indigo-400"
                    href="#"
                  >
                    Favourites
                  </a>
                </li>
                <li>
                  <a
                    className="block px-0 py-3 border-b-2 border-transparent lg:p-4 hover:border-indigo-400"
                    href="#"
                  >
                    Booking Plan
                  </a>
                </li>

                <li>
                  <a
                    className="block px-0 py-3 border-b-2 border-transparent lg:p-4 hover:border-indigo-400"
                    href="#"
                  >
                    Reservation
                  </a>
                </li>
              </ul>
            </nav>
            <div
              className="inline-block w-12 h-12 ml-2 bg-center bg-no-repeat bg-cover rounded-full"
              style={{ backgroundImage: `url(${imageUrl})` }}
            ></div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default UserHeader;
