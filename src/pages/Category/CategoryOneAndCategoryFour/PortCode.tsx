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
          size={16}
          className={`cursor-pointer transition-colors ${
            activeSort.sortField === item.state &&
            activeSort.sortOrder === 'asc'
              ? 'text-stone-700'
              : 'text-white/60 hover:text-white'
          }`}
          onClick={() => handleSorting(item.state, 'asc')}
        />
        <TiArrowSortedDown
          size={16}
          className={`cursor-pointer transition-colors ${
            activeSort.sortField === item.state &&
            activeSort.sortOrder === 'desc'
              ? 'text-stone-700'
              : 'text-white/60 hover:text-white'
          }`}
          onClick={() => handleSorting(item.state, 'desc')}
        />
      </div>
    );

  const handleImportExcel = () => {
    setIsOpen(true);
  };

  return (
    <div className="w-full">
      <div className="mb-4 sm:mb-5 px-2 sm:px-0">
        <Button
          label={t('cat9andcat12.import_excel_file')}
          type="button"
          className="w-full sm:w-auto bg-green-500 hover:bg-green-500/80 cursor-pointer flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-colors duration-300"
          imgSrc={ExcelIcon}
          onClick={handleImportExcel}
        />
      </div>

      <div className="overflow-x-auto">
        <div className="max-h-[400px] sm:max-h-[500px] md:max-h-[600px] overflow-y-auto relative rounded-lg border border-gray-200">
          <table className="w-full text-left min-w-max">
            <thead className="bg-[#636e61] text-xs sm:text-sm sticky top-0 text-white z-10">
              <tr>
                {header.map((item, index) => (
                  <th 
                    className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 whitespace-nowrap" 
                    key={index}
                  >
                    <div className="flex flex-row gap-2 sm:gap-4 md:gap-6 items-center justify-between">
                      <span className="font-semibold">{t(item.name)}</span>
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
            <tbody className="min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={header.length}
                    className="text-center box-border px-4 sm:px-6 py-8 sm:py-12"
                  >
                    <div className="flex justify-center items-center flex-col space-y-3">
                      <img 
                        src={NoData} 
                        className="w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30 object-contain" 
                        alt="No data"
                      />
                      <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-600">
                        No data available
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {data.map((item, index) => (
                    <tr 
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm whitespace-nowrap">
                        {item.SupplierID}
                      </td>
                      <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm whitespace-nowrap">
                        {item.PortCode}
                      </td>
                      <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                        {item.TransportMethod}
                      </td>
                      <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                        {item.CreatedBy}
                      </td>
                      <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm whitespace-nowrap">
                        {formatDate(item.CreatedDate)}
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isOpen && <ModalPortCode setIsOpen={setIsOpen} />}
    </div>
  );
};

export default PortCode;