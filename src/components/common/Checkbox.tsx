import type React from 'react';

type Props = {
  title: string;
  id: string;
  name?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({ title, id, name, checked, onChange }: Props) => {
  return (
    <div className="inline-flex items-center px-3 py-2 rounded-lg shadow-xs border border-gray-100">
      <label className="flex items-center cursor-pointer relative" htmlFor={id}>
        <input
          type="checkbox"
          className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-[#636e61] checked:bg-[#636e61] checked:border-[#636e61]"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
        />
        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </label>
      <label
        className="cursor-pointer ml-2 text-slate-600 text-base font-medium"
        htmlFor={id}
      >
        {title}
      </label>
    </div>
  );
};

export default Checkbox;
