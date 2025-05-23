import React from "react";
import DatePicker from "react-datepicker";
import { ptBR } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import Image from 'next/image';
import calendarIcon from "@/app/assets/icons/calendarIcon.svg";

interface DatePickerInputProps {
  id: string;
  label: string;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  maxDate?: Date;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  id,
  label,
  selectedDate,
  onChange,
  placeholder = "Selecione a data",
  maxDate = new Date(),
}) => {
  return (
    <div className="relative w-fit pr-8">
      <DatePicker
        id={id}
        selected={selectedDate}
        onChange={onChange}
        dateFormat="dd-MM-yyyy"
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}
        maxDate={maxDate}
        locale={ptBR}
        placeholderText={placeholder}
        className="peer mt-4 p-2 h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500"
      />
      <label
        htmlFor={id}
        className="absolute left-0 -top-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-1 peer-focus:text-sm peer-focus:text-gray-600"
      >
        {label}
      </label>

      <Image className="w-5 h-5 text-gray-400 absolute right-10 top-1/2 transform -translate-y-1/2 pointer-events-none" src={calendarIcon} alt="calendar" />
    </div>
  );
};

export default DatePickerInput;