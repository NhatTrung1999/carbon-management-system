import { type ButtonProps } from "../../types/button";

const Button = (props: ButtonProps) => {
  const { label, type, className, onClick, imgSrc } = props;

  return (
    <button
      type={type}
      className={`${className} max-w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center whitespace-nowrap`}
      onClick={onClick}
    >
      {imgSrc && (
        <span style={{ width: "24px" }}>
          <img src={imgSrc} className="w-10" />
        </span>
      )}
      {label}
    </button>
  );
};

export default Button;
