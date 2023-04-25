import { cn } from "@/utils/classes"
import { HTMLAttributes, forwardRef } from "react"

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, CardProps>(function Card({ children, className, ...props }, ref) {
    return <div {...props} ref={ref} className={cn(["rounded-lg backdrop-blur bg-white/50 border border-slate-200", className])}>{ children }</div>
})

export default Card