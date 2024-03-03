import React, { useState } from "react";
import { useDeleteBooking } from "../hooks/useDeletBooking";
import { DeskBookedProps } from "../types/DesksProps";
import { Card, Dropdown } from "flowbite-react";
import { useQueryClient } from "@tanstack/react-query";
import { BsCalendar2DateFill, BsCalendar2Date } from "react-icons/bs";
import { IoTimeSharp, IoTimeOutline } from "react-icons/io5";
import { useSendComment } from "../hooks/useSendComment";
//types
interface PopupMessageProps {
  message: string;
  onClose: () => void;
}
interface CustomError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message: string;
}
//messages
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
//main component
const InfoCard: React.FC<DeskBookedProps> = (props) => {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [commentShowPopup, setCommentShowPopup] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const queryClient = useQueryClient();
  const { mutate: deleteBooking } = useDeleteBooking();
  //comment queriy
  const { mutate: sendComment } = useSendComment();

  const formatDateTime = (isoDate: string) => {
    const dateObj = new Date(isoDate);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString();
    return { date, time };
  };

  const { date: startDate, time: startTime } = formatDateTime(props.dateStart);
  const { date: endDate, time: endTime } = formatDateTime(props.dateEnd);

  const currentDate = new Date();
  const endDateTime = new Date(props.dateEnd);

  const isExpired = currentDate > endDateTime;

  const handleDeleteBooking = () => {
    deleteBooking(props.deskId, {
      onSuccess: () => {
        setSuccessMessage("Your Booked Desk deleted successfully.");
        setShowPopup(true);
      },
    });
  };

  const closePopup = () => {
    setShowPopup(false);
    setSuccessMessage("");
    queryClient.invalidateQueries({
      queryKey: ["userBookeddesks"],
    });
  };
  //handle send comment
  const handleSendComment = () => {
    const commentData = {
      comment,
      desk: props.deskId,
    };

    sendComment(commentData, {
      onSuccess: () => {
        setSuccessMessage("Comment sent successfully.");
        setShowPopup(true);
      },
      onError: (commentError: CustomError) => {
        setSuccessMessage(
          commentError?.response?.data?.message || "Failed to send comment."
        );
        setShowPopup(true);
      },
    });

    setComment("");
    setCommentShowPopup(false);
  };

  return (
    <Card
      className={`flex w-full max-w-sm mt-1 mb-1 shadow-lg ${
        isExpired
          ? "bg-red-200"
          : "bg-gradient-to-b from-white via-gray-200 to-white"
      }`}
    >
      <div className="flex justify-end px-4 pt-0 font-bold ">
        <Dropdown inline label="">
          {isExpired && (
            <Dropdown.Item onClick={() => setCommentShowPopup(true)}>
              Send Comment
            </Dropdown.Item>
          )}
          <Dropdown.Item
            onClick={handleDeleteBooking}
            className="text-red-400 "
          >
            Delete
          </Dropdown.Item>
        </Dropdown>
      </div>
      <div className="flex flex-col items-center w-full">
        <h5 className="mb-0 text-xl font-bold text-gray-900 dark:text-white">
          {props.officeName}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {props.label}
        </span>
      </div>
      <span className="flex flex-row items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <span className="text-2xl text-violet-500">
          {" "}
          <BsCalendar2DateFill />{" "}
        </span>{" "}
        {startDate}{" "}
        <span className="text-2xl text-violet-500 ">
          <IoTimeSharp />
        </span>{" "}
        {startTime}
      </span>
      <span className="flex flex-row items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <span className="text-2xl text-violet-500">
          <BsCalendar2Date />
        </span>
        {endDate}{" "}
        <span className="text-2xl text-violet-500 ">
          <IoTimeOutline />
        </span>{" "}
        {endTime}
      </span>
      {commentShowPopup && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="p-8 bg-white rounded-lg">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your comment"
              className="block w-full h-32 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md resize-none focus:border-blue-500 focus:outline-none focus:ring"
            />
            <button
              onClick={handleSendComment}
              className="px-4 py-2 mt-4 mr-2 text-white bg-[#4E6AF0] rounded-md "
            >
              Send Comment
            </button>
            <button
              onClick={() => setCommentShowPopup(false)}
              className="px-4 py-2 mt-2 text-white bg-gray-800 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {showPopup && (
        <PopupMessage message={successMessage} onClose={closePopup} />
      )}
    </Card>
  );
};

export default InfoCard;
