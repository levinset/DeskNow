//
import { Link } from "react-router-dom";
import UserHeader from "../components/UserHeader";

//
const ImageUrl = "/src/images/finishimage.png";

//
export default function SuccessBooked() {
  return (
    <div>
      <UserHeader />
      <div className="flex flex-col items-center justify-center h-screen p-10 mx-auto ">
        <div className="flex flex-row items-center justify-center gap-4 p-10 mt-10 border-2 border-solid h-fit">
          <div className="flex flex-col w-1/2 gap-4 ">
            <h1 className="text-6xl font-bold text-white">
              Your reservation has finished. We are looking Forward to see you
              at DeskNow
            </h1>
            <h2 className="text-2xl text-white">
              You can always Edit your reservation Date and Type.
            </h2>
            <div className="flex flex-row gap-2 mt-4">
              <Link
                to="/userprofile"
                className="px-2 py-1 bg-white rounded-full"
              >
                Dashbord
              </Link>
              <button className="underline text0white">Edit Reservation</button>
            </div>
          </div>
          <div className="w-1/2 ">
            <img src={ImageUrl} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
