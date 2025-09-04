export interface InputProps {
  label?: string;
  type: string;
  name: string;
  value?: string | number | Date | any;
  helperText?: string | null | any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  classNameLabel?: string;
  customClassNameInput?: string;
  readonly?: boolean;
  autoComplete?: string;
}
