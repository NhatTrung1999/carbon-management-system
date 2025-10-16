export interface TypeProps {
  name: string;
  value: string | number;
}

export interface SelectProps {
  label: string;
  options: Array<TypeProps>;
  name: string;
  value?: string | number | undefined;
  helperText?: string | null | any;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  classNameLabel?: string;
  customClassNameSelect?: string;

  showAllSelect?: boolean;
  isShowAllSelect?: boolean;
  readOnly?: boolean;
}

const Select = (props: SelectProps) => {
  const {
    label,
    options,
    name,
    value,
    helperText,
    onChange,
    classNameLabel,
    customClassNameSelect,
    showAllSelect,
    isShowAllSelect,
    readOnly,
  } = props;

  return (
    <>
      <label
        className={`${classNameLabel} whitespace-nowrap block text-sm font-medium`}
      >
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={readOnly}
        className={`sm:w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-pointer outline-none ${customClassNameSelect}`}
      >
        {isShowAllSelect && <option value="ALL">{showAllSelect && "ALL"}</option>}
        {options?.map((item, index) => (
          <option value={item.value} key={index}>
            {item.name}
          </option>
        ))}
      </select>
      <div className="text-red-600 text-xs">{helperText}</div>
    </>
  );
};

export default Select;
