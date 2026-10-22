'use client'

import { ChevronUp } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

interface ControlSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function ControlSection({ title, children, defaultOpen = true }: ControlSectionProps) {
  return (
    <Collapsible defaultOpen={defaultOpen} className="border-b border-border last:border-b-0">
      <h3>
        <CollapsibleTrigger className="focus-ring group flex w-full items-center justify-between rounded-md px-5 py-5 text-left text-base font-semibold text-foreground md:px-5">
          {title}
          <ChevronUp
            aria-hidden="true"
            className="size-4 text-muted-foreground transition-transform duration-200 group-data-[panel-open]:rotate-0 rotate-180"
          />
        </CollapsibleTrigger>
      </h3>
      <CollapsibleContent className="px-5 pb-7">
        <div className="flex flex-col gap-6">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  )
}
