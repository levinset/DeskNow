//import libaries
import { DeskProps } from "../types/DesksProps";

//main componenmt
export default function DeskCard(props: DeskProps) {
  // Position of the desk
  const cardStyle = {
    gridRow: `${props.row + 1}`,
    gridColumn: `${props.column + 1}`,
  };

  // Handler function to toggle equipment details visibility
  const toggleEquipment = () => {
    props.toggleEquipment(props.id);
  };
  // Determine the background color based on whether it's a fix desk and isDate
  let deskColorClass = props.fixdesk === null ? "bg-[#855e42]" : "bg-gray-500";
  if (props.isDate && !props.fixdesk) {
    deskColorClass = props.deskColor;
  }

  //
  return (
    <div
      className="flex flex-row items-center justify-center "
      style={cardStyle}
    >
      <div
        onClick={toggleEquipment}
        className={`w-[6rem] h-[6rem] ${deskColorClass} rounded-lg  flex flex-row justify-center items-center   max-sm:w-[3rem] max-sm:h-[3rem]  `}
      >
        <div
          id="equipments"
          className={`  flex flex-col justify-center items-center text-center ${
            props.showEquipment ? "block" : "hidden"
          } max-sm:hidden`}
        >
          <p className="text-sm ">Equipments:</p>
          {props.equipment.map((equipment, index) => (
            <p
              className="text-xs font-semibold text-white capitalize "
              key={index}
            >
              {equipment}
            </p>
          ))}
        </div>
      </div>
      <div
        id="chair"
        className={` h-16 w-4  bg-[#9D7E68] ${deskColorClass}  p-2 flex flex-col justify-center items-center rounded-l-[3px]  ${
          props.showEquipment ? "block" : "hidden"
        } max-sm:h-[2rem]  `}
      >
        <p className="text-sm font-bold uppercase rotate-90 ">
          {props.deskColor == "bg-red-400" ? "booked" : ""}
        </p>
      </div>
      <div
        className={`w-2 h-20 rounded-lg rounded-l-full bg-[#9D7E68] ${deskColorClass} max-sm:h-[2.5rem] `}
      ></div>
    </div>
  );
}
