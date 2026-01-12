import Button from '../../../components/common/Button';
import ExcelIcon from '../../../assets/images/excel-icon.png';
import type { TableHeaderProps } from '../../../types/table';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { useEffect, useState } from 'react';
import {
  HEADER_PORTCODE,
  type IPortCodeData,
} from '../../../types/cat9andcat12';
import NoData from '../../../assets/images/no-data.png';
import ModalPortCode from '../../../components/Category/CategoryNineAndCategoryTwelve/ModalPortCode';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getPortCode } from '../../../features/categorySlice';
import { formatDate } from '../../../utils/formatDate';
import { useTranslation } from 'react-i18next';

type Props = {
  header: TableHeaderProps[];
  data: IPortCodeData[];
};

const PortCode = ({ header, data }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.category); 
  const [activeSort, setActiveSort] = useState({
    sortField: HEADER_PORTCODE[0].state,
    sortOrder: 'asc',
  });
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(
      getPortCode({
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

  const getTableHeight = () => {
    if (loading && data.length === 0) {
      return 'max-h-[250px]';
    }
    if (data.length === 0 && !loading) {
      return 'max-h-[300px]';
    }
    return 'max-h-[400px] sm:max-h-[500px] md:max-h-[600px]';
  };

  return (
    <div className="w-full">
      <div className="mb-4 sm:mb-5 px-2 sm:px-0">
        <Button
          label={t('main.import_excel_file')}
          type="button"
          className="w-full sm:w-auto bg-green-500 hover:bg-green-500/80 cursor-pointer flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-colors duration-300"
          imgSrc={ExcelIcon}
          onClick={handleImportExcel}
        />
      </div>

      <div className="overflow-x-auto">
        <div className={`${getTableHeight()} overflow-y-auto relative rounded-lg border border-gray-200 bg-white transition-all duration-300`}>
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
            <tbody>
              {data.length > 0 &&
                data.map((item, index) => (
                  <tr 
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm whitespace-nowrap">
                      {item.CustomerNumber}
                    </td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm whitespace-nowrap">
                      {item.PortCode}
                    </td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                      {item.TransportMethod}
                    </td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                      {item.CreatedAt}
                    </td>
                    <td className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm whitespace-nowrap">
                      {formatDate(item.CreatedDate)}
                    </td>
                  </tr>
                ))}

              {loading &&
                data.length > 0 &&
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={`skeleton-${i}`} className="border-b border-gray-200">
                    {header.map((_, colIndex) => (
                      <td key={colIndex} className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]"></div>
                      </td>
                    ))}
                  </tr>
                ))}

              {loading && data.length === 0 && (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={`skeleton-loading-${i}`} className="border-b border-gray-200">
                    {header.map((_, colIndex) => (
                      <td key={colIndex} className="box-border px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                        <div 
                          className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]"
                          style={{
                            animationDelay: `${i * 0.1}s`
                          }}
                        ></div>
                      </td>
                    ))}
                  </tr>
                ))
              )}

              {!loading && data.length === 0 && (
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