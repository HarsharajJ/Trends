"use client"

import * as React from "react"

interface CheckboxProps {
    id?: string
    checked?: boolean
    onCheckedChange?: (checked: boolean) => void
    className?: string
    disabled?: boolean
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ id, checked, onCheckedChange, className, disabled, ...props }, ref) => {
        return (
            <div className="relative flex items-center">
                <input
                    type="checkbox"
                    id={id}
                    ref={ref}
                    checked={checked}
                    onChange={(e) => onCheckedChange?.(e.target.checked)}
                    disabled={disabled}
                    className="sr-only peer"
                    {...props}
                />
                <div
                    onClick={() => !disabled && onCheckedChange?.(!checked)}
                    className={`
            h-4 w-4 shrink-0 rounded-sm border border-primary cursor-pointer
            ring-offset-background focus-visible:outline-none focus-visible:ring-2 
            focus-visible:ring-ring focus-visible:ring-offset-2
            disabled:cursor-not-allowed disabled:opacity-50
            ${checked ? 'bg-primary text-primary-foreground' : 'bg-background'}
            ${className || ''}
          `}
                >
                    {checked && (
                        <svg
                            className="h-4 w-4 text-primary-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    )}
                </div>
            </div>
        )
    }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
