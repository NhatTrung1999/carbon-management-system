import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../common/Button';
import CommonTable from '../common/Table';
import DataTable from '../common/DataTable';
import ExcelIcon from '../../assets/images/excel-icon.png';
import type { SortState, TableHeaderProps } from '../../types/table';

type Props<T> = {
  header: TableHeaderProps[];
  data: T[];
  loading: boolean;
  /** Loads the whole list with the given sort. */
  fetch: (sort: SortState) => void;
  /** Modal opened by the Import Excel button. */
  ImportModal: ComponentType<{ setIsOpen: (isOpen: boolean) => void }>;
  /** Cells are generated from the header unless a custom row renderer is given. */
  renderRow?: (item: T, index: number) => ReactNode;
  rowClassName?: (item: T, index: number) => string | undefined;
  dateFields?: string[];
  /** Extra content such as confirm dialogs. */
  children?: ReactNode;
};

const HEADER_CLASS = 'bg-[#636e61]/90 backdrop-blur-md';

/** Master-data tab: an Import Excel button above a server-sorted table. */
const MasterDataTab = <T extends object>({
  header,
  data,
  loading,
  fetch,
  ImportModal,
  renderRow,
  rowClassName,
  dateFields,
  children,
}: Props<T>) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSort, setActiveSort] = useState<SortState>({
    sortField: header[0].state,
    sortOrder: 'asc',
  });

  const fetchRef = useRef(fetch);
  useEffect(() => {
    fetchRef.current = fetch;
  });

  useEffect(() => {
    fetchRef.current(activeSort);
  }, [activeSort]);

  return (
    <div className="flex min-h-full min-w-0 flex-col xl:h-full xl:min-h-0">
      <div className="mb-4 sm:mb-5 px-2 sm:px-0">
        <Button
          label={t('main.import_excel_file')}
          type="button"
          variant="excel"
          className="w-full sm:w-auto"
          imgSrc={ExcelIcon}
          onClick={() => setIsOpen(true)}
        />
      </div>

      {renderRow ? (
        <CommonTable
          header={header}
          data={data}
          loading={loading}
          activeSort={activeSort}
          onSortChange={setActiveSort}
          renderRow={renderRow}
          rowClassName={rowClassName}
          headerClassName={HEADER_CLASS}
        />
      ) : (
        <DataTable
          header={header}
          data={data}
          loading={loading}
          activeSort={activeSort}
          onSortChange={setActiveSort}
          dateFields={dateFields}
        />
      )}

      {isOpen && <ImportModal setIsOpen={setIsOpen} />}
      {children}
    </div>
  );
};

export default MasterDataTab;
