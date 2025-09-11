import type { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

const ModalBody = ({ className, children }: Props) => {
  return <div className={`${className} p-4 md:p-5 space-y-4`}>{children}</div>;
};

export default ModalBody;
