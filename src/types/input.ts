export interface InputProps {
  label?: string;
  type: string;
  name: string;
  value?: string | number;
  helperText?: string | null;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  classNameLabel?: string;
  customClassNameInput?: string;
  readonly?: boolean;
  autoComplete?: string;
  placeholder?: string;
  disabled?: boolean;
}
