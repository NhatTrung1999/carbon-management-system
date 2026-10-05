import MasterDataTab from '../../../components/Category/MasterDataTab';
import ModalPortCode from '../../../components/Category/CategoryNineAndCategoryTwelve/ModalPortCode';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getPortCode } from '../../../features/masterDataSlice';
import { HEADER_PORTCODE } from '../../../types/cat9andcat12';

const PortCode = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.masterData.portCode);
  const loading = useAppSelector((state) => state.masterData.loading);

  return (
    <MasterDataTab
      header={HEADER_PORTCODE}
      data={data}
      loading={loading}
      fetch={(sort) => dispatch(getPortCode(sort))}
      ImportModal={ModalPortCode}
      dateFields={['CreatedDate']}
    />
  );
};

export default PortCode;
