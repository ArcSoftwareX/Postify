import { SignIn as ClerkSignIn } from '@clerk/nextjs'
import Link from 'next/link'

const SignIn = () => {
  return (
    <div className='flex items-center justify-center h-screen w-screen'>
        <div className='relative'>
            <ClerkSignIn />
            <p className='absolute text-sm font-medium pl-8 -mt-8 z-20'>No account? <Link href='/auth/sign-up' className='text-blue-500 hover:underline'>Sign up</Link></p>
        </div>
    </div>
  )
}

export default SignIn