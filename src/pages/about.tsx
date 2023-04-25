import Logo from "@/components/Logo"
import Button, { buttonVariants } from "@/components/ui/Button"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { Fragment, useState } from "react"

const tabs: { imageUrl: string, title: string, desc: string, button: { text: string, icon?: string } | { icon: string } }[] = [
    { imageUrl: '/static/abstract_1.jpg', title: 'Want to learn more about Postify?', desc: 'Postify is a posts web app that lets you create and share posts with your friends and followers using a modern text editor and AI-powered tools.', button: { text: 'Get started', icon: 'play_arrow' } },
    { imageUrl: '/static/abstract_2.jpg', title: 'Fast, reliable platform', desc: 'Postify is fast and reliable. You can create and edit your posts anytime, anywhere, and on any device.', button: { icon: 'arrow_forward' } },
    { imageUrl: '/static/abstract_3.jpg', title: 'Innovations', desc: 'Postify is smart and innovative. You can use AI to save time and improve your posts quality.', button: { icon: 'arrow_forward' } },
    { imageUrl: '/static/abstract_4.jpg', title: 'Security', desc: 'Postify is free and secure. You can use Postify without paying anything or worrying about your privacy.', button: { icon: 'arrow_forward' } },
    { imageUrl: '/static/abstract_5.jpg', title: "That's all about Postify!", desc: 'Feel free to expore and create.', button: { icon: 'arrow_forward' } }
]

const GetStarted = () => {
    const [tabData, setTabData] = useState(0)
    const buttonActive = tabData !== tabs.length - 1

    const nextTabHandler = () => {
        setTabData(tabData + 1)
    }

    const prevTabHandler = () => {
        setTabData(tabData - 1)
    }

  return (
    <div className='h-screen w-screen px-4 py-20 flex flex-col items-center justify-center'>
        <Head>
            <title>Postify - Get started</title>
        </Head>
        <span className="absolute top-20">
            <Logo />
        </span>
        
        { tabs.map((t, i) => { return tabData === i ? <Fragment key={t.title}>
            <Image src={ t.imageUrl } alt="An abstract image" height={200} width={200} className="rounded-2xl" priority />
            <h2 className="mt-16 text-2xl font-semibold text-slate-800 mb-5">{ t.title }</h2>
            <p className="text-sm font-semibold text-slate-500 mb-20">{ t.desc }</p>
            { buttonActive && (t.button.text ? <Button onClick={nextTabHandler} width='wide' className="group relative">
                { t.button.text }
                <span className="material-icons absolute right-2 opacity-0 group-hover:opacity-30 -translate-x-1 group-hover:translate-x-0 text-black pointer-events-none transition">
                    { t.button.icon }
                </span>
            </Button> : <div className="flex items-center gap-2">
                <Button onClick={prevTabHandler} className="group">
                    <span className="material-icons opacity-30 group-hover:opacity-40 w-6 pointer-events-none">
                        arrow_backward
                    </span>
                </Button>
                <Button onClick={nextTabHandler} className="group">
                    <span className="material-icons opacity-30 group-hover:opacity-40 w-6 pointer-events-none">
                        arrow_forward
                    </span>
                </Button>
            </div>) }
        </Fragment> : null }) }

            { !buttonActive && <div className="flex items-center gap-2">
                <Button onClick={prevTabHandler} className="group">
                    <span className="material-icons opacity-30 group-hover:opacity-40 w-6 pointer-events-none">
                        arrow_backward
                    </span>
                </Button>
                <Link href='/posts' className={buttonVariants({ size: 'sm', type: 'accent' })}>View posts</Link>
            </div> }
    </div>
  )
}

export default GetStarted