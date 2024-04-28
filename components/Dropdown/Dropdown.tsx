import {
  Dropdown as NextDropdown,
  DropdownItem as NextDropdownItem,
  DropdownSection as NextDropdownSection,
  extendVariants
} from '@nextui-org/react'

export const Dropdown = extendVariants(NextDropdown, {
  variants: {
    color: {
      primary: {
        'content': 'bg-co-bg-1 border border-co-border text-co-text-1'
      }
    }
  },
  defaultVariants: {
    color: 'primary'
  }
})

Dropdown.displayName = 'Dropdown'

export const DropdownSection = extendVariants(NextDropdownSection, {
  variants: {
    color: {
      primary: {
        'divider': 'bg-co-border'
      }
    }
  },
  defaultVariants: {
    color: 'primary'
  }
})

DropdownSection.displayName = 'DropdownSection'

export const DropdownItem = extendVariants(NextDropdownItem, {
  variants: {
    color: {
      primary: {
        base: 'data-[hover=true]:bg-co-bg-1',
      }
    }
  },
  defaultVariants: {
    color: 'primary'
  }
})

DropdownItem.displayName = 'DropdownItem'
