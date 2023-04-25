import { SignUp as ClerkSignUp } from '@clerk/nextjs'
import Link from 'next/link'

const SignUp = () => {
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
        <div className='relative'>
            <ClerkSignUp />
            <p className='absolute text-sm font-medium pl-8 -mt-8 z-20'>Have an account? <Link href='/auth/sign-in' className='text-blue-500 hover:underline'>Sign in</Link></p>
        </div>
    </div>
  )
}

export default SignUp