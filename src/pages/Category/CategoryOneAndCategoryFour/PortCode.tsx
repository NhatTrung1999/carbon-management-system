import MasterDataTab from '../../../components/Category/MasterDataTab';
import ModalPortCode from '../../../components/Category/CategoryOneAndCategoryFour/ModalPortCode';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getPortCodeCat1AndCat4 } from '../../../features/masterDataSlice';
import { HEADER_PORTCODE } from '../../../types/cat1andcat4';

const PortCode = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.masterData.portCodeCat1AndCat4);
  const loading = useAppSelector((state) => state.masterData.loading);

  return (
    <MasterDataTab
      header={HEADER_PORTCODE}
      data={data}
      loading={loading}
      fetch={(sort) => dispatch(getPortCodeCat1AndCat4(sort))}
      ImportModal={ModalPortCode}
      dateFields={['CreatedDate']}
    />
  );
};

export default PortCode;
