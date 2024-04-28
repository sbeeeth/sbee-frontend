import { forwardRef, HTMLAttributes, LegacyRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { tn } from '@utils/tn'

const text = tv(
  {
    base: 'font-urbanist text-left',
    variants: {
      color: {
        primary: 'text-co-gray-1',
        secondary: 'text-co-gray-2',
        light: 'text-co-gray-3',
        purple: 'text-co-purple-1',
      },
      size: {
        sm: 'text-sm',
        md: 'text-md',
        lg: 'text-lg',
        xl: 'text-xl',
        h1: 'text-h1 font-extrabold',
        h2: 'text-h2 font-extrabold',
        h3: 'text-h3 font-bold',
        body1: 'text-b1 font-bold',
        body2: 'text-b2 font-medium',
        body3: 'text-b3 font-medium',
        button: 'text-md font-semibold',
        subtitle: 'text-xs font-semibold',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'body3',
    },
  },
  { twMerge: false }
)

type TextVariants = VariantProps<typeof text>

interface TextProps
  extends Omit<HTMLAttributes<HTMLParagraphElement | HTMLSpanElement>, 'color'>,
    TextVariants {
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3'
  children: React.ReactNode
}

export const Text = forwardRef<
  HTMLAttributes<HTMLParagraphElement | HTMLSpanElement>,
  TextProps
>(({ color, size, as = 'p', className, ...props }, ref) => {
  const Comp = as

  return (
    <Comp
      className={tn(text({ color, size }), className)}
      ref={ref as LegacyRef<HTMLParagraphElement>}
      {...props}
    >
      {props.children}
    </Comp>
  )
})

Text.displayName = 'Text'
export default Text
