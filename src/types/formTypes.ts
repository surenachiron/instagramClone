import { InputProps } from '@/components/Input';

export type FormInputProps = InputProps & {
  error: string | undefined;
  parentClasses?: string;
  labelContent?: string;
  labelClasses?: string;
};
