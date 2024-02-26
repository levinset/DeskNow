//
import { DeskBookedProps } from "../types/DesksProps";
//
export default function InfoCard(props: DeskBookedProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-[#E2E9FB] h-fit rounded-lg shadow-md w-full ">
      <div>
        <h2> {props.officeName} </h2>
        <img src="" alt="" />
      </div>
      <div>
        <h1 className="text-xl "> {props.label} </h1>
      </div>
      <div>
        <h2> {props.dateStart} </h2>
        <img src="" alt="" />
      </div>
      <div>
        <h2> {props.dateEnd} </h2>
        <img src="" alt="" />
      </div>

      <div>
        {props.column} {props.row}
      </div>
    </div>
  );
}
