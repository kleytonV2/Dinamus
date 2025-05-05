import React from "react";

interface TextInputProps {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  type,
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        id={id}
        className="peer mt-4 p-2 h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
      <label
        htmlFor={id}
        className="absolute left-0 -top-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-1 peer-focus:text-sm peer-focus:text-gray-600"
      >
        {placeholder}
      </label>
    </div>
  );
};

export default TextInput;