//
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//types
interface TimePickerProps {
  startTime: Date;
  endTime: Date;
  onStartTimeChange: (date: Date) => void;
  onEndTimeChange: (date: Date) => void;
}

//
export default function TimePicker({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}: TimePickerProps) {
  return (
    <div>
      <div className="flex flex-row justify-between gap-1 ">
        <DatePicker
          selected={startTime}
          onChange={onStartTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Start Time"
          dateFormat="h:mm aa"
          className="w-full py-1.5  rounded-l-md px-3"
        />
        <DatePicker
          selected={endTime}
          onChange={onEndTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="End Time"
          dateFormat="h:mm aa"
          className="w-full rounded-r-md py-1.5 px-3"
        />
      </div>
    </div>
  );
}
