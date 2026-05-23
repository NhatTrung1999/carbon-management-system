import { useCallback, useMemo, useRef, useState } from 'react';
import categoryApi from '../../../api/category';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import Select from '../../../components/common/Select';
import {
  HEADER as LOGGING_HEADERS,
  type ILoggingCat1AndCat4Data,
} from '../../../types/loggingcat1and4';
import { FACTORIES } from '../../../utils/constanst';

// ─── Types ───────────────────────────────────────────────────────────────────

type ComparisonColumn = { key: string; label: string };
type StatusFilter     = 'ALL' | 'MATCHED' | 'MISSING' | 'EXTRA';
type CategoryView     = 'CAT1' | 'CAT4';

type VerificationRow = Partial<ILoggingCat1AndCat4Data> & {
  VerificationStatus?: 'MATCHED' | 'MISSING' | 'EXTRA';
};

type VerificationSummary = {
  previewCount : number;
  loggingCount : number;
  matchedCount : number;
  missingCount : number;
  extraCount   : number;
};

type VerificationResponse = {
  summary  : VerificationSummary;
  rows     : VerificationRow[];
  page     : number;
  limit    : number;
  total    : number;
  hasMore  : boolean;
  category : CategoryView;
  status   : StatusFilter;
};

// ─── Constants ───────────────────────────────────────────────────────────────

const PAGE_SIZE = 50;

const CAT_CONFIG = [
  { title: 'CAT1', description: 'Preview Payload dockey `4.1` so sánh với Logging.' },
  { title: 'CAT4', description: 'Preview Payload dockey `3.1` so sánh với Logging.' },
] as const;

const COMPARISON_COLUMNS: ComparisonColumn[] = LOGGING_HEADERS.map((h) => ({
  key: h.state, label: h.name,
}));

const EMPTY_SUMMARY: VerificationSummary = {
  previewCount: 0, loggingCount: 0,
  matchedCount: 0, missingCount: 0, extraCount: 0,
};

const getDisplayValue = (value: unknown) =>
  value === null || value === undefined || value === '' ? '—' : String(value);

// ─── Status badge config ─────────────────────────────────────────────────────

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  MATCHED: { label: 'Matched', className: 'bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/30' },
  MISSING: { label: 'Missing', className: 'bg-red-400/15    text-red-300    ring-1 ring-red-400/30'     },
  EXTRA  : { label: 'Extra',   className: 'bg-amber-400/15  text-amber-300  ring-1 ring-amber-400/30'   },
};

// ─── SkeletonRows ─────────────────────────────────────────────────────────────

const SkeletonRows = ({ rowCount = 6 }: { rowCount?: number }) => (
  <>
    {Array.from({ length: rowCount }).map((_, i) => (
      <tr key={`sk-${i}`} className="border-b border-white/[0.05]">
        <td className="px-4 py-3">
          <div className="h-5 w-20 animate-pulse rounded-full bg-white/[0.07]" />
        </td>
        {COMPARISON_COLUMNS.map((col) => (
          <td key={`${col.key}-${i}`} className="px-4 py-3">
            <div
              className="h-3.5 min-w-[6rem] animate-pulse rounded-md bg-white/[0.06]"
              style={{ animationDelay: `${i * 0.06}s` }}
            />
          </td>
        ))}
      </tr>
    ))}
  </>
);

// ─── VerificationTable ────────────────────────────────────────────────────────

const VerificationTable = ({
  title, description, rows, emptyText,
  tableRef, onScroll, loading, loadingMore,
}: {
  title       : string;
  description : string;
  rows        : VerificationRow[];
  emptyText   : string;
  tableRef    : React.RefObject<HTMLDivElement | null>;
  onScroll    : () => void;
  loading     : boolean;
  loadingMore : boolean;
}) => (
  <div className="relative flex min-w-0 flex-col overflow-hidden xl:min-h-0 xl:flex-1 rounded-2xl border border-white/[0.10]
    bg-white/[0.04] backdrop-blur-sm">
    {/* Top shimmer */}
    <div className="absolute inset-x-0 top-0 h-px
      bg-gradient-to-r from-transparent via-white/15 to-transparent" />

    {/* Panel header */}
    <div className="shrink-0 border-b border-white/[0.07] px-4 py-3 sm:px-5 sm:py-4">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <p className="mt-0.5 text-xs text-white/40">{description}</p>
    </div>

    {/* Scrollable table */}
    <div
      ref={tableRef}
      onScroll={onScroll}
      className="min-h-[320px] xl:min-h-0 xl:flex-1 overflow-auto
        [scrollbar-width:thin] [scrollbar-color:rgba(52,211,153,0.2)_transparent]
        [&::-webkit-scrollbar]:h-[3px] [&::-webkit-scrollbar]:w-[3px]
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-emerald-400/20"
    >
      <table className="w-max min-w-full text-left">
        {/* Header */}
        <thead className="sticky top-0 z-10">
          <tr className="bg-[#0d1f1b]/90 backdrop-blur-md">
            <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold
              uppercase tracking-[0.10em] text-white/50">
              Status
            </th>
            {COMPARISON_COLUMNS.map((col) => (
              <th key={col.key}
                className="whitespace-nowrap px-4 py-3 text-xs font-semibold
                  uppercase tracking-[0.10em] text-white/50">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {loading && rows.length === 0 ? (
            <SkeletonRows rowCount={8} />
          ) : rows.length > 0 ? (
            <>
              {rows.map((row, i) => {
                const badge = STATUS_BADGE[row.VerificationStatus ?? ''];
                return (
                  <tr
                    key={`${row.DocKey ?? 'row'}-${row.DocNo ?? 'doc'}-${i}`}
                    className="border-b border-white/[0.05] align-top text-sm
                      transition-colors duration-150 hover:bg-white/[0.03]"
                  >
                    <td className="whitespace-nowrap px-4 py-3">
                      {badge && (
                        <span className={`inline-flex items-center rounded-full
                          px-2.5 py-0.5 text-xs font-medium ${badge.className}`}>
                          {badge.label}
                        </span>
                      )}
                    </td>
                    {COMPARISON_COLUMNS.map((col) => (
                      <td key={`${row.DocKey ?? 'r'}-${col.key}-${i}`}
                        className="whitespace-nowrap px-4 py-3 text-xs text-white/70">
                        {getDisplayValue((row as Record<string, unknown>)[col.key])}
                      </td>
                    ))}
                  </tr>
                );
              })}
              {loadingMore && <SkeletonRows rowCount={3} />}
            </>
          ) : (
            <tr>
              <td
                colSpan={COMPARISON_COLUMNS.length + 1}
                className="px-4 py-12 text-center text-sm text-white/30"
              >
                {emptyText}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

// ─── Summary card ─────────────────────────────────────────────────────────────

const SummaryCard = ({
  label, value, valueClass,
}: {
  label      : string;
  value      : number;
  valueClass?: string;
}) => (
  <div className="rounded-xl border border-white/[0.08] bg-white/[0.05] px-3 py-2.5
    backdrop-blur-sm">
    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
      {label}
    </p>
    <p className={`mt-1 text-xl font-bold ${valueClass ?? 'text-white'}`}>
      {value}
    </p>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

const VerificationReport = () => {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const [previewDateFrom,  setPreviewDateFrom]  = useState(today);
  const [previewDateTo,    setPreviewDateTo]    = useState(today);
  const [loggingDateFrom,  setLoggingDateFrom]  = useState(today);
  const [loggingDateTo,    setLoggingDateTo]    = useState(today);
  const [factory,          setFactory]          = useState('LYV');
  const [statusFilter,     setStatusFilter]     = useState<StatusFilter>('ALL');
  const [activeCategory,   setActiveCategory]   = useState<CategoryView>('CAT1');
  const [submittedFilters, setSubmittedFilters] = useState<{
    previewDateFrom : string; previewDateTo  : string;
    loggingDateFrom : string; loggingDateTo  : string;
    factory         : string; statusFilter   : StatusFilter;
    activeCategory  : CategoryView;
  } | null>(null);

  const [page,        setPage]        = useState(1);
  const [loading,     setLoading]     = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error,       setError]       = useState<string | null>(null);
  const [summary,     setSummary]     = useState<VerificationSummary>(EMPTY_SUMMARY);
  const [rows,        setRows]        = useState<VerificationRow[]>([]);
  const [total,       setTotal]       = useState(0);
  const [hasMore,     setHasMore]     = useState(false);

  const tableRef = useRef<HTMLDivElement | null>(null);

  // ── Load data ───────────────────────────────────────────────────────────────
  const loadVerificationData = useCallback(async (
    targetPage: number,
    append     = false,
    filters    = submittedFilters,
  ) => {
    if (!filters) return;
    append ? setLoadingMore(true) : setLoading(true);
    setError(null);
    try {
      const response = (await categoryApi.getVerificationReport({
        previewDateFrom : filters.previewDateFrom,
        previewDateTo   : filters.previewDateTo,
        loggingDateFrom : filters.loggingDateFrom,
        loggingDateTo   : filters.loggingDateTo,
        factory         : filters.factory,
        category        : filters.activeCategory,
        status          : filters.statusFilter,
        page            : targetPage,
        limit           : PAGE_SIZE,
      })) as VerificationResponse;

      setSummary(response.summary ?? EMPTY_SUMMARY);
      setRows((prev) => append ? [...prev, ...(response.rows ?? [])] : (response.rows ?? []));
      setTotal(response.total ?? 0);
      setHasMore(Boolean(response.hasMore));
      setPage(response.page ?? targetPage);
    } catch {
      setError('Cannot load verification data.');
      setSummary(EMPTY_SUMMARY);
      setRows([]); setTotal(0); setHasMore(false);
    } finally {
      setLoading(false); setLoadingMore(false);
    }
  }, [submittedFilters]);

  // ── Infinite scroll ─────────────────────────────────────────────────────────
  const handleTableScroll = useCallback(() => {
    const el = tableRef.current;
    if (!el || loading || loadingMore || !hasMore) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 24)
      loadVerificationData(page + 1, true);
  }, [hasMore, loadVerificationData, loading, loadingMore, page]);

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleCompare = () => {
    const nextFilters = {
      previewDateFrom, previewDateTo,
      loggingDateFrom, loggingDateTo,
      factory, statusFilter, activeCategory,
    };
    setSubmittedFilters(nextFilters);
    setPage(1); setRows([]); setSummary(EMPTY_SUMMARY);
    setTotal(0); setHasMore(false);
    if (tableRef.current) tableRef.current.scrollTop = 0;
    loadVerificationData(1, false, nextFilters);
  };

  const hasCompared     = submittedFilters !== null;
  const displayedCat    = submittedFilters?.activeCategory ?? activeCategory;
  const activeConfig    = displayedCat === 'CAT1' ? CAT_CONFIG[0] : CAT_CONFIG[1];

  return (
    <div className="flex min-h-full min-w-0 flex-col xl:h-full xl:min-h-0 gap-4">

      {/* ── Filter panel ── */}
      <div className="relative shrink-0 overflow-hidden rounded-2xl border border-white/[0.10]
        bg-white/[0.05] backdrop-blur-[32px]
        shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
        {/* Top shimmer */}
        <div className="absolute inset-x-0 top-0 h-px
          bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="p-4 sm:p-5">
          {/* Date + filter inputs */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-7">
            <Input label="Preview Date From" type="date" name="previewDateFrom"
              value={previewDateFrom}
              onChange={(e) => setPreviewDateFrom(e.target.value)} />
            <Input label="Preview Date To" type="date" name="previewDateTo"
              value={previewDateTo}
              onChange={(e) => setPreviewDateTo(e.target.value)} />
            <Input label="Logging Date From" type="date" name="loggingDateFrom"
              value={loggingDateFrom}
              onChange={(e) => setLoggingDateFrom(e.target.value)} />
            <Input label="Logging Date To" type="date" name="loggingDateTo"
              value={loggingDateTo}
              onChange={(e) => setLoggingDateTo(e.target.value)} />
            <Select label="Factory" name="factory" value={factory}
              onChange={(e) => setFactory(e.target.value)}
              options={FACTORIES} isShowAllSelect showAllSelect />
            <Select label="Status" name="statusFilter" value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              options={[
                { name: 'All',     value: 'ALL'     },
                { name: 'Matched', value: 'MATCHED' },
                { name: 'Missing', value: 'MISSING' },
                { name: 'Extra',   value: 'EXTRA'   },
              ]} />
            <div className="flex items-end">
              <Button
                label={loading ? 'Loading...' : 'Compare Data'}
                type="button"
                variant="primary"
                onClick={handleCompare}
                disabled={loading}
                className="w-full"
              />
            </div>
          </div>

          {/* Category toggle + summary */}
          <div className="mt-4 flex flex-col gap-3 border-t border-white/[0.07]
            pt-4 lg:flex-row lg:items-center lg:justify-between">

            {/* CAT toggle pills */}
            <div className="flex gap-2">
              {CAT_CONFIG.map((cat) => {
                const isActive = activeCategory === cat.title;
                return (
                  <button
                    key={cat.title}
                    type="button"
                    onClick={() => setActiveCategory(cat.title as CategoryView)}
                    className={`rounded-xl border px-5 py-2 text-sm font-semibold
                      transition-all duration-200
                      ${isActive
                        ? 'border-emerald-400/40 bg-emerald-400/15 text-emerald-300'
                        : 'border-white/[0.10] bg-white/[0.05] text-white/50 hover:border-white/20 hover:text-white/80'
                      }`}
                  >
                    {cat.title}
                  </button>
                );
              })}
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:min-w-[34rem]">
              <SummaryCard label="Preview"  value={summary.previewCount} />
              <SummaryCard label="Logging"  value={summary.loggingCount} />
              <SummaryCard label="Matched"  value={summary.matchedCount}  valueClass="text-emerald-300" />
              <SummaryCard label="Missing"  value={summary.missingCount}  valueClass="text-red-300"     />
              <SummaryCard label="Extra"    value={summary.extraCount}    valueClass="text-amber-300"   />
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="mt-3 flex items-center gap-2 text-xs text-red-400">
              <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0" fill="currentColor">
                <path d="M6 1a5 5 0 1 0 0 10A5 5 0 0 0 6 1zm0 7.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zM5.25 4.5a.75.75 0 0 1 1.5 0v2a.75.75 0 0 1-1.5 0v-2z" />
              </svg>
              {error}
            </p>
          )}
        </div>
      </div>

      {/* ── Results ── */}
      {hasCompared ? (
        <>
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

          {/* Row count footer */}
          <div className="flex shrink-0 items-center gap-2 rounded-xl border border-white/[0.08]
            bg-white/[0.04] px-4 py-3 sm:px-5 text-xs text-white/40 backdrop-blur-sm">
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor"
              strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
              className="h-3 w-3 shrink-0 text-emerald-400/60">
              <circle cx="6" cy="6" r="5" />
              <path d="M6 5v4M6 3.5v.5" />
            </svg>
            Loaded <span className="font-semibold text-white/70">{rows.length}</span>
            &nbsp;/ {total} rows
            {hasMore
              ? ' · Scroll down to load more'
              : ' · All rows loaded'}
          </div>
        </>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl
          border border-dashed border-white/[0.12] bg-white/[0.03] px-5 py-16
          text-center backdrop-blur-sm">
          <svg viewBox="0 0 40 40" fill="none" stroke="currentColor"
            strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
            className="h-10 w-10 text-white/20">
            <rect x="6" y="6" width="28" height="28" rx="4" />
            <path d="M6 14h28M14 6v8M26 6v8" />
            <path d="M13 22h6M13 28h14" />
          </svg>
          <p className="text-sm text-white/30">
            Chọn điều kiện và bấm <span className="text-emerald-400/70">Compare Data</span> để bắt đầu đối chiếu dữ liệu.
          </p>
        </div>
      )}
    </div>
  );
};

export default VerificationReport;
