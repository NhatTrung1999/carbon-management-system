import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../app/hooks';
import { importExcelHRModule } from '../../../features/hrmoduleSlice';
import ModalFileImport from '../../Category/ModalFileImport';
import { resultToastOptions } from '../../../utils/toastResult';

type Props = {
  setIsOpen: (isOpen: boolean) => void;
};

const ModalHR = ({ setIsOpen }: Props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <ModalFileImport
      title={t('main.import_excel_file')}
      exampleFilePath="/excel/Template_HR_Module.xlsx"
      setIsOpen={setIsOpen}
      onImport={async (file) =>
        resultToastOptions(await dispatch(importExcelHRModule(file)))
      }
    />
  );
};

export default ModalHR;
