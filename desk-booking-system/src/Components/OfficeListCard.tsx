//import libaries
import { Link, useNavigate } from "react-router-dom";

//types
import { OfficesProps } from "../types/OfficesProps";

//images Url
const ImageUrl = "/src/images/content.png";

//main component
export default function OfficeListCard(props: OfficesProps) {
  //navigate data to officepage
  const navigate = useNavigate();
  const handleShow = () => {
    navigate("/office", { state: props });
  };
  //
  return (
    <div className="bg-[#E2E9FB] h-fit rounded-lg py-8 px-6 flex flex-col items-center justify-center gap-2 ">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center p-4 rounded-lg bg-slate-100">
          <div>
            <h1> {props.name} </h1>
          </div>
          <hr />
          <div>
            <img src={ImageUrl} alt="" />
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-1 text-center">
          <div className=" bg-[#C7D2FF] py-1 px-2 rounded-full w-1/3 h-[2rem] "></div>
          <div className=" bg-[#C7D2FF] py-1 px-2 rounded-full w-1/3 h-[2rem]  ">
            {props.columns}
          </div>
          <div className=" bg-[#C7D2FF] py-1 px-2 rounded-full w-1/3 h-[2rem]  ">
            {props.rows}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between gap-4 text-center ">
          <button
            onClick={handleShow}
            className="w-1/2 px-4 py-1 capitalize rounded-full bg-slate-100 "
          >
            more info
          </button>
          <Link
            className="capitalize w-1/2  px-4 py-1 rounded-full bg-[#2647C8]  "
            to=""
          >
            select
          </Link>
        </div>
      </div>
    </div>
  );
}
