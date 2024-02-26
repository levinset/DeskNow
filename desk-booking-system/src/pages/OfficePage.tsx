//import libraries
import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useGetAllDesks } from "../hooks/useGetAllDesks";
import { DeskProps } from "../types/DesksProps";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "../components/DatePicker";
import DeskCard from "../components/DeskCard";
import DeskBookInfoCard from "../components/DeskBookInfoCard";

//types
import { DateValueType } from "../types/DateTypes";
import { useAddDesk } from "../hooks/useAddDesk";
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
  //select handler
  const defaultValue: DateValueType = null;
  const [selectedDeskId, setSelectedDeskId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<DateValueType>(defaultValue);
  const [bookingModale, SetBookingModale] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null | undefined>(
    null
  );

  //queries
  const { data, isLoading, isError } = useGetAllDesks();
  const {
    isError: isBookingError,
    error: bookingError,
    mutate: addDesk,
  } = useAddDesk();

  const location = useLocation();
  const officeData = location.state;
  //handle refresh
  const navigate = useNavigate();
  useEffect(() => {
    if (!officeData) {
      navigate("/offices");
    }
  }, [officeData, navigate]);
  if (!officeData) {
    return <div>Loading...</div>;
  }
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
    if (selectedDate && selectedDeskId) {
      const { startDate, endDate } = selectedDate;
      const deskData = {
        dateStart: startDate?.toString() || "",
        dateEnd: endDate?.toString() || "",
        desk: selectedDeskId,
      };
      addDesk(deskData, {
        onSuccess: () => {
          navigate("/sucssesfullbooked");
        },
        onError: (bookingError: CustomError) => {
          setErrorMessage(bookingError?.response?.data?.message);
        },
      });
    }
  };
  //handle Booking Confirmation
  const handleBookingConfirmation = () => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    if (!selectedDeskId) {
      alert("Please select a desk.");
      return;
    }
    SetBookingModale(!bookingModale);
  };
  //

  //
  return (
    <div>
      <UserHeader />
      <div className=" relative container justify-center  mx-auto pt-[10rem] gap-10 flex flex-col max-sm:px-4 ">
        <div className=" max-sm:text-center">
          <h1 className="text-4xl font-bold">Select your Desk</h1>
          <h2 className="text-xl ">
            you can see details by selecting the desk
          </h2>
        </div>
        <div className="flex flex-row gap-4 ">
          <div className="w-1/3 bg-[#EEF1FC] h-fit rounded-lg p-4 flex flex-col items-center gap-1  ">
            <DatePicker onDatePickerChange={handleDatePickerChange} />
            {(selectedDeskId || selectedDate) && (
              <div className=" bg-[#ffff] rounded-lg p-2 ">
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
                  />
                )}
              </div>
            )}
            {bookingModale && (
              <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
                <div className="p-6 bg-white rounded-lg">
                  <div className="flex flex-row justify-end ">
                    <button
                      className="bg-red-500"
                      onClick={handleBookingConfirmation}
                    >
                      cancel
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
                    />
                  )}
                  {errorMessage && (
                    <p className="text-red-500">{errorMessage}</p>
                  )}
                  <div className="flex justify-center ">
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
            <button
              onClick={handleBookingConfirmation}
              className=" bg-[#2647C8] px-2 py-1 rounded-full w-[8rem] text-white font-semibold "
            >
              Book
            </button>
          </div>
          <div className="bg-[#EEF1FC] h-fit rounded-lg p-4 w-2/3 flex flex-col justify-between ">
            <div className="text-4xl font-bold text-center bg-[#FFFFFF] rounded-lg h-[2.5rem] flex flex-row justify-center items-center gap-2 px-4  ">
              <div className="flex flex-row items-center justify-center gap-2 text-base ">
                <h1 className="uppercase ">Office</h1>
                <span className="text-[#2647C8] uppercase ">
                  {officeData.name}
                </span>
              </div>
            </div>
            <div className="flex flex-row ">
              <div className="flex flex-col w-full ">
                <div
                  className={`grid grid-cols-${officeData.columns} grid-rows-${officeData.rows}  gap-[1rem] p-4 border-solid border-4 rounded-lg `}
                >
                  {data &&
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
      {isLoading && <div>Loading...</div>}
      {isError && <div>error loading data</div>}
    </div>
  );
}
