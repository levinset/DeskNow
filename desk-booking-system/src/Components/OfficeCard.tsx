//import libaries

import { Link } from "react-router-dom";
import { DeskProps } from "../types/DesksProps";

//types

//main component
export default function OfficeCard(props: DeskProps) {
  //

  //
  return (
    <div className="bg-[#E2E9FB] h-fitrounded-lg py-8 px-6 flex flex-col items-center justify-center gap-2 ">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center p-4 rounded-lg bg-slate-100">
          <div>
            <h1 className="font-bold uppercase">equipments:</h1>
            {props.equipment.map((equipment, index) => (
              <p key={index}>{equipment} </p>
            ))}
          </div>
          <hr />
          <div></div>
        </div>
        <div className="flex flex-row items-center justify-center gap-1 text-center">
          <div className=" bg-[#C7D2FF] py-1 px-2 rounded-full w-1/3 h-[2rem] ">
            {props.type}
          </div>
          <div className=" bg-[#C7D2FF] py-1 px-2 rounded-full w-1/3 h-[2rem]  ">
            {props.column}
          </div>
          <div className=" bg-[#C7D2FF] py-1 px-2 rounded-full w-1/3 h-[2rem]  ">
            {props.row}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between gap-4 text-center ">
          <Link
            className="capitalize w-full  px-4 py-1 rounded-full bg-[#2647C8]  "
            to=""
          >
            Book
          </Link>
        </div>
      </div>
    </div>
  );
}
