import { type InputProps } from "../../types/input";

const Input = (props: InputProps) => {
  const {
    label,
    type,
    name,
    value,
    helperText,
    onChange,
    classNameLabel,
    customClassNameInput,
    readonly,
    autoComplete = "off",
    placeholder
  } = props;

  return (
    <>
      <label
        className={`${classNameLabel} block whitespace-nowrap text-sm font-medium`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 outline-none ${customClassNameInput}`}
        autoComplete={autoComplete}
        readOnly={readonly}
        placeholder={placeholder}
      />
      <div className="text-red-600 text-xs">{helperText}</div>
    </>
  );
};

export default Input;
