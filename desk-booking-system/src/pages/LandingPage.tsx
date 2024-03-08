//import libraries and components
import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import UserHeader from "../components/user/home/UserHeader";
import AdminHeader from "../components/admin/home/AdminHeader";
import CookiePrivacyModal from "../Components/user/booking/CookiePrivacyModal";
import { useGetUserProfile } from "./../hooks/userHooks/users/useGetUserProfile";

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
      <section className=" bg-white max-sm:bg-[#B6EDFF] max-lg:bg-[url(src/Images/background_mobile.png)] ">
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8 lg:py-16 max-sm:p-0 max-sm:h-[80vh] ">
          <div
            className={`bg-[url(src/Images/heroImage.png)] bg-no-repeat bg-right max-lg:bg-none   `}
            style={{ backgroundSize: "60%" }}
          >
            <div className="flex flex-col gap-2 px-20 lg:py-24 max-lg:w-full max-lg:px-10 ">
              <h2 className="text-5xl font-bold  w-[18rem] max-sm:text-3xl max-lg:w-full max-sm:mt-10 ">
                Book Your Desk,Book Your Success
              </h2>

              <div className="flex flex-row gap-2">
                <div className=" bg-[#E8EEF3] w-[15%] h-[10rem] rounded-lg p-2 max-lg:w-[50%] max-sm:h-[10rem]  ">
                  <p className=" text-[#656F77] text-sm mb-1 ">Your Desk</p>
                  <p className="font-semibold ">
                    Book your Desk, With Ultimate Options, Flex and Fix
                  </p>
                </div>
                <div className=" bg-[#E8EEF3] w-[15%] h-[10rem] rounded-lg p-2 max-lg:w-[50%] max-sm:h-[10rem] ">
                  <p className=" text-[#656F77] text-sm mb-1 ">Your Succes</p>
                  <p className="font-semibold ">
                    In the realm of digital expanse, where cyberspace dances
                  </p>
                </div>
              </div>
              {data && token && data.isAdmin ? (
                <div className="flex flex-row font-semibold text-white ">
                  <a
                    href="/admin/adminpanel"
                    className=" bg-[#4E6AF0] hover:bg-[#2f4cdc]  w-fit py-2 px-8 rounded-[16px] "
                  >
                    Admin Pannel
                  </a>
                </div>
              ) : data && token ? (
                <div className="flex flex-row gap-2 pl-5 font-semibold text-white max-sm:flex-col max-sm:justify-center max-sm:items-center ">
                  <a
                    href="/userlanding"
                    className=" bg-[#4E6AF0] hover:bg-[#2f4cdc]  w-fit py-2 px-4 rounded-[16px] max-sm:px-6 max-sm:py-[0.6rem] "
                  >
                    My Dashboard
                  </a>
                  <a
                    href="/profile"
                    className=" bg-white text-black border-2 border-black hover:bg-[#4E6AF0]  w-fit py-2 px-8 rounded-[16px] hover:text-white max-sm:px-[2.2rem] max-sm:py-[0.4rem] "
                  >
                    My Profile
                  </a>
                </div>
              ) : (
                <div className="flex flex-row pl-10 font-semibold text-white max-lg:justify-center max-lg:pl-0 ">
                  <a
                    href="/login"
                    className=" bg-[#4E6AF0] hover:bg-[#2f4cdc]  w-fit py-2 px-8 rounded-[16px] max-lg:px-12  "
                  >
                    Sign In
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <CookiePrivacyModal />
      <Footer />
    </div>
  );
};

export default LandingPage;
