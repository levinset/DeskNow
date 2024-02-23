import { useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

const DatePicker = () => {
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
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  return <Datepicker value={value} onChange={handleValueChange} />;
};

export default DatePicker;
