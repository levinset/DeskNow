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

  //
  return (
    <div
      className="flex flex-row items-center justify-center "
      style={cardStyle}
    >
      <div
        onClick={toggleEquipment}
        className="w-[6rem] h-[6rem] bg-red-400 rounded-lg  flex flex-row justify-center items-center "
      >
        <div
          id="equipments"
          className={` flex flex-col justify-center items-center ${
            props.showEquipment ? "block" : "hidden"
          }`}
        >
          <p className="text-sm ">Equipments:</p>
          {props.equipment.map((equipment, index) => (
            <p className="text-xs font-semibold text-white" key={index}>
              {equipment}
            </p>
          ))}
        </div>
      </div>
      <div
        id="chair"
        className={` h-16 w-4  bg-slate-400  p-2 flex flex-col justify-center items-center rounded-l-[3px]  ${
          props.showEquipment ? "block" : "hidden"
        }`}
      ></div>
      <div className="w-2 h-20 rounded-lg rounded-l-full bg-slate-400"></div>
    </div>
  );
}
