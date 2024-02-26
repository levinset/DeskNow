//import libaries
import { useNavigate } from "react-router-dom";
import { RiHomeOfficeFill } from "react-icons/ri";
import { PiOfficeChairFill } from "react-icons/pi";
//types
import { OfficesProps } from "../types/OfficesProps";

//main component
export default function OfficeListCard(props: OfficesProps) {
  //navigate data to officepage
  const navigate = useNavigate();
  const handleShow = () => {
    navigate("/office", { state: props });
  };
  //all seats
  const allSeats = (props.rows ?? 0) + (props.columns ?? 0);
  return (
    <div
      onClick={handleShow}
      className="bg-[#E2E9FB]  rounded-lg py-8 px-6 flex flex-col items-center justify-center gap-2 hover:cursor-pointer hover:bg-red-300   "
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex flex-col items-center p-4 rounded-lg ">
          <div className="flex flex-col items-center justify-center text-[#6F8FE4]  ">
            <div className="flex justify-center text-[10rem] ">
              <RiHomeOfficeFill />
            </div>
            <h1 className=" w-[10rem] text-center text-xl font-bold text-black capitalize">
              {props.name}
            </h1>
            <div className="flex flex-row items-center justify-center gap-2 text-3xl font-bold text-[#6F8FE4] mt-8 ">
              <span className="text-4xl ">
                <PiOfficeChairFill />
              </span>
              {allSeats}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
