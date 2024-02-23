//import libraries
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";
import { useGetUserProfile } from "../hooks/useGetUserProfile";
import UserHeader from "../components/UserHeader";
//
const imageUrl = "src/Images/frame.png";
//main componet
export default function UserLandingPage() {
  //query
  const { data, isLoading, isError } = useGetUserProfile();

  return (
    <div>
      <UserHeader />
      <div className="flex flex-col justify-center gap-8 py-10">
        <div className="container flex flex-row items-center justify-center gap-2 mx-auto max-sm:flex-col ">
          <div className=" w-[30%] max-sm:w-[90%] ">
            <div className="">
              <InfoCard />
            </div>
          </div>
          <div className="w-[40%] flex justify-center items-center text-center max-sm:w-[90%]   ">
            <div className="flex flex-col items-center justify-center gap-4">
              <h1 className="text-4xl text-[#2647C8] font-bold ">
                Welcome back,
                <span className="capitalize">{data && data.firstname}!</span>
              </h1>
              <h2>you are working from office today.</h2>
              <Link
                to="/offices"
                className=" bg-[#2647C8] px-4 py-2 rounded-3xl text-white w-[10rem] "
              >
                Book a Desk
              </Link>
              <Link
                to="/alldesks"
                className=" bg-[#2a355f] px-4 py-2 rounded-3xl text-white  w-[10rem]"
              >
                See All Desks
              </Link>
            </div>
          </div>
          <div className=" w-[30%] max-sm:w-[60%]  ">
            <img src={imageUrl} alt="user landing page image" />
          </div>
        </div>
        <div className="container flex flex-row items-center justify-center gap-4 mx-auto ">
          <InfoCard />
          <InfoCard />
        </div>
      </div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching user profile</p>}
      <Footer />
    </div>
  );
}
