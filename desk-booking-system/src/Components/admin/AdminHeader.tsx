//
//importlibraries
const Logo = "/src/Images/Logo.png";
//
const AdminHeader = () => {
  return (
    <div>
      <div className="">
        <header className="flex flex-wrap items-center px-6 py-4 bg-white lg:px-16 lg:py-4">
          <div className="flex items-center justify-between flex-1">
            <img className="w-20 " src={Logo} alt="DeskNow" />
          </div>


          <div
            className="hidden w-full lg:flex lg:items-center lg:w-auto"
            id="menu"
          >
            <nav>
              <ul className="items-center justify-between pt-4 text-base text-gray-700 lg:flex lg:pt-0"></ul>
            </nav>
            <div>
              <a
                className="block px-0 py-3 font-bold border-b-2 border-transparent lg:p-4 hover:border-indigo-400"
                href="/admin/adminpanel"
              >
                Profile
              </a>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default AdminHeader;
