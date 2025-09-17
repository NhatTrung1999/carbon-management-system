import { Fragment, useEffect, useState } from 'react';
import { BreadcrumbData } from '../../../types/breadcrumb';

import Card from '../../../components/common/Card';
import Table from '../../../components/SystemSettings/FileManagement/Table';
import Typography from '../../../components/common/Typography';
import Breadcrumb from '../../../components/common/Breadcrumb';
import Search from '../../../components/SystemSettings/FileManagement/Search';
import { HEADER, type IFileManagement } from '../../../types/filemanagement';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getData } from '../../../features/fileSlice';

const FileManagement = () => {
  const [getFileManagementData, setGetFileManagementData] = useState<
    IFileManagement[] | any
  >([]);
  const { file } = useAppSelector((state) => state.file);

  const [activeSort, setActiveSort] = useState({
    sortField: HEADER[0].state,
    sortOrder: 'asc',
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getData({ module: '', file_name: '' }));
  }, []);


  return (
    <Fragment>
      <Breadcrumb
        items={BreadcrumbData('Carbon Management System', 'File Management')}
      />

      <Typography
        name="File Management"
        className="text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text mb-3"
      />
      <Card className="relative">
        <Search setGetFileManagementData={setGetFileManagementData} />
        <Table
          header={HEADER}
          data={file}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
        />
      </Card>
    </Fragment>
  );
};

export default FileManagement;
