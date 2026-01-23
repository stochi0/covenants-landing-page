"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          ref={ref}
          {...props}
        />
        <div
          className={cn(
            "h-4 w-4 shrink-0 rounded border border-primary ring-offset-background transition-all",
            "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            "peer-checked:bg-primary peer-checked:text-primary-foreground",
            "flex items-center justify-center",
            className
          )}
        >
          <Check className="h-3 w-3 opacity-0 peer-checked:opacity-100 text-primary-foreground pointer-events-none" />
        </div>
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

// Simpler controlled checkbox component
interface ControlledCheckboxProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
  className?: string
  id?: string
}

function ControlledCheckbox({
  checked,
  onCheckedChange,
  disabled,
  className,
  id,
}: ControlledCheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      id={id}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "h-4 w-4 shrink-0 rounded border border-input ring-offset-background transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        checked && "bg-primary border-primary",
        "flex items-center justify-center",
        className
      )}
    >
      {checked && <Check className="h-3 w-3 text-primary-foreground" />}
    </button>
  )
}

export { Checkbox, ControlledCheckbox }

