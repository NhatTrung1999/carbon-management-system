import Button from '../../../components/common/Button';
import ExcelIcon from '../../../assets/images/excel-icon.png';
import type { TableHeaderProps } from '../../../types/table';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { useEffect, useState } from 'react';

import NoData from '../../../assets/images/no-data.png';
import { useAppDispatch } from '../../../app/hooks';
import { getPortCodeCat1AndCat4 } from '../../../features/categorySlice';
import { formatDate } from '../../../utils/formatDate';
import { useTranslation } from 'react-i18next';
import {
  type IPortCodeDataCat1AndCat4,
  HEADER_PORTCODE,
} from '../../../types/cat1andcat4';
import ModalPortCode from '../../../components/Category/CategoryOneAndCategoryFour/ModalPortCode';

type Props = {
  header: TableHeaderProps[];
  data: IPortCodeDataCat1AndCat4[];
};

const PortCode = ({ header, data }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [activeSort, setActiveSort] = useState({
    sortField: HEADER_PORTCODE[0].state,
    sortOrder: 'asc',
  });
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(
      getPortCodeCat1AndCat4({
        sortField: activeSort.sortField,
        sortOrder: activeSort.sortOrder,
      })
    );
  }, [activeSort]);

  const handleSorting = (sortField: string, sortOrder: string): void => {
    setActiveSort({ sortField, sortOrder });
  };

  const renderSortIcon = (item: TableHeaderProps) =>
    item.state !== 'Action' && (
      <div className="flex flex-col ml-1">
        <TiArrowSortedUp
          className={`cursor-pointer ${
            activeSort.sortField === item.state &&
            activeSort.sortOrder === 'asc'
              ? 'text-stone-700'
              : ''
          }`}
          onClick={() => handleSorting(item.state, 'asc')}
        />
        <TiArrowSortedDown
          className={`cursor-pointer ${
            activeSort.sortField === item.state &&
            activeSort.sortOrder === 'desc'
              ? 'text-stone-700'
              : ''
          }`}
          onClick={() => handleSorting(item.state, 'desc')}
        />
      </div>
    );

  const handleImportExcel = () => {
    setIsOpen(true);
  };
  return (
    <>
      <div className="mb-5">
        <Button
          label={t('cat9andcat12.import_excel_file')}
          type="button"
          className="bg-green-500 hover:bg-green-500/80 cursor-pointer flex items-center gap-2"
          imgSrc={ExcelIcon}
          onClick={handleImportExcel}
        />
      </div>
      <div className="max-h-[500px] overflow-y-auto relative">
        <table className="w-full text-left min-w-max">
          <thead className="bg-[#636e61] text-sm sticky top-0 text-white">
            <tr>
              {header.map((item, index) => (
                <th className="px-4 py-4 whitespace-break-spaces" key={index}>
                  <div className="flex flex-row gap-6 items-center justify-between">
                    <span>{t(item.name)}</span>
                    {item.sort && (
                      <span className="flex flex-col cursor-pointer">
                        {renderSortIcon(item)}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="h-[70px]">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={header.length}
                  className="text-center box-border px-6 py-6"
                >
                  <div className="flex justify-center items-center flex-col">
                    <img src={NoData} className="size-30" />
                    <div className="text-2xl font-semibold">
                      No data available
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="box-border px-3 py-3">
                      {item.SupplierID}
                    </td>
                    <td className="box-border px-3 py-3">{item.PortCode}</td>
                    <td className="box-border px-3 py-3">
                      {item.TransportMethod}
                    </td>
                    <td className="box-border px-3 py-3">{item.CreatedBy}</td>
                    <td className="box-border px-3 py-3">
                      {formatDate(item.CreatedDate)}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>

      {isOpen && <ModalPortCode setIsOpen={setIsOpen} />}
    </>
  );
};

export default PortCode;
