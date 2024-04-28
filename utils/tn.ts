import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

export const twMergeExtended = extendTailwindMerge({
  classGroups: {
    size: [
      {
        text: [
          'xl',
          'lg',
          'md',
          'sm',
          'h1',
          'h1',
          'h3',
          'h4',
          'h5',
          'b1',
          'b2',
          'b3',
        ],
      },
    ],
    color: [
      {
        text: ['default', 'neutral', { brand: ['primary'] }],
      },
    ],
  },
})

export function tn(...args: ClassValue[]) {
  return twMergeExtended(clsx(args))
}
