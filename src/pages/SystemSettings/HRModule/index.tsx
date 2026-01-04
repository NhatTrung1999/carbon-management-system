import { Fragment, useState } from 'react';
import { BreadcrumbData } from '../../../types/breadcrumb';

import Card from '../../../components/common/Card';
import Table from '../../../components/SystemSettings/HRModule/Table';
import Typography from '../../../components/common/Typography';
import Breadcrumb from '../../../components/common/Breadcrumb';
import Search from '../../../components/SystemSettings/HRModule/Search';
import { HEADER, mockHRData, type IHRModule } from '../../../types/hrmodule';
import { useTranslation } from 'react-i18next';
import { BREADCRUMB } from '../../../utils/constanst';

const HRModule = () => {
  const { t } = useTranslation();

  const [tableData, setTableData] = useState<IHRModule[]>(mockHRData);
  const [activeSort, setActiveSort] = useState({
    sortField: HEADER[4].state,
    sortOrder: 'desc',
  });

  const handleUpdateRow = (updatedItem: IHRModule) => {
    const newData = tableData.map((item) =>
      item.ID === updatedItem.ID ? updatedItem : item
    );
    setTableData(newData);
    console.log('Đã cập nhật:', updatedItem);
  };

  return (
    <Fragment>
      <Breadcrumb
        items={BreadcrumbData(t(BREADCRUMB), 'Data Collection HR Module')}
      />

      <Typography
        name="Data Collection HR Module"
        className="text-3xl bg-gradient-to-r from-[#081c1b] via-[#3f4a42] to-[#636e61] inline-block text-transparent bg-clip-text mb-3"
      />
      <Card className="relative">
        <Search activeSort={activeSort} />
        <Table
          header={HEADER}
          data={mockHRData}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
          onSave={handleUpdateRow}
        />
      </Card>
    </Fragment>
  );
};

export default HRModule;
