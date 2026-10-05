import LoggingPage from '../../../components/Category/LoggingPage';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchLogCat5, resetLogCat5 } from '../../../features/logcatSlice';
import logcatApi from '../../../api/logcat';
import { HEADER_LOGGING_CMS } from '../../../types/loggingcms';
import { todayLocal } from '../../../utils/formatDate';

const Logging = () => {
  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.logcat.logcat5);

  return (
    <LoggingPage
      header={HEADER_LOGGING_CMS}
      list={list}
      reset={() => dispatch(resetLogCat5())}
      fetch={(query) => dispatch(fetchLogCat5(query))}
      exportExcel={{
        request: logcatApi.exportExcelCat5,
        fileName: () => `Log_Cat5_${todayLocal()}.xlsx`,
      }}
    />
  );
};

export default Logging;
