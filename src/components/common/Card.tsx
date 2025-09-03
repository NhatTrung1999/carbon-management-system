import type { ICardProps } from "../../types/card";

const Card = ({ className, children }: ICardProps) => {
  return (
    <div className={`bg-white shadow-lg p-6 rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;
