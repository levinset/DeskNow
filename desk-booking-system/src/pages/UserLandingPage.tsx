//import libraries
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";
import { useGetUserProfile } from "../hooks/useGetUserProfile";
import UserHeader from "../components/UserHeader";
import { useGetAllBookedDesk } from "../hooks/useGetAllBookedDesk";
import { useEffect, useState } from "react";
import { BookedDesk } from "../types/DesksProps";
import { useGetAllFavouritesDesk } from "../hooks/useGetAllFavouritesDesk";

//
const imageUrl = "src/Images/frame.png";
//main componet
export default function UserLandingPage() {
  //
  const [userId, setUserId] = useState("");

  //query
  const { data, isLoading, isError } = useGetUserProfile();
  const { data: bookedDeskData } = useGetAllBookedDesk(userId);
  const { data: favouritesDeskData } = useGetAllFavouritesDesk(userId);

  useEffect(() => {
    if (data && data.id) {
      setUserId(data.id);
    }
  }, [data]);

  return (
    <div>
      <UserHeader />
      <div className="flex flex-col justify-center gap-8 py-10">
        <div className="container flex flex-row items-center justify-center gap-2 mx-auto max-sm:flex-col ">
          <div className=" w-[30%] max-sm:w-[90%] ">
            <div className="flex flex-row justify-center ">
              <h1>Your Booked Desks:</h1>
            </div>
            <div className="flex flex-col gap-2 p-4 overflow-y-auto max-h-96">
              {bookedDeskData &&
                bookedDeskData.map((desk: BookedDesk) => (
                  <InfoCard
                    key={desk.id}
                    label={desk.desk.label}
                    officeName={desk.desk.office.name}
                    dateStart={desk.dateStart}
                    dateEnd={desk.dateEnd}
                    column={desk.desk.column}
                    row={desk.desk.row}
                  />
                ))}
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
            </div>
          </div>
          <div className=" w-[30%] max-sm:w-[60%]  ">
            <img src={imageUrl} alt="user landing page image" />
          </div>
        </div>
        <div className="container flex flex-row items-center justify-center gap-4 mx-auto ">
          <div>
            <h1>Your Favourites Desks:</h1>
            {favouritesDeskData &&
              favouritesDeskData.map((desk: BookedDesk) => (
                <InfoCard
                  key={desk.id}
                  label={desk.desk.label}
                  officeName={desk.desk.office.name}
                  dateStart={desk.dateStart}
                  dateEnd={desk.dateEnd}
                  column={desk.desk.column}
                  row={desk.desk.row}
                />
              ))}
          </div>
        </div>
      </div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching user profile</p>}
      <Footer />
    </div>
  );
}
