//import libraries

//types

import { DeskBookInfoProps } from "../types/DesksProps";
//
export default function DeskBookInfoCard(props: DeskBookInfoProps) {
  return (
    <div>
      <h2>Selected Desk Details:</h2>
      <p>Label: {props.label}</p>
      <p>
        row:{props.row + 1} column:{props.column + 1}
      </p>
      <div className=" bg-slate-300">
        <p>Start Date: {props?.startDate?.toString()}</p>
        <p>End Date: {props?.endDate?.toString()}</p>
      </div>
      <p>Type: {props.type}</p>
      <p> {props.isUserFavourite} user favour </p>
      <div className=" bg-slate-200">
        <p>equipments:</p>
        {props.equipment.map((equipment: string, index: number) => (
          <p className="" key={index}>
            {equipment}
          </p>
        ))}
      </div>
    </div>
  );
}
