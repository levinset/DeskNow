import { CiStar } from "react-icons/ci";
import { DeskBookInfoProps, DeskFavouriteProps } from "../types/DesksProps";
import { useCreatFavourite } from "../hooks/useCreateFavourite";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { useDeleteFavouritesDesk } from "../hooks/useDeletFavourites";
import { useGetAllFavouritesDesk } from "../hooks/useGetAllFavouritesDesk";
import { useGetUserProfile } from "../hooks/useGetUserProfile";

//

interface PopupMessageProps {
  message: string;
  onClose: () => void;
}

const PopupMessage: React.FC<PopupMessageProps> = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 ">
      <div className="p-8 bg-white rounded-lg">
        <div className="text-center text-black">{message}</div>
        <button
          onClick={onClose}
          className="px-4 py-2 mt-4 text-white bg-gray-800 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

//
export default function DeskBookInfoCard(props: DeskBookInfoProps) {
  //
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const queryClient = useQueryClient();

  //queries
  const { data: userProfileData } = useGetUserProfile();
  const { mutate: creatFavourite } = useCreatFavourite();
  const { mutate: deleteFavouritesDesk } = useDeleteFavouritesDesk();
  const { data: userFavouritesData } = useGetAllFavouritesDesk(
    userProfileData.id
  );
  //finde favourite id
  const favouriteItem =
    userFavouritesData &&
    userFavouritesData.find(
      (item: DeskFavouriteProps) => item.desk.id === props.deskId
    );
  //
  useEffect(() => {
    // Update favourite status when userFavouritesData or props.deskId changes
    if (userFavouritesData && props.deskId) {
      const isDeskFavourite = userFavouritesData.some(
        (item: DeskFavouriteProps) => item.desk.id === props.deskId
      );
      setIsFavourite(isDeskFavourite);
    }
  }, [userFavouritesData, props.deskId]);
  //
  const handleFavourite = () => {
    if (props.deskId && !isFavourite) {
      creatFavourite(
        { desk: props.deskId },
        {
          onSuccess: () => {
            setSuccessMessage("This Desk became Your favourite Desk.");
            setShowPopup(true);
          },
        }
      );
    } else if (props.deskId && isFavourite) {
      deleteFavouritesDesk(favouriteItem.id, {
        onSuccess: () => {
          setSuccessMessage("This Desk is no longer Your favourite Desk.");
          setShowPopup(true);
        },
      });
    }
  };

  // Close the pop-up
  const closePopup = () => {
    setShowPopup(false);
    setSuccessMessage("");
    queryClient.invalidateQueries({
      queryKey: ["userFavouritsDesks", props.userId],
    });
  };
  //
  return (
    <div>
      <div className="flex justify-end ">
        <button onClick={handleFavourite}>
          {isFavourite ? (
            <div className="text-2xl text-violet-500 ">
              <FaStar />
            </div>
          ) : (
            <div className="text-2xl ">
              <CiStar />
            </div>
          )}
        </button>
      </div>
      <div className="flex flex-col ">
        <div className="mb-2 ">
          <h2 className="mb-1 font-bold text-center">Selected Desk Details:</h2>
          <hr />
          <div className="flex flex-row gap-6 mt-1 mb-1 ">
            <div>
              Desk Label:{" "}
              <span className="font-bold text-[#2647C8] ">{props.label}</span>
            </div>
            <p>Type: {props.type}</p>
          </div>
          <div className="flex flex-row gap-4 mb-2">
            <p>
              Desk Row:{" "}
              <span className="font-bold text-[#2647C8] border-solid border-2 border-black px-1 ">
                {" "}
                {props.row + 1}{" "}
              </span>
            </p>
            <p>
              Desk Column:{" "}
              <span className="font-bold text-[#2647C8] border-solid border-2 border-black px-1 ">
                {props.column + 1}
              </span>
            </p>
          </div>
          <hr />
        </div>
        <hr />
        <div>
          <p className="mt-1 uppercase ">equipments:</p>
          <div className="grid grid-cols-3 ">
            {props.equipment.map((equipment: string, index: number) => (
              <p className="capitalize " key={index}>
                {equipment}
              </p>
            ))}
          </div>
        </div>
        <div className={` ${props.fixdesk ? "" : "hidden"} `}>
          <div className="p-2 mt-2 rounded-lg bg-amber-500">
            <p>
              Start Date:{" "}
              <span className="font-bold ">
                {" "}
                {props?.startDate?.toString()}
              </span>
            </p>
            <p>
              End Date:{" "}
              <span className="font-bold"> {props?.endDate?.toString()}</span>
            </p>
          </div>
        </div>
        <div
          className={
            props.firstname || props.lastname || props.email ? "" : "hidden"
          }
        >
          <div className="p-2 mt-2 rounded-lg bg-violet-600 ">
            <p>
              Your Name:{" "}
              <span className="font-bold text-white ">
                {" "}
                {props.firstname} {props.lastname}
              </span>
            </p>
            <p>
              Your Email:{" "}
              <span className="font-bold text-white"> {props.email}</span>
            </p>
          </div>
        </div>
      </div>
      {showPopup && (
        <PopupMessage message={successMessage} onClose={closePopup} />
      )}
    </div>
  );
}
