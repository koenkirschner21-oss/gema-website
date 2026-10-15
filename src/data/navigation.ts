export type NavLinkItem = {
  label: string
  to: string
}

export type NavDropdownItem = {
  label: string
  children: NavLinkItem[]
}

export type NavItem = NavLinkItem | NavDropdownItem

export function isDropdownItem(item: NavItem): item is NavDropdownItem {
  return 'children' in item
}

export const navigation: NavItem[] = [
  {
    label: 'About',
    children: [
      { label: 'About GEMA', to: '/about' },
      { label: 'Meet the Team', to: '/about/team' },
      { label: 'GEM Major', to: '/gem-major' },
    ],
  },
  { label: 'Events', to: '/events' },
  { label: 'Get Involved', to: '/get-involved' },
  { label: 'Partner With GEMA', to: '/partners' },
  { label: 'Contact', to: '/contact' },
]

export function flattenNavigation(items: NavItem[]): NavLinkItem[] {
  return items.flatMap((item) =>
    isDropdownItem(item) ? item.children : [item],
  )
}
