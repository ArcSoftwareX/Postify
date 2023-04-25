import React, { useEffect } from 'react'
import Image from 'next/image'
import { Bookmark, ChevronDown, User as UserIcon } from 'lucide-react'
import { UserResource } from '@clerk/types'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { SignOutButton } from '@clerk/nextjs'
import Link from 'next/link'

const AccountButton = ({ user }: { user: UserResource }) => {
  return (
    <Link href='/account' className='flex items-center group'>
        <div className='rounded-xl group-hover:rounded-lg transition-all duration-300 overflow-hidden h-9 w-9 mr-2.5'>
            <Image src={user?.profileImageUrl} alt='Profile pic' height={36} width={36}/>
        </div>
        <div>
            <div className='font-semibold text-left text-sm text-slate-500 group-hover:text-slate-800 transition-colors'>{ user.firstName } { user.lastName }</div>
            <p className='text-slate-400 group-hover:text-slate-500 text-xs transition-colors'>{ user.emailAddresses[0].toString() }</p>
        </div>
    </Link>
  )
}

export default AccountButton