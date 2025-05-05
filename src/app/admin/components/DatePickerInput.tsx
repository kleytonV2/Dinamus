import React from "react";
import DatePicker from "react-datepicker";
import { ptBR } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

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
    <div className="relative pr-8">
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
    </div>
  );
};

export default DatePickerInput;