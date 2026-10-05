import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../../app/hooks';
import { importExcelTaxFreeZoneAddress } from '../../../../features/masterDataSlice';
import ModalFileImport from '../../ModalFileImport';
import { resultToastOptions } from '../../../../utils/toastResult';

type Props = {
  setIsOpen: (isOpen: boolean) => void;
};

const ModalTaxFreeZoneAddress = ({ setIsOpen }: Props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <ModalFileImport
      title={t('tabs.tax_free_zone_address')}
      exampleFilePath="/excel/Example_Tax_Free_Zone_Address.xlsx"
      setIsOpen={setIsOpen}
      onImport={async (file) =>
        resultToastOptions(await dispatch(importExcelTaxFreeZoneAddress(file)))
      }
    />
  );
};

export default ModalTaxFreeZoneAddress;
