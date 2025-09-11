import { IoMdClose } from 'react-icons/io';

type Props = {
  children: React.ReactNode;
  setOpenModal?: (open: boolean) => void;
};

const ModalHeader = ({ children, setOpenModal }: Props) => {
  return (
    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 ">{children}</h3>
      <button
        type="button"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
        onClick={() => setOpenModal?.(false)}
      >
        <IoMdClose />
      </button>
    </div>
  );
};

export default ModalHeader;
