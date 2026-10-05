import LoggingPage from '../../../components/Category/LoggingPage';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  fetchLogCat9AndCat12,
  resetLogCat9And12,
} from '../../../features/logcatSlice';
import logcatApi from '../../../api/logcat';
import { HEADER_LOGGING_CMS } from '../../../types/loggingcms';
import { todayLocal } from '../../../utils/formatDate';

const Logging = () => {
  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.logcat.logcat9and12);

  return (
    <LoggingPage
      header={HEADER_LOGGING_CMS}
      list={list}
      reset={() => dispatch(resetLogCat9And12())}
      fetch={(query) => dispatch(fetchLogCat9AndCat12(query))}
      exportExcel={{
        request: logcatApi.exportExcelCat9And12,
        fileName: () => `Log_Cat9_And_Cat12_${todayLocal()}.xlsx`,
      }}
    />
  );
};

export default Logging;
