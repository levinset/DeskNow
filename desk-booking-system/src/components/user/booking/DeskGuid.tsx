//
import { FaStar } from "react-icons/fa";
//
export default function DeskGuid() {
  return (
    <div className="flex flex-row gap-[8rem] max-sm:gap-2 ">
      {" "}
      <div className="flex flex-row gap-2">
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="w-4 h-4 bg-green-400 rounded-md"></div>
          <p className="uppercase max-sm:text-[0.7rem] max-sm:font-bold">
            Free
          </p>
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="w-4 h-4 bg-red-400 rounded-md"></div>
          <p
            className="uppercase max-sm:text-[0.7rem] max-sm:font-bold
           "
          >
            booked
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="w-4 h-4 bg-gray-500 rounded-md"></div>
          <p className="uppercase max-sm:text-[0.7rem] max-sm:font-bold  ">
            Fix
          </p>
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="text-2xl text-violet-500 max-sm:text-xl ">
            <FaStar />
          </div>
          <p className="uppercase max-sm:text-[0.7rem] max-sm:font-bold ">
            Favourite
          </p>
        </div>
      </div>
    </div>
  );
}
