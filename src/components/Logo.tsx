import Image from "next/image"
import Link from "next/link"

const Logo = ({ noText }: { noText?: boolean }) => {
  return (
    <Link href='/' className='flex items-center'>
        <Image src='/postify_logo.png' alt='Logo' width={40} height={40} className="mr-2.5" priority/>
        { !noText ? <h1 className='font-semibold text-lg'>Postify</h1> : null }
    </Link>
  )
}

export default Logo