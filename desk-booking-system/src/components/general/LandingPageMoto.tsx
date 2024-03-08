//import libaries and components
import { Link } from "react-router-dom";
import { useGetUserProfile } from "../../hooks/userHooks/users/useGetUserProfile";
//
//base Url
const baseUrl = "/DeskNow";
//
export default function LandingPageMoto() {
  //handle direction
  const { data, isError, isLoading, error } = useGetUserProfile();
  const token = localStorage.getItem("accessToken");
  //
  return (
    <div className="flex flex-col gap-2 px-20 lg:py-24 max-lg:w-full max-lg:px-10 ">
      <h2 className="text-5xl font-bold  w-[18rem] max-sm:text-3xl max-lg:w-full max-sm:mt-10 ">
        Book Your Desk,Book Your Success
      </h2>
      <div className="flex flex-row gap-2">
        <div className=" bg-[#E8EEF3] w-[15%] h-fit rounded-lg p-2 max-lg:w-[50%] max-sm:h-[10rem]  ">
          <p className=" text-[#656F77] text-sm mb-1 ">Your Desk</p>
          <p className="font-semibold ">
            Book your Desk, With Ultimate Options, Flex and Fix
          </p>
        </div>
        <div className=" bg-[#E8EEF3] w-[15%] h-fit rounded-lg p-2 max-lg:w-[50%] max-sm:h-[10rem] ">
          <p className=" text-[#656F77] text-sm mb-1 ">Your Succes</p>
          <p className="font-semibold ">
            In the realm of digital expanse, where cyberspace dances
          </p>
        </div>
      </div>
      {data && token && data.isAdmin ? (
        <div className="flex flex-row font-semibold text-white ">
          <Link
            to={`${baseUrl}/admin/adminpanel`}
            className=" bg-[#4E6AF0] hover:bg-[#2f4cdc]  w-fit py-2 px-8 rounded-[16px] "
          >
            Admin Pannel
          </Link>
        </div>
      ) : data && token ? (
        <div className="flex flex-row gap-2 pl-5 font-semibold text-white max-sm:flex-col max-sm:justify-center max-sm:items-center ">
          <Link
            to={`${baseUrl}/userlanding`}
            className=" bg-[#4E6AF0] hover:bg-[#2f4cdc]  w-fit py-2 px-4 rounded-[16px] max-sm:px-6 max-sm:py-[0.6rem] "
          >
            My Dashboard
          </Link>
          <Link
            to={`${baseUrl}/profile`}
            className=" bg-white text-black border-2 border-black hover:bg-[#4E6AF0]  w-fit py-2 px-8 rounded-[16px] hover:text-white max-sm:px-[2.2rem] max-sm:py-[0.4rem] "
          >
            My Profile
          </Link>
        </div>
      ) : (
        <div className="flex flex-row gap-2 font-semibold text-white pl-11 max-sm:flex-col max-sm:justify-center max-sm:items-center max-lg:pl-0 ">
          <Link
            to={`${baseUrl}/login`}
            className=" bg-[#4E6AF0] hover:bg-[#2f4cdc]  w-fit py-2 px-8 rounded-[16px] max-lg:px-12  "
          >
            Sign In
          </Link>
          <Link
            to={`${baseUrl}/register`}
            className=" bg-white text-black border-2 border-black hover:bg-[#4E6AF0]  w-fit py-2 px-8 rounded-[16px] hover:text-white max-sm:px-[2.7rem] max-sm:py-[0.4rem] "
          >
            Register
          </Link>
        </div>
      )}
      <div className="hidden ">
        {isLoading && <div>Loading...</div>}{" "}
        {isError && <div>Error: {error.message}</div>}{" "}
      </div>
    </div>
  );
}
