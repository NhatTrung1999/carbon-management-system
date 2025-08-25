import React from "react";

interface ICardProps {
  children?: React.ReactNode;
  className?: string;
}

const Card = ({ className, children }: ICardProps) => {
  return (
    <div className={`bg-white shadow-lg p-6 ${className}`}>{children}</div>
  );
};

export default Card;
