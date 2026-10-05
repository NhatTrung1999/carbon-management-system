import LoggingPage from '../../../components/Category/LoggingPage';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  fetchLogCat1AndCat4,
  resetLogCat1And4,
} from '../../../features/logcatSlice';
import logcatApi from '../../../api/logcat';
import { HEADER_LOGGING_CMS } from '../../../types/loggingcms';

const Logging = () => {
  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.logcat.logcat1and4);

  return (
    <LoggingPage
      header={HEADER_LOGGING_CMS}
      list={list}
      reset={() => dispatch(resetLogCat1And4())}
      fetch={(query) => dispatch(fetchLogCat1AndCat4(query))}
      exportExcel={{
        request: logcatApi.exportExcelCat1And4,
        fileName: ({ dateFrom, dateTo }) =>
          `Log_Cat1_And_Cat4_${dateFrom}_${dateTo}.xlsx`,
      }}
    />
  );
};

export default Logging;
