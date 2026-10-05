import { useAppDispatch } from '../../../app/hooks';
import { importExcelPortCode } from '../../../features/masterDataSlice';
import ModalFileImport from '../ModalFileImport';
import { useTranslation } from 'react-i18next';
import { resultToastOptions } from '../../../utils/toastResult';

type Props = {
  setIsOpen: (isOpen: boolean) => void;
};

const ModalPortCode = ({ setIsOpen }: Props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <ModalFileImport
      title={t('cat9andcat12.port_code')}
      exampleFilePath="/excel/Example_Port_Code.xlsx"
      setIsOpen={setIsOpen}
      onImport={async (file) => {
        const res = await dispatch(importExcelPortCode(file));
        return resultToastOptions(res);
      }}
    />
  );
};

export default ModalPortCode;
