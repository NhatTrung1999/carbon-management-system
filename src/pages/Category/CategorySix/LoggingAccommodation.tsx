import LoggingPage from '../../../components/Category/LoggingPage';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  fetchLogCat6Accommodation,
  resetLogCat6Accommodation,
} from '../../../features/logcatSlice';
import { HEADER_ACCOMMODATION } from '../../../types/loggingcat6';

const LoggingAccommodation = () => {
  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.logcat.logcat6accommodation);

  return (
    <LoggingPage
      header={HEADER_ACCOMMODATION}
      list={list}
      reset={() => dispatch(resetLogCat6Accommodation())}
      fetch={(query) => dispatch(fetchLogCat6Accommodation(query))}
    />
  );
};

export default LoggingAccommodation;
