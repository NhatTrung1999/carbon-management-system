import { useAppDispatch } from '../../../app/hooks';
import { importExcelPortCode } from '../../../features/categorySlice';
import ModalFileImport from '../ModalFileImport';
import { useTranslation } from 'react-i18next';

type Props = {
  setIsOpen: (isOpen: boolean) => void;
};

const ModalPortCode = ({ setIsOpen }: Props) => {
  const dispatch = useAppDispatch();
  const { t }    = useTranslation();

  return (
    <ModalFileImport
      title={t('cat9andcat12.port_code')}
      exampleFilePath="/excel/Example_Port_Code.xlsx"
      setIsOpen={setIsOpen}
      onImport={async (file) => {
        const res = await dispatch(importExcelPortCode(file));
        const ok  = importExcelPortCode.fulfilled.match(res);
        return {
          icon : ok ? 'success' : 'error',
          title: ok ? (res.payload as { message: string }).message : (res.payload as string),
        };
      }}
    />
  );
};

export default ModalPortCode;
