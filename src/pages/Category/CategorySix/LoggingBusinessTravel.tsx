import LoggingPage from '../../../components/Category/LoggingPage';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  fetchLogCat6BusinessTravel,
  resetLogCat6BusinessTravel,
} from '../../../features/logcatSlice';
import { HEADER_BUSINESS_TRAVEL } from '../../../types/loggingcat6';

const LoggingBusinessTravel = () => {
  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.logcat.logcat6businesstravel);

  return (
    <LoggingPage
      header={HEADER_BUSINESS_TRAVEL}
      list={list}
      reset={() => dispatch(resetLogCat6BusinessTravel())}
      fetch={(query) => dispatch(fetchLogCat6BusinessTravel(query))}
    />
  );
};

export default LoggingBusinessTravel;
