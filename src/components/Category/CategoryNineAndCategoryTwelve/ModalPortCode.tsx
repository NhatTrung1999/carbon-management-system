import { IoClose } from 'react-icons/io5';
import Button from '../../common/Button';
import ExcelIcon from '../../../assets/images/excel-icon.png';

const ModalPortCode = () => {
  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-center">
      <div className="bg-white max-w-lg w-full min-h-[550px] shadow-sm inset-shadow-sm flex flex-col">
        <div className="bg-[#636e61] text-white h-[70px] flex items-center justify-between px-3">
          <h1 className="font-semibold text-2xl">Port Code</h1>
          <div className="cursor-pointer">
            <IoClose size={25} />
          </div>
        </div>
        <div className="flex-1 p-2">
          <div>
            <Button
              label="Import Excel"
              type="button"
              className="bg-green-500 hover:bg-green-500/80 cursor-pointer flex items-center gap-2"
              imgSrc={ExcelIcon}
            />
          </div>
          <div className="mt-2 overflow-y-auto max-h-[450px]">
            <table className="w-full text-left">
              <thead className="bg-[#636e61] text-white sticky top-0">
                <tr>
                  <th className="px-2 py-2">Customer Number</th>
                  <th className="px-2 py-2">Port Code</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 25 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-2 py-2">123456</td>
                    <td className="px-2 py-2">USCHS</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPortCode;
