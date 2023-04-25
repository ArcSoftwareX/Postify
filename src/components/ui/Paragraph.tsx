import { cn } from "@/utils/classes";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, forwardRef } from "react";

export const paragraphVariants = cva('text-base font-medium', {
    variants: {
        type: {
            default: 'text-slate-700',
            secondary: 'text-slate-500 font-semibold',
            tertiary: 'text-slate-400 font-semibold text-sm'
        }
    },
    defaultVariants: {
        type: 'default'
    }
})

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof paragraphVariants> {}

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(function Paragraph({ type, className, children, ...props }, ref) {
    return <p className={cn(paragraphVariants({ type, className }))} ref={ref}>{ children }</p>
})