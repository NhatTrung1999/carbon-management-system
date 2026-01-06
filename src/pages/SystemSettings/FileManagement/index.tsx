import { Fragment, useEffect, useState } from 'react';
import { BreadcrumbData } from '../../../types/breadcrumb';

import Card from '../../../components/common/Card';
import Table from '../../../components/SystemSettings/FileManagement/Table';
import Typography from '../../../components/common/Typography';
import Breadcrumb from '../../../components/common/Breadcrumb';
import Search from '../../../components/SystemSettings/FileManagement/Search';
import { HEADER } from '../../../types/filemanagement';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getData } from '../../../features/fileSlice';
import { useTranslation } from 'react-i18next';
import { BREADCRUMB } from '../../../utils/constanst';

const FileManagement = () => {
  // const [getFileManagementData, setGetFileManagementData] = useState<
  //   IFileManagement[] | any
  // >([]);
  const { file } = useAppSelector((state) => state.file);
  const {t} = useTranslation()

  const [activeSort, setActiveSort] = useState({
    sortField: HEADER[4].state,
    sortOrder: 'desc',
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getData({
        module: '',
        file_name: '',
        sortField: activeSort.sortField,
        sortOrder: activeSort.sortOrder,
      })
    );
  }, [activeSort]);

  return (
    <Fragment>
      <div className="px-3 sm:px-4 md:px-6">
        <Breadcrumb
          items={BreadcrumbData(t(BREADCRUMB), 'File Management')}
        />

        <div className="mb-4 sm:mb-6">
          <Typography
            name="File Management"
            className="text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text leading-tight"
          />
        </div>

        <Card className="relative">
          <div className="overflow-hidden">
            <Search activeSort={activeSort} />
            <Table
              header={HEADER}
              data={file}
              activeSort={activeSort}
              setActiveSort={setActiveSort}
            />
          </div>
        </Card>
      </div>
    </Fragment>
  );
};

export default FileManagement;
