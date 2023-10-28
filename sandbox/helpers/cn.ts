import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// https://github.com/dcastil/tailwind-merge/issues/297
// Ensure custom font sizes are considered as sizes and not as colors by
// tailwind-merge
const customTwMerge = extendTailwindMerge({
  classGroups: {
    'font-size': [
      { text: [(value: string) => /^(details|body|heading)/.test(value)] },
    ],
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
