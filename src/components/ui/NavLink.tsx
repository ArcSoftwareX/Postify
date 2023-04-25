import { VariantProps, cva } from "class-variance-authority";
import { ReactNode, forwardRef } from "react";
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

const linkVariants = cva('font-semibold transition-colors', {
    variants: {
        active: {
            active: 'text-blue-500',
            inactive: 'text-slate-500 hover:text-slate-600'
        },
        size: {
            default: 'text-sm',
            lg: 'text-base'
        }
    },
    defaultVariants: {
        active: 'inactive',
        size: 'default'
    }
})

interface LinkProps extends NextLinkProps, VariantProps<typeof linkVariants> {
    pathname: string,
    children: ReactNode
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ href, size, children, pathname, ...props }, ref) {
    return <NextLink ref={ref} href={href} {...props} className={linkVariants({ size, active: pathname === href ? 'active' : 'inactive' })}>{ children }</NextLink>
})

export default Link