import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../../app/hooks';
import { importExcelStyleAutoFill } from '../../../../features/masterDataSlice';
import ModalFileImport from '../../ModalFileImport';
import { resultToastOptions } from '../../../../utils/toastResult';

type Props = {
  setIsOpen: (isOpen: boolean) => void;
};

const ModalStyleAutoFill = ({ setIsOpen }: Props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <ModalFileImport
      title={t('tabs.style_auto_fill')}
      exampleFilePath="/excel/Example_Style_Auto_Fill.xlsx"
      setIsOpen={setIsOpen}
      onImport={async (file) =>
        resultToastOptions(await dispatch(importExcelStyleAutoFill(file)))
      }
    />
  );
};

export default ModalStyleAutoFill;
