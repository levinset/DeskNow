//
import { useEffect } from "react";
import OfficeCard from "../components/OfficeCard";
import UserHeader from "../components/UserHeader";
import { useGetAllDesks } from "../hooks/useGetAllDesks";
import { DeskProps } from "../types/DesksProps";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DatePicker from "../components/DatePicker";

//
export default function OfficePage() {
  //queries
  const { data } = useGetAllDesks();
  const location = useLocation();
  const officeData = location.state;
  //handle refresh
  const navigate = useNavigate();
  useEffect(() => {
    if (!officeData) {
      navigate("/offices");
    }
  }, [officeData, navigate]);
  if (!officeData) {
    return <div>Loading...</div>;
  }
  //
  return (
    <div>
      <UserHeader />
      <div className="container justify-center  mx-auto pt-[10rem] gap-10 flex flex-col max-sm:px-4 ">
        <div className="text-4xl font-bold text-center bg-[#1D3599] h-[4rem] flex flex-row justify-between items-center gap-2 px-4  ">
          <Link
            className="justify-start text-lg text-white underline "
            to="/offices"
          >
            &lt; back to offices list
          </Link>
          <div className="flex flex-row items-center justify-center gap-2 ">
            <h1 className="uppercase ">Office</h1>
            <span className="text-white uppercase "> {officeData.name}</span>
          </div>
          <div id="invisible_div" className="justify-start invisible text-lg ">
            back to offices list
          </div>
        </div>
        <div className=" max-sm:text-center">
          <h1 className="text-4xl font-bold">Select your Desk</h1>
          <h2 className="text-xl ">
            you can see details by selecting the desk
          </h2>
        </div>
        <div className="bg-[#E2E9FB] h-12 rounded-md">searchbar</div>
        <div className="flex flex-row gap-4 ">
          <div className="w-1/3 ">
            <DatePicker />
          </div>
          <div className="w-1/3 bg-[#E2E9FB] ">Satatus</div>
          <div className="grid grid-cols-3  gap-[1rem] max-sm:grid-cols-1  ">
            {data &&
              data
                .filter((desk: DeskProps) => desk.office.id === officeData.id)
                .map((desk: DeskProps) => (
                  <OfficeCard key={desk.id} {...desk} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
