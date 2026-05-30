import { useAppDispatch } from '../../../app/hooks';
import { importExcelPortCodeCat1AndCat4 } from '../../../features/categorySlice';
import ModalFileImport from '../ModalFileImport';

type Props = {
  setIsOpen: (isOpen: boolean) => void;
};

const ModalPortCode = ({ setIsOpen }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <ModalFileImport
      title="Port Code"
      exampleFilePath="/excel/Example_Port_Code_Cat1_And_4.xlsx"
      setIsOpen={setIsOpen}
      onImport={async (file) => {
        const res = await dispatch(importExcelPortCodeCat1AndCat4(file));
        const ok  = importExcelPortCodeCat1AndCat4.fulfilled.match(res);
        return {
          icon : ok ? 'success' : 'error',
          title: ok ? (res.payload as { message: string }).message : (res.payload as string),
        };
      }}
    />
  );
};

export default ModalPortCode;
