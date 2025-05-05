interface SelectInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { label: string; value: string }[] | string[];
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
  }
  
  export default function SelectInput({
    id,
    label,
    value,
    onChange,
    options,
    placeholder,
    required = false,
    disabled = false,
  }: SelectInputProps) {
    const normalizedOptions =
      typeof options[0] === "string"
        ? (options as string[]).map((opt) => ({ label: opt, value: opt }))
        : (options as { label: string; value: string }[]);
  
    return (
      <div className="relative w-full">
        <select
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="peer mt-4 p-2 h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {normalizedOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
  
        <label
          htmlFor={id}
          className="absolute left-0 -top-1 text-sm text-gray-600 transition-all 
            peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
            peer-focus:-top-1 peer-focus:text-sm peer-focus:text-gray-600"
        >
          {label}
        </label>
      </div>
    );
  }