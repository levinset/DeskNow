//import libraries
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
//types
import { DateValueType } from "../types/DateTypes";
interface DatePickerProps {
  onDatePickerChange: (value: DateValueType) => void;
}

//main component
const DatePicker = ({ onDatePickerChange }: DatePickerProps) => {
  const today = new Date();
  const endDate = new Date(
    today.getFullYear(),
    today.getMonth() + 11,
    today.getDate()
  );

  const [value, setValue] = useState<DateValueType>({
    startDate: today.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
  });

  const handleValueChange = (newValue: DateValueType) => {
    setValue(newValue);
    onDatePickerChange(newValue);
  };

  return <Datepicker value={value} onChange={handleValueChange} />;
};

export default DatePicker;
