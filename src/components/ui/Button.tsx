import { cn } from '@/utils/classes'
import { VariantProps, cva } from 'class-variance-authority'
import { HTMLAttributes, forwardRef } from 'react'
import ActivityIndicator from '@/components/ActivityIndicator'
import { Content, Portal, Root, Trigger } from '@radix-ui/react-tooltip'

export const buttonVariants = cva('rounded-lg text-black/70 hover:text-black/90 transition duration-300 font-semibold flex items-center justify-center relative overflow-hidden', {
    variants: {
        variant: {
            outlined: 'border border-neutral-700/10 hover:border-black/10 shadow-transparent shadow-lg hover:shadow-slate-500/10',
            default: 'shadow-transparent shadow-lg'
        },
        type: {
            default: 'bg-transparent',
            accent: 'border-none bg-blue-500 hover:bg-blue-600 text-white hover:text-neutral-50 hover:shadow-blue-500/40',
            loading: 'bg-slate-200 text-transparent hover:text-transparent hover:shadow-none'
        },
        size: {
            default: 'px-3.5 py-2',
            lg: 'px-5 py-3',
            sm: 'text-sm px-3.5 py-2'
        },
        width: {
            default: 'w-fit',
            wide: 'min-w-[220px]'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
        type: 'default'
    }
})

interface ButtonProps extends HTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    isLoading?: boolean,
    loadingTooltip?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ variant, loadingTooltip, isLoading, size, type, width, className, children, ...props }, ref) {
    if(typeof loadingTooltip === 'string' && isLoading)
    return <Root>
        <Trigger ref={ref} className={cn(buttonVariants({ variant, size, width, type: 'loading', className }))} disabled={isLoading} {...props}>
            <span className='absolute inset-0 grid place-content-center text-slate-600'>{ isLoading ? <ActivityIndicator size={23} /> : null }</span>
            { children }
        </Trigger>
        <Portal>
            <Content className='px-2 py-1.5 text-xs font-semibold text-slate-800 rounded-lg border border-slate-200 bg-white z-50 backdrop-blur-sm translate-y-1.5'>
                { loadingTooltip }
            </Content>
        </Portal>
    </Root>
    else if (isLoading)return <button ref={ref} className={cn(buttonVariants({ variant, size, width, type: 'loading', className }))} disabled={isLoading} {...props}>
        <span className='absolute inset-0 grid place-content-center text-slate-600'>{ isLoading ? <ActivityIndicator size={23} /> : null }</span>
        { children }
    </button>

    return <button ref={ref} className={cn(buttonVariants({ variant, size, width, type, className }))} {...props}>
        { children }
    </button>
})

export default Button