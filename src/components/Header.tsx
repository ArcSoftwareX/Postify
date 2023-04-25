import React from 'react'
import Logo from './Logo'
import NavLink from '@/ui/NavLink'
import { ClerkLoading, SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import { buttonVariants } from './ui/Button'
import ActivityIndicator from './ActivityIndicator'
import AccountButton from './AccountButton'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Header = () => {
    const user = useUser()
    const { pathname } = useRouter()
  return (
    <header className='flex items-center justify-center px-10 h-20 py-5 fixed top-0 inset-x-0 backdrop-blur'>
        <span className='absolute left-10'>
            <Logo />
        </span>
        <nav className='md:flex hidden items-center gap-10'>
            <NavLink href='/posts' pathname={pathname}>
                Posts
            </NavLink>
            <SignedIn>
            <NavLink href='/posts/write' pathname={pathname}>
                 Write
            </NavLink>
            </SignedIn>
            <NavLink href='/about' pathname={pathname}>
                About
            </NavLink>
        </nav>
        <div className='absolute right-10 hidden md:block'>
            <SignedOut>
                <span className='flex gap-2 items-center'>
                    <Link href='/auth/sign-in' className={buttonVariants({ variant: 'outlined' })}>Sign in</Link>
                    <Link href='/auth/sign-up' className={buttonVariants({ type: 'accent' })}>Sign up</Link>
                </span>
            </SignedOut>
            <SignedIn>
                <AccountButton user={user.user!}/>
            </SignedIn>
            <ClerkLoading>
                <ActivityIndicator size={24}/>
            </ClerkLoading>
        </div>
        <button className='visible md:hidden'></button>
    </header>
  )
}

export default Header