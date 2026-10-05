import type {
  Dispatch,
  RefObject,
  SetStateAction,
  UIEventHandler,
} from 'react';
import { useAppSelector } from '../../../../app/hooks';
import type { ICustomExportData } from '../../../../types/customexport';
import type { TableHeaderProps, SortState } from '../../../../types/table';
import CommonTable, { Td } from '../../../common/Table';

type Props = {
  header: TableHeaderProps[];
  activeSort: SortState;
  setActiveSort: (data: SortState) => void;
  data: ICustomExportData[];
  tableRef?: RefObject<HTMLDivElement | null>;
  onScroll: UIEventHandler<HTMLDivElement>;
  setField?: Dispatch<SetStateAction<string[]>>;
};

// Glass checkbox — đồng bộ với Checkbox.tsx đã tối ưu
const GlassCheckbox = ({
  state,
  onChange,
}: {
  state: string;
  onChange: (value: string, checked: boolean) => void;
}) => (
  <label className="group ml-2 flex cursor-pointer items-center">
    <input
      type="checkbox"
      className="peer sr-only"
      onClick={(e) => onChange(state, e.currentTarget.checked)}
    />
    <span
      className="relative flex h-4 w-4 shrink-0 items-center justify-center
      rounded-md border border-white/[0.25] bg-white/[0.06]
      transition-all duration-200
      peer-checked:border-emerald-400/60 peer-checked:bg-emerald-400/20
      peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-400/50
      group-hover:border-white/40"
    >
      <svg
        viewBox="0 0 10 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-2.5 w-2.5 text-emerald-300
          scale-0 opacity-0 transition-all duration-150
          peer-checked:[&]:scale-100
          [.peer:checked~span>&]:scale-100 [.peer:checked~span>&]:opacity-100"
        aria-hidden="true"
      >
        <polyline points="1,5 3.5,8 9,2" />
      </svg>
    </span>
  </label>
);

const Table = ({
  header,
  activeSort,
  setActiveSort,
  data,
  tableRef,
  onScroll,
  setField,
}: Props) => {
  const { loading } = useAppSelector((state) => state.category.customExport);

  const handleCheckbox = (value: string, checked: boolean) => {
    setField?.((prev) =>
      checked
        ? prev.includes(value)
          ? prev
          : [...prev, value]
        : prev.filter((v) => v !== value),
    );
  };

  return (
    <CommonTable
      header={header}
      data={data}
      loading={loading}
      renderRow={(item) => (
        <>
          <Td>{item.No}</Td>
          <Td>{item.Factory}</Td>
          <Td>{item.Department}</Td>
          <Td>{item.ID}</Td>
          <Td>{item.Full_Name}</Td>
          <Td>{item.Current_Address}</Td>
          <Td>{item.Transportation_Mode}</Td>
          <Td>{item.Bus_Route}</Td>
          <Td>{item.Pickup_Point}</Td>
          <Td>{item.Number_of_Working_Days}</Td>
        </>
      )}
      renderHeaderExtra={
        setField
          ? (item) => (
              <GlassCheckbox state={item.state} onChange={handleCheckbox} />
            )
          : undefined
      }
      activeSort={activeSort}
      onSortChange={setActiveSort}
      tableRef={tableRef}
      onScroll={onScroll}
      headerClassName="bg-[#636e61]/90 backdrop-blur-md"
    />
  );
};

export default Table;
