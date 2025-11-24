import { IoClose } from 'react-icons/io5';
import Button from '../../common/Button';
import { useState } from 'react';
import { Toast } from '../../../utils/Toast';
import { importExcelPortCode } from '../../../features/categorySlice';
import { useAppDispatch } from '../../../app/hooks';
import { useTranslation } from 'react-i18next';

type Props = {
  setIsOpen: (isOpen: boolean) => void;
};

const ModalPortCode = ({ setIsOpen }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('No file chosen');
  const dispatch = useAppDispatch();
  const {t} = useTranslation()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectdFile = e.target.files?.[0];
    setFileName(selectdFile ? selectdFile.name : 'No file chosen');
    setFile(selectdFile || null);
  };

  const handleImport = async () => {
    if (!file) {
      Toast.fire({
        icon: 'error',
        title: 'Please choose file before import!',
      });
      return;
    }
    Toast.fire({
      title: 'Importing...',
      timer: undefined,
      timerProgressBar: false,
      didOpen: () => {
        Toast.showLoading();
        setIsOpen(false);
      },
    });

    const res = await dispatch(importExcelPortCode(file));
    if (importExcelPortCode.fulfilled.match(res)) {
      Toast.close();
      Toast.fire({
        title: res.payload.message,
        icon: 'success',
      });
    } else {
      Toast.close();
      Toast.fire({
        title: res.payload as string,
        icon: 'success',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-20 flex justify-center items-center">
      <div className="bg-white max-w-md w-full shadow-xl flex flex-col">
        <div className="h-[70px] flex items-center justify-between px-2 border-b border-gray-200">
          <h1 className="font-semibold text-xl">{t('cat9andcat12.port_code')}</h1>
          <div className="cursor-pointer" onClick={() => setIsOpen(false)}>
            <IoClose size={25} />
          </div>
        </div>
        <div className="py-5 px-2">
          <div className="text-end mb-3 text-lg font-medium hover:underline hover:opacity-80">
            <a href="/excel/Example_Port_Code.xlsx" download>
              {t('cat9andcat12.example_file')}
            </a>
          </div>
          <div>
            <label
              htmlFor="portcode"
              className="border border-gray-300 flex items-center rounded-lg bg-gray-500"
            >
              <span className="px-2 text-white font-bold">Choose file</span>
              <div className=" px-2 flex-1 py-1.5 bg-white rounded-r-md font-medium truncate">
                {fileName}
              </div>
            </label>
            <input
              type="file"
              hidden
              id="portcode"
              onChange={handleFileChange}
              accept=".xlsx,.xls"
            />
          </div>
        </div>
        <div className="flex items-center justify-end px-2 py-3 border-t border-gray-200 gap-2">
          <Button
            label={t('cat9andcat12.close')}
            type="button"
            className="bg-gray-500 hover:bg-gray-500/80 cursor-pointer flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          />

          <Button
            label={t('cat9andcat12.import')}
            type="button"
            className="bg-blue-500 hover:bg-blue-500/80 cursor-pointer flex items-center gap-2"
            onClick={handleImport}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalPortCode;
