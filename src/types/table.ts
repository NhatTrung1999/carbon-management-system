export interface TableHeaderProps {
  name: string;
  state: string;
  sort: boolean;
  /** Shows a value filter in the column header (client-side). */
  filterable?: boolean;
  children?: Omit<TableHeaderProps, 'children'>[];
}

export type SortState = { sortField: string; sortOrder: string };
