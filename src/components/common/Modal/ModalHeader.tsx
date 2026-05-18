import { IoMdClose } from 'react-icons/io';

type HeaderProps = {
  children: React.ReactNode;
  setOpenModal?: (open: boolean) => void;
};

export const ModalHeader = ({ children, setOpenModal }: HeaderProps) => (
  <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
    <h3 className="text-base font-semibold text-white">{children}</h3>
    <button
      type="button"
      aria-label="Close"
      onClick={() => setOpenModal?.(false)}
      className="flex h-8 w-8 items-center justify-center rounded-lg
        text-white/40 transition-colors duration-150
        hover:bg-white/[0.08] hover:text-white"
    >
      <IoMdClose size={18} />
    </button>
  </div>
);
