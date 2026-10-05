import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../../app/hooks';
import { importExcelDefaultAddress } from '../../../../features/defaultaddressSlice';
import ModalFileImport from '../../ModalFileImport';
import { resultToastOptions } from '../../../../utils/toastResult';

type Props = {
  setIsOpen: (isOpen: boolean) => void;
};

const ModalDefaultAddress = ({ setIsOpen }: Props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <ModalFileImport
      title={t('tabs.default_address')}
      exampleFilePath="/excel/Example_Default_Address.xlsx"
      setIsOpen={setIsOpen}
      onImport={async (file) =>
        resultToastOptions(await dispatch(importExcelDefaultAddress(file)))
      }
    />
  );
};

export default ModalDefaultAddress;
