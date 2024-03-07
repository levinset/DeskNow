//import libraries
import { useEffect, useState } from "react";
import UserHeader from "../../components/user/home/UserHeader";
import { useGetAllDesks } from "../../hooks/userHooks/desks/useGetAllDesks";
import { DeskProps } from "../../types/DesksProps";
import DatePicker from "../../components/user/booking/DatePicker";
import DeskCard from "../../components/user/booking/DeskCard";
import DeskBookInfoCard from "../../components/user/booking/DeskBookInfoCard";
import { GiCancel } from "react-icons/gi";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

//types
import { DateValueType } from "../../types/DateTypes";
import { useAddDesk } from "../../hooks/userHooks/bookings/useAddDesk";
import { useGetAllBookingForDesks } from "../../hooks/userHooks/bookings/useGetAllBookingForDesks";
import DeskGuid from "../../components/user/booking/DeskGuid";
import { useFixRequest } from "../../hooks/userHooks/fixrequest/useFixRequest";
import { useGetUserProfile } from "../../hooks/userHooks/users/useGetUserProfile";
import { useGetOfficebyId } from "../../hooks/userHooks/offices/useGetOfficebyId";
import Footer from "../../components/general/Footer";

interface CustomError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message: string;
}

//main components
export default function OfficePage() {
  //
  const navigate = useNavigate();
  const location = useLocation();
  const { deskId } = location.state || {};
  //react hooks
  const defaultValue: DateValueType = null;
  const [selectedDeskId, setSelectedDeskId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<DateValueType>(defaultValue);
  const [bookingModale, SetBookingModale] = useState(false);
  const [fixBookingModale, SetFixBookingModale] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null | undefined>(
    null
  );
  const [selectedErrorMessage, setSelectedErrorMessage] = useState<
    string | null | undefined
  >(null);
  const [fixdeskProb, setfixdeskPropb] = useState(true);
  const [officeId, setOfficeId] = useState("");
  //get office id from browser
  const { LocateOfficeId } = useParams<{ LocateOfficeId: string }>();
  useEffect(() => {
    if (LocateOfficeId) {
      setOfficeId(LocateOfficeId);
    }
  }, [LocateOfficeId]);

  // Reset SelectedErrorMessage when selectedDate changes
  useEffect(() => {
    setSelectedErrorMessage(null);
    setfixdeskPropb(true);
  }, [selectedDate]);

  // Reset SelectedErrorMessage when selectedDeskId changes
  useEffect(() => {
    setSelectedErrorMessage(null);
    setfixdeskPropb(true);
  }, [selectedDeskId]);

  //queries
  //get all desks
  const { data, isLoading, isError } = useGetAllDesks();
  //get office data

  const { data: officeData } = useGetOfficebyId(officeId);

  const {
    isError: isBookingError,
    error: bookingError,
    mutate: addDesk,
  } = useAddDesk();
  const {
    mutate: fixRequest,
    error: fixBookingError,
    isError: isFixBookingError,
  } = useFixRequest();
  const { data: UserData } = useGetUserProfile();
  //filter desks in the office page
  const filteredDesks =
    data && officeData
      ? data.filter((desk: DeskProps) => desk.office.id === officeData.id)
      : [];
  const deskIds = filteredDesks.map((desk: DeskProps) => desk.id);
  //get all booked desk in the page
  const { data: bookedDesk } = useGetAllBookingForDesks(deskIds);
  // Reset SelectedErrorMessage when selectedDeskId changes
  useEffect(() => {
    const selectedDesk =
      data && data.find((desk: DeskProps) => desk.id === selectedDeskId);
    if (selectedDesk && selectedDesk.fixdesk) {
      setSelectedErrorMessage("This desk is a fix desk. you can not book it.");
    } else {
      setSelectedErrorMessage(null);
    }
  }, [selectedDeskId, data]);

  //

  // Filter the selected desk
  const selectedDesk =
    data && data.find((desk: DeskProps) => desk.id === selectedDeskId);
  const toggleEquipmentForAll = (id: string) => {
    setSelectedDeskId(id === selectedDeskId ? null : id);
  };
  //handle datepicker changes
  const handleDatePickerChange = (newValue: DateValueType) => {
    setSelectedDate(newValue);
  };
  //handle Booking
  const handleBooking = () => {
    if (
      selectedDate &&
      selectedDate.startDate &&
      selectedDate.endDate &&
      selectedDeskId
    ) {
      const { startDate, endDate } = selectedDate;
      const startDay = new Date(startDate).getDay();
      const endDay = new Date(endDate).getDay();

      const duration =
        new Date(endDate).getTime() - new Date(startDate).getTime();
      const maxDuration = 7 * 24 * 60 * 60 * 1000;

      if (startDay >= 1 && endDay <= 5 && duration <= maxDuration) {
        const deskData = {
          dateStart: new Date(startDate).toISOString().split("T")[0],
          dateEnd: new Date(endDate).toISOString().split("T")[0],
          desk: selectedDeskId,
        };

        addDesk(deskData, {
          onSuccess: () => {
            navigate("/DeskNow/sucssefullbooked");
          },
          onError: (bookingError: CustomError) => {
            setErrorMessage(bookingError?.response?.data?.message);
          },
        });
      } else {
        let errorMessage = "";
        if (!(startDay >= 1 && endDay <= 5)) {
          errorMessage = "Booking cannot span over the weekend.";
        }
        if (duration > maxDuration) {
          errorMessage = "Maximum reservation period is one week.";
        }
        setErrorMessage(errorMessage);
      }
    }
  };

  //handle fix request
  const handleFixRequest = () => {
    if (selectedDeskId) {
      const fixDeskData = {
        desk: selectedDeskId,
      };
      fixRequest(fixDeskData, {
        onSuccess: () => {
          navigate("/DeskNow/sucssefullbooked");
        },
        onError: (fixBookingError: CustomError) => {
          setErrorMessage(fixBookingError?.response?.data?.message);
        },
      });
    }
  };

  // Function to check if a desk is booked for the selected date
  const isDeskBooked = (deskId: string) => {
    if (!selectedDate || !selectedDate.startDate || !selectedDate.endDate)
      return false;

    const selectedStartTime = new Date(selectedDate.startDate).getTime();
    const selectedEndTime = new Date(selectedDate.endDate).getTime();

    return bookedDesk?.some((booking) => {
      if (booking.desk.id === deskId && booking.dateStart && booking.dateEnd) {
        const bookingStartTime = new Date(booking.dateStart).getTime();
        const bookingEndTime = new Date(booking.dateEnd).getTime();

        // Check if the selected date ranges overlap
        const dateOverlap =
          selectedStartTime <= bookingEndTime &&
          selectedEndTime >= bookingStartTime;

        // Check if the selected time ranges overlap
        const timeOverlap =
          selectedStartTime <= bookingEndTime &&
          selectedEndTime >= bookingStartTime;

        // If both date and time overlap, then the desk is booked
        return dateOverlap && timeOverlap;
      }
      return false;
    });
  };

  // Function to set desk color based on booking status
  const getDeskColor = (deskId: string) => {
    return isDeskBooked(deskId) ? "bg-red-400" : "bg-green-400";
  };
  //handle Booking Confirmation
  const handleBookingConfirmation = () => {
    if (!selectedDate) {
      setSelectedErrorMessage("Please select a date.");

      return;
    }

    if (!selectedDeskId) {
      setSelectedErrorMessage("Please select a desk.");

      return;
    }
    if (isDeskBooked(selectedDeskId)) {
      setSelectedErrorMessage(
        "This desk is already booked in your selected time. Please select another one."
      );

      return;
    }
    if (selectedDesk && selectedDesk.fixdesk) {
      return;
    }

    SetBookingModale(!bookingModale);
    setErrorMessage("");
  };
  //handleFixRequestConfirmation
  const handleFixRequestConfirmation = () => {
    if (!selectedDeskId) {
      setSelectedErrorMessage("Please select a desk.");

      return;
    }
    if (isDeskBooked(selectedDeskId)) {
      setSelectedErrorMessage(
        "This desk is already booked in your selected time. Please select another one."
      );

      return;
    }
    if (selectedDesk && selectedDesk.fixdesk) {
      return;
    }
    setfixdeskPropb(!fixdeskProb);
    SetFixBookingModale(!fixBookingModale);
    setErrorMessage("");
  };
  //

  //
  return (
    <div>
      <UserHeader />
      <div className="container relative flex flex-col h-full gap-10 px-10 pt-10 mx-auto max-sm:px-4 max-sm:gap-2 max-sm:pt-4">
        <div className=" max-sm:text-center">
          <h1 className="text-4xl font-bold">Select your Desk</h1>
          <h2 className="text-xl ">
            you can see details by selecting the desk
          </h2>
        </div>
        <div className="flex flex-row gap-4 max-sm:flex-col-reverse ">
          <div className="w-1/3 bg-[#EEF1FC] h-fit rounded-lg p-4 flex flex-col items-center gap-1 max-sm:w-full shadow-lg max-sm:h-[25rem] ">
            <div className="w-full shadow-lg">
              <div className="flex flex-row justify-center font-semibold text-red-400 ">
                {selectedErrorMessage}
              </div>
              <div className=" max-sm:hidden">
                <DatePicker onDatePickerChange={handleDatePickerChange} />
              </div>
            </div>
            {(selectedDeskId || selectedDate) && (
              <div className=" bg-[#ffff] rounded-lg p-4 w-full shadow-lg ">
                {selectedDesk && (
                  <DeskBookInfoCard
                    label={selectedDesk.label}
                    row={selectedDesk.row}
                    column={selectedDesk.column}
                    startDate={selectedDate?.startDate}
                    endDate={selectedDate?.endDate}
                    type={selectedDesk.type}
                    isUserFavourite={selectedDesk.isUserFavourite}
                    equipment={selectedDesk.equipment}
                    fixdesk={fixdeskProb}
                    firstname=""
                    lastname=""
                    email=""
                    deskId={selectedDeskId}
                    userId={UserData.id}
                  />
                )}
              </div>
            )}
            {bookingModale && (
              <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 ">
                <div className="p-6 bg-white rounded-lg max-sm:w-[90%] ">
                  <div className="flex flex-row justify-end ">
                    <button
                      className="text-3xl text-red-400"
                      onClick={handleBookingConfirmation}
                    >
                      <GiCancel />
                    </button>
                  </div>
                  {selectedDesk && (
                    <DeskBookInfoCard
                      label={selectedDesk.label}
                      row={selectedDesk.row}
                      column={selectedDesk.column}
                      startDate={selectedDate?.startDate}
                      endDate={selectedDate?.endDate}
                      type={selectedDesk.type}
                      isUserFavourite={selectedDesk.isUserFavourite}
                      equipment={selectedDesk.equipment}
                      fixdesk={fixdeskProb}
                      firstname={UserData?.firstname}
                      lastname={UserData?.lastname}
                      email={UserData?.email}
                      deskId={selectedDeskId}
                      userId={UserData.id}
                    />
                  )}
                  {errorMessage && (
                    <p className="text-red-500">{errorMessage}</p>
                  )}
                  <div className="flex justify-center mt-2 ">
                    <button
                      onClick={handleBooking}
                      className=" bg-[#2647C8] px-2 py-1 rounded-full w-[8rem] text-white font-semibold "
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            )}
            {fixBookingModale && (
              <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
                <div className="p-6 bg-white rounded-lg">
                  <div className="flex flex-row justify-end ">
                    <button
                      className="text-3xl text-red-400"
                      onClick={handleFixRequestConfirmation}
                    >
                      <GiCancel />
                    </button>
                  </div>
                  {selectedDesk && (
                    <DeskBookInfoCard
                      label={selectedDesk.label}
                      row={selectedDesk.row}
                      column={selectedDesk.column}
                      startDate={selectedDate?.startDate}
                      endDate={selectedDate?.endDate}
                      type={selectedDesk.type}
                      isUserFavourite={selectedDesk.isUserFavourite}
                      equipment={selectedDesk.equipment}
                      fixdesk={fixdeskProb}
                      firstname={UserData?.firstname}
                      lastname={UserData?.lastname}
                      email={UserData?.email}
                      deskId={selectedDeskId}
                      userId={UserData.id}
                    />
                  )}
                  {errorMessage && (
                    <p className="text-red-500">{errorMessage}</p>
                  )}
                  <div className="flex justify-center mt-2 ">
                    <button
                      onClick={handleFixRequest}
                      className=" bg-[#2647C8] px-2 py-1 rounded-full w-[8rem] text-white font-semibold "
                    >
                      Send Request
                    </button>
                  </div>
                </div>
              </div>
            )}
            {selectedDeskId && (
              <div className="flex flex-row gap-4 max-lg:flex-col max-sm:flex-row">
                <button
                  onClick={handleBookingConfirmation}
                  className="bg-[#2647C8] px-2 py-1 rounded-full w-[8rem] text-white font-semibold"
                >
                  Book
                </button>
                <button
                  onClick={handleFixRequestConfirmation}
                  className="bg-white px-2 py-1 rounded-full w-[8rem] text-black border-2 border-black hover:bg-[#2647C8] hover:text-white hover:border-[#2647C8] text-sm font-semibold"
                >
                  Send Fix Request
                </button>
              </div>
            )}
          </div>
          <div className=" shadow-lg bg-[#EEF1FC] h-fit rounded-lg p-4 w-2/3 flex flex-col justify-between max-sm:w-full ">
            <div className="flex flex-col gap-1">
              <div className=" shadow-lg text-4xl font-bold text-center bg-[#FFFFFF] rounded-lg h-[2.5rem] flex flex-row justify-center items-center gap-2 px-4  ">
                <div className="flex flex-row items-center justify-center gap-2 text-base ">
                  <h1 className="uppercase ">Office</h1>
                  <span className="text-[#2647C8] uppercase ">
                    {officeData && officeData.name}
                  </span>
                </div>
              </div>
              <div className="hidden max-sm:flex">
                <DatePicker onDatePickerChange={handleDatePickerChange} />
              </div>

              <div className="  bg-[#FFFFFF] mb-1 rounded-lg h-[2.5rem] flex flex-row justify-center items-center gap-[8rem] px-4  ">
                <DeskGuid />
              </div>
            </div>
            <div className="flex flex-row ">
              <div className="flex flex-col w-full ">
                <div
                  className={`grid grid-cols-${
                    officeData && officeData.columns
                  } grid-rows-${
                    officeData && officeData.rows
                  }  gap-[1rem] p-4 border-solid border-8 rounded-lg shadow-lg border-white  `}
                >
                  {deskId &&
                    data &&
                    officeData &&
                    data
                      .filter(
                        (desk: DeskProps) =>
                          desk.office.id === officeData.id && desk.id === deskId
                      )
                      .map((desk: DeskProps) => (
                        <DeskCard
                          key={desk.id}
                          {...desk}
                          showEquipment={desk.id === selectedDeskId}
                          toggleEquipment={toggleEquipmentForAll}
                          deskColor={getDeskColor(desk.id)}
                          isDate={selectedDate}
                        />
                      ))}
                  {!deskId &&
                    data &&
                    officeData &&
                    data
                      .filter(
                        (desk: DeskProps) => desk.office.id === officeData.id
                      )
                      .map((desk: DeskProps) => (
                        <DeskCard
                          key={desk.id}
                          {...desk}
                          showEquipment={desk.id === selectedDeskId}
                          toggleEquipment={toggleEquipmentForAll}
                          deskColor={getDeskColor(desk.id)}
                          isDate={selectedDate}
                        />
                      ))}
                </div>
              </div>
            </div>
            <div id="justify_center"></div>
          </div>
        </div>
      </div>
      <div className="hidden ">
        {isBookingError && bookingError && <div>{bookingError.message}</div>}
      </div>
      <div className="hidden ">
        {isFixBookingError && fixBookingError && (
          <div>{fixBookingError.message}</div>
        )}
      </div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>error loading data</div>}
      <div className="mt-[10rem] ">
        <Footer />
      </div>
    </div>
  );
}
