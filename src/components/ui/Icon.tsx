import { cn } from "@/utils/classes";
import { HTMLAttributes, forwardRef } from "react";

const Icon = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(function Icon({ children, className, ...props }, ref) {
    return <span className={cn(["ms", className])} ref={ref} {...props}>{ children }</span>
})

export default Icon