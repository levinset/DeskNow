//import libraries
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";
import { useGetUserProfile } from "../hooks/useGetUserProfile";
import UserHeader from "../components/UserHeader";
import { useGetAllBookedDesk } from "../hooks/useGetAllBookedDesk";
import { useEffect, useState } from "react";
import { BookedDesk } from "../types/DesksProps";
import { Carousel } from "primereact/carousel";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import Favourites from "../components/Favourites";
//types
interface ResponsiveOption {
  breakpoint: string;
  numVisible: number;
  numScroll: number;
}
//
const imageUrl = "src/Images/frame.png";
//

//main componet
export default function UserLandingPage() {
  //
  const [userId, setUserId] = useState("");

  //query
  const { data, isLoading, isError } = useGetUserProfile();
  const { data: bookedDeskData } = useGetAllBookedDesk(userId);

  useEffect(() => {
    if (data && data.id) {
      setUserId(data.id);
    }
  }, [data]);
  //adjust Carousel screen size
  const responsiveOptions: ResponsiveOption[] = [
    {
      breakpoint: "1600px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "1650px",
      numVisible: 2,
      numScroll: 1,
    },
  ];
  return (
    <PrimeReactProvider value={{ unstyled: false, pt: Tailwind }}>
      <UserHeader />
      <div className="px-10 ">
        <div className="  hidden w-[40%]  justify-center items-center text-center max-sm:w-[90%] max-sm:flex max-sm:flex-col max-sm:mx-auto max-sm:mt-4  ">
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
        <div className="flex flex-col justify-center gap-8 py-10 ">
          <div className="container flex flex-row items-center justify-center gap-2 mx-auto max-sm:flex-col max-lg:gap-8 ">
            <div className=" w-[30%] max-sm:w-[90%] ">
              <div className="flex flex-row max-sm:justify-center ">
                <h1>Your Booked Desks:</h1>
              </div>

              <div className="flex max-sm:justify-center">
                <Carousel
                  value={bookedDeskData || []}
                  numVisible={2}
                  numScroll={1}
                  orientation="vertical"
                  verticalViewPortHeight="40vh"
                  responsiveOptions={responsiveOptions}
                  itemTemplate={(desk: BookedDesk) => (
                    <div className=" w-[25vw] max-sm:w-[90vw] p-d-flex p-ai-center p-jc-center max-lg:w-full">
                      <InfoCard
                        key={desk.id}
                        deskId={desk.desk.id}
                        label={desk.desk.label}
                        officeName={desk.desk.office.name}
                        dateStart={desk.dateStart}
                        dateEnd={desk.dateEnd}
                        column={desk.desk.column}
                        row={desk.desk.row}
                        userId={data.id}
                        officeId=""
                        deskFavouriteId=""
                      />
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="w-[40%] flex justify-center items-center text-center max-sm:w-[90%] max-sm:hidden   ">
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
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching user profile</p>}
      </div>
      <Footer />
    </PrimeReactProvider>
  );
}
