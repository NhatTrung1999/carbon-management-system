import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../app/hooks';
import { importExcelPortCodeCat1AndCat4 } from '../../../features/masterDataSlice';
import ModalFileImport from '../ModalFileImport';
import { resultToastOptions } from '../../../utils/toastResult';

type Props = {
  setIsOpen: (isOpen: boolean) => void;
};

const ModalPortCode = ({ setIsOpen }: Props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <ModalFileImport
      title={t('cat1andcat4.port_code')}
      exampleFilePath="/excel/Example_Port_Code_Cat1_And_4.xlsx"
      setIsOpen={setIsOpen}
      onImport={async (file) => {
        const res = await dispatch(importExcelPortCodeCat1AndCat4(file));
        return resultToastOptions(res);
      }}
    />
  );
};

export default ModalPortCode;
