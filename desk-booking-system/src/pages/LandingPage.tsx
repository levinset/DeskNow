//import libraries and components
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserHeader from "../components/UserHeader";
import { useGetUserProfile } from "../hooks/useGetUserProfile";
import AdminHeader from "../components/admin/AdminHeader";

//image adreess
const heroImage = "src/Images/heroImage.png";
//main components
export const LandingPage = () => {
  //handle direction
  const { data } = useGetUserProfile();
  const token = localStorage.getItem("accessToken");

  return (
    <div>
      {/* Conditionally render different header components based on user */}
      {data && token && data.isAdmin ? (
        <AdminHeader />
      ) : data && token ? (
        <UserHeader />
      ) : (
        <Header />
      )}
      <section className="">
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8 lg:py-16 ">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
              <img
                alt="Landing Page  Hero Image"
                src={heroImage}
                className="absolute inset-0 object-cover w-full h-full"
              />
            </div>

            <div className="lg:py-24">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Welcome To DeskNow
              </h2>

              <p className="mt-4 text-gray-600">
                The most Efficient, User-friendly software with real-time
                updates desk booking system in the World.
              </p>
              {data && token && data.isAdmin ? (
                <a
                  href="/admin/adminpanel"
                  className="inline-block px-12 py-3 mt-8 text-sm font-medium text-white transition bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
                >
                  My Dashboard
                </a>
              ) : data && token ? (
                <a
                  href="/userlanding"
                  className="inline-block px-12 py-3 mt-8 text-sm font-medium text-white transition bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
                >
                  My Dashboard
                </a>
              ) : (
                <a
                  href="/login"
                  className="inline-block px-12 py-3 mt-8 text-sm font-medium text-white transition bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
                >
                  Get Started Today
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
