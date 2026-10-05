import LoggingPage from '../../../components/Category/LoggingPage';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchLogCat7, resetLogCat7 } from '../../../features/logcatSlice';
import logcatApi from '../../../api/logcat';
import { HEADER } from '../../../types/loggingcat7';
import { todayLocal } from '../../../utils/formatDate';

const Logging = () => {
  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.logcat.logcat7);

  return (
    <LoggingPage
      header={HEADER}
      list={list}
      reset={() => dispatch(resetLogCat7())}
      fetch={(query) => dispatch(fetchLogCat7(query))}
      exportExcel={{
        request: logcatApi.exportExcelCat7,
        fileName: () => `Log_Cat7_${todayLocal()}.xlsx`,
      }}
    />
  );
};

export default Logging;
