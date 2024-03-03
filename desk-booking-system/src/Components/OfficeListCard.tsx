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
    navigate(`/office/${props.id}`, { state: props });
  };
  //all seats
  const allSeats = (props.rows ?? 0) + (props.columns ?? 0);
  return (
    <div
      onClick={handleShow}
      className=" group bg-[#E2E9FB]  rounded-lg py-8 px-6 flex flex-col items-center justify-center gap-2 hover:cursor-pointer hover:bg-[#FF5678]   "
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex flex-col items-center p-4 rounded-lg ">
          <div className="flex group-hover:text-white flex-col items-center justify-center text-[#FF5678]  ">
            <div className="flex justify-center text-[10rem] max-sm:hidden ">
              <RiHomeOfficeFill />
            </div>
            <h1 className="text-xl font-bold text-center  text-black capitalize w-[90%] max-sm:text-sm">
              {props.name}
            </h1>
            <div className="flex flex-row items-center group-hover:text-white justify-center gap-2 text-3xl font-bold text-[#6F8FE4] mt-8 ">
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
