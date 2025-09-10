import Button from "../../common/Button";

const ActionButton = () => {
  return (
    <div className="flex items-end gap-2 justify-end">
      <Button
        label="Add"
        type="button"
        className="block text-white bg-[#1b5fe3] font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer hover:opacity-75"
      />
      <Button
        label="Edit"
        type="button"
        className="block text-white bg-[#f7c800] font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer hover:opacity-75"
      />
      <Button
        label="Delete"
        type="button"
        className="block text-white bg-[#ca1120] font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer hover:opacity-75"
      />
    </div>
  );
};

export default ActionButton;
