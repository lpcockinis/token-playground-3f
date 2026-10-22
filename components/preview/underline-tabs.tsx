'use client'

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import { cn } from '@/lib/utils'

export const UnderlineTabs = TabsPrimitive.Root
export const UnderlineTabsPanel = TabsPrimitive.Panel

export function UnderlineTabsList({
  className,
  items,
  label,
}: {
  className?: string
  label: string
  items: { value: string; label: string }[]
}) {
  return (
    <TabsPrimitive.List
      aria-label={label}
      className={cn('relative flex overflow-x-auto border-b border-border [scrollbar-width:none]', className)}
    >
      {items.map((item) => (
        <TabsPrimitive.Tab
          key={item.value}
          value={item.value}
          className="focus-ring relative shrink-0 rounded-t-md px-3.5 pt-2 pb-4 text-[15px] font-medium whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground data-[active]:font-semibold data-[active]:text-brand sm:px-3.5 sm:text-base"
        >
          {item.label}
        </TabsPrimitive.Tab>
      ))}
      <TabsPrimitive.Indicator className="absolute bottom-0 left-(--active-tab-left) h-0.5 w-(--active-tab-width) rounded-full bg-brand transition-all duration-200" />
    </TabsPrimitive.List>
  )
}
