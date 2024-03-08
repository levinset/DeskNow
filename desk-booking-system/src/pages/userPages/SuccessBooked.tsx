//
import { Link } from "react-router-dom";
import UserHeader from "../../components/user/home/UserHeader";

//
import finishimage from "/images/finishimage.png";

//
export default function SuccessBooked() {
  return (
    <div>
      <UserHeader />
      <div className="flex flex-col items-center justify-center h-screen p-10 mx-auto max-sm:p-2 max-sm:justify-start ">
        <div className="flex flex-row items-center justify-center gap-4 p-10 mt-10 border-4 border-solid h-fit max-sm:m-0 max-sm:p-4 max-sm:flex-col">
          <div className="flex flex-col w-1/2 gap-4 max-sm:w-full ">
            <h1 className="text-6xl font-bold text-white max-sm:text-3xl">
              Your reservation has finished. We are looking Forward to see you
              at <span className=" text-[#486AAE] ">DeskNow</span>
            </h1>
            <h2 className="text-2xl text-white">
              You can always Edit your reservation Date and Type.
            </h2>
            <div className="flex flex-row gap-2 mt-4">
              <Link
                to="/DeskNow/userlanding"
                className="px-4 py-2 bg-white rounded-full text-[#486AAE] font-semibold hover:text-white hover:bg-[#486AAE] "
              >
                Dashbord
              </Link>
              <Link
                to="/DeskNow/profile"
                className="text-xl font-semibold text-white underline hover:text-[#486AAE] "
              >
                My Profile
              </Link>
            </div>
          </div>
          <div className="w-1/2 max-sm:w-full ">
            <img src={finishimage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
