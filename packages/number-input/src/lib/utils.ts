import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  // TODO: clsx 应该没必要；twMerge是否有必要，要研究buttonVariants内部是否有merge类名
  return twMerge(clsx(inputs));
}
