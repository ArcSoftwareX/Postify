import { cn } from "@/utils/classes";
import { type VariantProps, cva } from "class-variance-authority";
import { type HTMLAttributes, forwardRef } from "react";

const inputVariants = cva('rounded-lg outline-none placeholder:text-black/40 font-semibold text-slate-500 bg-transparent', {
    variants: {
        type: {
            default: '',
            outline: 'border border-slate-100 focus:border-slate-200 px-3 py-2'
        },
        size: {
            default: '',
            lg: 'text-lg',
            xl: 'text-xl',
            xxl: 'text-2xl'
        }
    },
    defaultVariants: {
        type: 'default',
        size: 'default',
    }
})

interface InputProps extends HTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ type, size, className, ...props }, ref) {
    return <input {...props} ref={ref} className={cn(inputVariants({ type, size, className }))}/>
})

export default Input