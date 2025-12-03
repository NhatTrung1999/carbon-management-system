import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';
import NoData from '../../../../assets/images/no-data.png';
import type {
  Dispatch,
  RefObject,
  SetStateAction,
  UIEventHandler,
} from 'react';
import { useTranslation } from 'react-i18next';
import type { TableHeaderProps } from '../../../../types/table';
import { useAppSelector } from '../../../../app/hooks';
import type { ICustomExportData } from '../../../../types/customexport';

type Props = {
  header: TableHeaderProps[];
  activeSort: {
    sortField: string;
    sortOrder: string;
  };
  setActiveSort: (data: any) => void;
  data: ICustomExportData[];
  tableRef?: RefObject<HTMLDivElement | null>;
  onScroll: UIEventHandler<HTMLDivElement>;
  setField?: Dispatch<SetStateAction<string[]>>;
};

const Table = ({
  header,
  activeSort,
  setActiveSort,
  data,
  tableRef,
  onScroll,
  setField,
}: Props) => {
  const { loading } = useAppSelector((state) => state.category);
  const handleSorting = (sortField: string, sortOrder: string): void => {
    setActiveSort({ sortField, sortOrder });
  };
  const { t } = useTranslation();

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

  const handleClickInput = (value: string, checked: boolean) => {
    // const checked = e.target.checked;
    setField &&
      setField((prev: string[]) =>
        checked
          ? prev.includes(value)
            ? prev
            : [...prev, value]
          : prev.filter((item) => item !== value)
      );
  };

  return (
    <div
      className="max-h-[600px] overflow-y-auto relative"
      ref={tableRef}
      onScroll={onScroll}
    >
      <table className="w-full text-left min-w-max">
        <thead className="bg-[#636e61] text-sm sticky top-0 text-white">
          <tr>
            {header.map((item, index) => (
              <th className="px-4 py-4 whitespace-break-spaces" key={index}>
                <div className="flex flex-row gap-6 items-center justify-between">
                  <span>{t(item.name)}</span>
                  <span className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      className="size-4.5 accent-green-500"
                      onClick={(e) =>
                        handleClickInput(item.state, e.currentTarget.checked)
                      }
                    />
                    {item.sort && (
                      <span className="flex flex-col cursor-pointer">
                        {renderSortIcon(item)}
                      </span>
                    )}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="h-[70px]">
          {data.length > 0 &&
            data.map((item, index) => (
              <tr key={index}>
                <td className="box-border px-3 py-3">{item.No}</td>
                <td className="box-border px-3 py-3">{item.Factory}</td>
                <td className="box-border px-3 py-3">{item.Department}</td>
                <td className="box-border px-3 py-3">{item.ID}</td>
                <td className="box-border px-3 py-3">{item.Full_Name}</td>
                <td className="box-border px-3 py-3">{item.Current_Address}</td>
                <td className="box-border px-3 py-3">
                  {item.Transportation_Mode}
                </td>
                <td className="box-border px-3 py-3">{item.Bus_Route}</td>
                <td className="box-border px-3 py-3">{item.Pickup_Point}</td>
                <td className="box-border px-3 py-3">
                  {item.Number_of_Working_Days}
                </td>
              </tr>
            ))}
          {loading &&
            data.length > 0 &&
            Array.from({ length: 1 }).map((_, i) => (
              <tr key={`skeleton-${i}`} className="animate-pulse">
                {header.map((_, colIndex) => (
                  <td key={colIndex} className="box-border px-3 py-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
          {!loading && data.length === 0 && (
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
          )}
        </tbody>
      </table>

      {loading && data.length === 0 && (
        <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-center w-full top-22">
          <div className="animate-spin border-4 border-gray-300 border-t-[#636e61] rounded-full w-10 h-10"></div>
        </div>
      )}
    </div>
  );
};

export default Table;
