// import { useTranslation } from "react-i18next";

import Button from "../Button";

type Props = {
  setOpenModal?: (open: boolean) => void;
};

const ModalFooter = ({ setOpenModal }: Props) => {
  // const [t] = useTranslation("global");

  return (
    <div className="flex gap-2 justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
      >
        Save
      </button>
      <Button
        label={'Close'}
        type="button"
        onClick={() => setOpenModal?.(false)}
        className="bg-red-500  hover:bg-red-500/90 cursor-pointer"
      />
    </div>
  );
};

export default ModalFooter;
