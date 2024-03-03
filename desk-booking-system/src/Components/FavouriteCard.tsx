import { useDeleteFavouritesDesk } from "../hooks/useDeletFavourites";
import { DeskBookedProps } from "../types/DesksProps";
import { Card, Dropdown } from "flowbite-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { TbTableColumn } from "react-icons/tb";

interface PopupMessageProps {
  message: string;
  onClose: () => void;
}

const PopupMessage: React.FC<PopupMessageProps> = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
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

export default function FavouriteCard(props: DeskBookedProps) {
  //
  const navigate = useNavigate();
  // State for success message with initial value ""
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const queryClient = useQueryClient(); // Get the query client

  // Queries
  const { mutate: deleteFavouritesDesk } = useDeleteFavouritesDesk();

  // Handle delete favourite
  const handleDelete = () => {
    deleteFavouritesDesk(props.deskFavouriteId, {
      onSuccess: () => {
        setSuccessMessage(
          "Your Desk deleted successfully from Favourites list."
        );
        setShowPopup(true);
      },
    });
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

  const bookFavouriteDesk = () => {
    const { officeId, deskId } = props;
    navigate(`/office/${officeId}`, { state: { deskId: deskId } });
  };

  return (
    <Card className="flex border-none max-w-sm mt-1 mb-1 w-[15rem] max-sm:w-[90%] font-bold bg-gradient-to-b from-violet-500  to-violet-500 relative">
      <div className="z-50 flex justify-start px-4 pt-0 font-bold ">
        <Dropdown inline label="">
          <Dropdown.Item onClick={bookFavouriteDesk}>Book</Dropdown.Item>
          <Dropdown.Item className="text-red-400 " onClick={handleDelete}>
            Delete Favourites
          </Dropdown.Item>
        </Dropdown>
      </div>
      <div className="flex flex-col items-center w-full ">
        <h5 className="mb-0 text-xl font-bold text-white dark:text-white">
          {props.officeName}
        </h5>
        <span className="text-sm font-bold text-white dark:text-gray-400">
          {props.label}
        </span>
        <span className="flex flex-row items-center gap-1 text-sm font-bold text-black dark:text-gray-400">
          <span className="text-xl text-white ">
            {" "}
            <TbTableColumn />
          </span>{" "}
          row : {props.row} column: {props.column}
        </span>
      </div>
      {showPopup && (
        <PopupMessage message={successMessage} onClose={closePopup} />
      )}
    </Card>
  );
}
