type Props = { text: string; min?: number; max?: number; additionally?: string };

export default function textReducer({ text, min = 0, max = text.length, additionally = '' }: Props) {
  if (text && text.length > 0) return text.slice(min, max) + (text.length > max ? additionally : '');
}
