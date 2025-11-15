export interface TableHeaderProps {
  name: string;
  state: string;
  sort: boolean;
  children?: { name: string; state: string; sort: boolean }[];
}
