//import libraries and components
import Footer from "../../components/general/Footer";
import UserHeader from "../../components/user/home/UserHeader";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import Favourites from "../../components/user/dashboard/favourite/Favourites";
import BookedView from "../../components/user/dashboard/bookedDesk/BookedView";
import UserWelcome from "../../components/user/dashboard/userWelcome/UserWelcome";

//landing pahe image url
const imageUrl = "src/Images/frame.png";

//main componet
export default function UserLandingPage() {
  return (
    <PrimeReactProvider value={{ unstyled: false, pt: Tailwind }}>
      <UserHeader />
      <div className="px-10 ">
        <div className="  hidden w-[40%]  justify-center items-center text-center max-sm:w-[90%] max-sm:flex max-sm:flex-col max-sm:mx-auto max-sm:mt-4  ">
          <UserWelcome />{" "}
        </div>
        <div className="flex flex-col justify-center gap-8 py-10 ">
          <div className="container flex flex-row items-center justify-center gap-2 mx-auto max-sm:flex-col max-lg:gap-8 ">
            <div className=" w-[30%] max-sm:w-[90%] ">
              <div className="flex flex-row max-sm:justify-center ">
                <h1 className="text-2xl font-bold text-black ">
                  Your Booked Desks:
                </h1>
              </div>
              <BookedView />
            </div>
            <div className="w-[40%] flex justify-center items-center text-center max-sm:w-[90%] max-sm:hidden   ">
              <UserWelcome />
            </div>
            <div className=" w-[30%] max-sm:w-[60%] max-sm:hidden max-lg:hidden  ">
              <img src={imageUrl} alt="user landing page image" />
            </div>
          </div>
          <div className="container flex flex-row items-center justify-center gap-4 mx-auto ">
            <div className="flex flex-col justify-center mx-auto ">
              <div className="w-full max-sm:flex max-sm:justify-center max-sm:m-auto">
                <Favourites />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </PrimeReactProvider>
  );
}
