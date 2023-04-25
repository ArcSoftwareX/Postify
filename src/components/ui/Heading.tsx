import { cn } from "@/utils/classes";
import { VariantProps, cva } from "class-variance-authority";
import { type HTMLAttributes, forwardRef } from "react";

export const headingVariants = cva('text-slate-700', {
    variants: {
        size: {
            default: 'text-xl font-semibold',
            lg: 'text-3xl font-bold',
            xlg: 'text-5xl font-bold'
        }
    },
    defaultVariants: {
        size: 'default'
    }
})

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> { }

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading({ size, className, children, ...props }, ref) {
    return <h1 className={cn(headingVariants({ size, className }))} {...props} ref={ref}>{ children }</h1>
})