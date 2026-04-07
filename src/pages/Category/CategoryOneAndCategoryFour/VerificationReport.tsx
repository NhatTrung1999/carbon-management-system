import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import categoryApi from '../../../api/category';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import Select from '../../../components/common/Select';
import {
  HEADER as LOGGING_HEADERS,
  type ILoggingCat1AndCat4Data,
} from '../../../types/loggingcat1and4';
import { FACTORIES } from '../../../utils/constanst';

type ComparisonColumn = {
  key: string;
  label: string;
};

type StatusFilter = 'ALL' | 'MATCHED' | 'MISSING';
type CategoryView = 'CAT1' | 'CAT4';

type VerificationRow = Partial<ILoggingCat1AndCat4Data> & {
  VerificationStatus?: 'MATCHED' | 'MISSING';
};

type VerificationSummary = {
  previewCount: number;
  loggingCount: number;
  matchedCount: number;
  missingCount: number;
  extraCount: number;
};

type VerificationResponse = {
  summary: VerificationSummary;
  rows: VerificationRow[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
  category: CategoryView;
  status: StatusFilter;
};

const PAGE_SIZE = 50;

const CAT_CONFIG = [
  {
    title: 'CAT1',
    description: 'Preview Payload dockey `4.1` so voi Logging.',
  },
  {
    title: 'CAT4',
    description: 'Preview Payload dockey `3.1` so voi Logging.',
  },
] as const;

const COMPARISON_COLUMNS: ComparisonColumn[] = LOGGING_HEADERS.map((header) => ({
  key: header.state,
  label: header.name,
}));

const EMPTY_SUMMARY: VerificationSummary = {
  previewCount: 0,
  loggingCount: 0,
  matchedCount: 0,
  missingCount: 0,
  extraCount: 0,
};

const getDisplayValue = (value: unknown) => {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  return String(value);
};

const SkeletonRows = ({ rowCount = 6 }: { rowCount?: number }) => (
  <>
    {Array.from({ length: rowCount }).map((_, rowIndex) => (
      <tr key={`skeleton-${rowIndex}`} className="border-b border-gray-100">
        <td className="px-4 py-3">
          <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
        </td>
        {COMPARISON_COLUMNS.map((column) => (
          <td key={`${column.key}-${rowIndex}`} className="px-4 py-3">
            <div className="h-4 min-w-[7rem] animate-pulse rounded bg-gray-200" />
          </td>
        ))}
      </tr>
    ))}
  </>
);

const VerificationTable = ({
  title,
  description,
  rows,
  emptyText,
  tableRef,
  onScroll,
  loading,
  loadingMore,
}: {
  title: string;
  description: string;
  rows: VerificationRow[];
  emptyText: string;
  tableRef: React.RefObject<HTMLDivElement | null>;
  onScroll: () => void;
  loading: boolean;
  loadingMore: boolean;
}) => (
  <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
    <div className="border-b border-gray-200 px-5 py-4">
      <h3 className="text-base font-semibold text-[#081c1b]">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
    </div>

    <div className="px-5 py-4">
      <div
        ref={tableRef}
        onScroll={onScroll}
        className="max-h-[32rem] overflow-auto rounded-lg border border-gray-200"
      >
        <table className="min-w-full text-left">
          <thead className="sticky top-0 z-10 bg-[#636e61] text-xs text-white">
            <tr>
              <th className="px-4 py-3 font-semibold align-middle whitespace-nowrap">
                Status
              </th>
              {COMPARISON_COLUMNS.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 font-semibold align-middle whitespace-nowrap"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && rows.length === 0 ? (
              <SkeletonRows rowCount={8} />
            ) : rows.length > 0 ? (
              <>
                {rows.map((row, index) => (
                  <tr
                    key={`${row.DocKey ?? 'row'}-${row.DocNo ?? 'doc'}-${index}`}
                    className="border-b border-gray-100 align-top text-sm hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          row.VerificationStatus === 'MATCHED'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {row.VerificationStatus === 'MATCHED'
                          ? 'Matched'
                          : 'Missing'}
                      </span>
                    </td>
                    {COMPARISON_COLUMNS.map((column) => (
                      <td
                        key={`${row.DocKey ?? 'row'}-${String(column.key)}-${index}`}
                        className="px-4 py-3 whitespace-nowrap"
                      >
                        {getDisplayValue(
                          (row as unknown as Record<string, unknown>)[column.key]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                {loadingMore ? (
                  <SkeletonRows rowCount={3} />
                ) : null}
              </>
            ) : (
              <tr>
                <td
                  colSpan={COMPARISON_COLUMNS.length + 1}
                  className="px-4 py-8 text-center text-sm text-gray-500"
                >
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const VerificationReport = () => {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [dateFrom, setDateFrom] = useState(today);
  const [dateTo, setDateTo] = useState(today);
  const [factory, setFactory] = useState('LYV');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [activeCategory, setActiveCategory] = useState<CategoryView>('CAT1');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<VerificationSummary>(EMPTY_SUMMARY);
  const [rows, setRows] = useState<VerificationRow[]>([]);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const tableRef = useRef<HTMLDivElement | null>(null);

  const loadVerificationData = useCallback(
    async (targetPage: number, append = false) => {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);

      try {
        const response = (await categoryApi.getVerificationReport({
          dateFrom,
          dateTo,
          factory,
          category: activeCategory,
          status: statusFilter,
          page: targetPage,
          limit: PAGE_SIZE,
        })) as VerificationResponse;

        setSummary(response.summary ?? EMPTY_SUMMARY);
        setRows((prev) =>
          append ? [...prev, ...(response.rows ?? [])] : response.rows ?? []
        );
        setTotal(response.total ?? 0);
        setHasMore(Boolean(response.hasMore));
        setPage(response.page ?? targetPage);
      } catch (err) {
        setError('Cannot load verification data.');
        setSummary(EMPTY_SUMMARY);
        setRows([]);
        setTotal(0);
        setHasMore(false);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [activeCategory, dateFrom, dateTo, factory, statusFilter]
  );

  useEffect(() => {
    setPage(1);
    loadVerificationData(1, false);
  }, [loadVerificationData]);

  const handleTableScroll = useCallback(() => {
    const el = tableRef.current;
    if (!el || loading || loadingMore || !hasMore) return;

    const reachedBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 24;
    if (reachedBottom) {
      loadVerificationData(page + 1, true);
    }
  }, [hasMore, loadVerificationData, loading, loadingMore, page]);

  const activeConfig = activeCategory === 'CAT1' ? CAT_CONFIG[0] : CAT_CONFIG[1];

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-20 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <div>
            <Input
              label="Date From"
              type="date"
              name="dateFrom"
              value={dateFrom}
              onChange={(event) => setDateFrom(event.target.value)}
              classNameLabel="mb-2 text-sm"
            />
          </div>
          <div>
            <Input
              label="Date To"
              type="date"
              name="dateTo"
              value={dateTo}
              onChange={(event) => setDateTo(event.target.value)}
              classNameLabel="mb-2 text-sm"
            />
          </div>
          <div>
            <Select
              label="Factory"
              name="factory"
              value={factory}
              onChange={(event) => setFactory(event.target.value)}
              classNameLabel="mb-2 text-sm"
              options={FACTORIES}
              isShowAllSelect={true}
              showAllSelect={true}
            />
          </div>
          <div>
            <Select
              label="Status"
              name="statusFilter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
              classNameLabel="mb-2 text-sm"
              options={[
                { name: 'All', value: 'ALL' },
                { name: 'Matched', value: 'MATCHED' },
                { name: 'Missing', value: 'MISSING' },
              ]}
            />
          </div>
          <div className="flex items-end">
            <Button
              label={loading ? 'Loading...' : 'Compare Data'}
              type="button"
              onClick={() => {
                setPage(1);
                loadVerificationData(1, false);
              }}
              disabled={loading}
              className={`w-full bg-[#FF9119] hover:bg-[#FF9119]/80 ${
                loading ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory('CAT1')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === 'CAT1'
                  ? 'bg-[#081c1b] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              CAT1
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('CAT4')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === 'CAT4'
                  ? 'bg-[#081c1b] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              CAT4
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 lg:min-w-[34rem]">
            <div className="rounded-lg bg-[#f7faf7] px-3 py-2">
              <p className="text-[11px] text-gray-500">Preview</p>
              <p className="mt-1 text-lg font-semibold text-[#081c1b]">
                {summary.previewCount}
              </p>
            </div>
            <div className="rounded-lg bg-[#f7faf7] px-3 py-2">
              <p className="text-[11px] text-gray-500">Logging</p>
              <p className="mt-1 text-lg font-semibold text-[#081c1b]">
                {summary.loggingCount}
              </p>
            </div>
            <div className="rounded-lg bg-[#eef8f1] px-3 py-2">
              <p className="text-[11px] text-gray-500">Matched</p>
              <p className="mt-1 text-lg font-semibold text-green-700">
                {summary.matchedCount}
              </p>
            </div>
            <div className="rounded-lg bg-[#fff4f1] px-3 py-2">
              <p className="text-[11px] text-gray-500">Missing</p>
              <p className="mt-1 text-lg font-semibold text-red-700">
                {summary.missingCount}
              </p>
            </div>
            <div className="rounded-lg bg-[#fff9ec] px-3 py-2">
              <p className="text-[11px] text-gray-500">Extra</p>
              <p className="mt-1 text-lg font-semibold text-[#b97800]">
                {summary.extraCount}
              </p>
            </div>
          </div>
        </div>

        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      </div>

      <VerificationTable
        title={activeConfig.title}
        description={activeConfig.description}
        rows={rows}
        emptyText={`No preview payload data found for ${activeConfig.title}.`}
        tableRef={tableRef}
        onScroll={handleTableScroll}
        loading={loading}
        loadingMore={loadingMore}
      />

      <div className="rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
        <p className="text-sm text-gray-600">
          Loaded {rows.length} / {total} rows
          {hasMore ? ' | Scroll down to load more' : ' | All rows loaded'}
        </p>
      </div>
    </div>
  );
};

export default VerificationReport;
