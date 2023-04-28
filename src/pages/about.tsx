import AboutTab from "@/components/AboutTab"
import Logo from "@/components/Logo"
import Button, { buttonVariants } from "@/components/ui/Button"
import Icon from "@/components/ui/Icon"
import { TabData } from "@/types"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { Fragment, useState } from "react"

const tabs: TabData[] = [
    { imageUrl: '/static/abstract_1.jpg', title: 'Want to learn more about Postify?', desc: 'Postify is a posts web app that lets you create and share posts with your friends and followers using a modern text editor and AI-powered tools.', buttons: [{ text: 'Get started', clickAction: 'next' }] },
    { imageUrl: '/static/abstract_2.jpg', title: 'Fast, reliable platform', desc: 'Postify is fast and reliable. You can create and edit your posts anytime, anywhere, and on any device.', buttons: [{ icon: 'arrow_back', clickAction: 'back' }, { icon: 'arrow_forward', clickAction: 'next' }] },
    { imageUrl: '/static/abstract_3.jpg', title: 'Innovations', desc: 'Postify is smart and innovative. You can use AI to save time and improve your posts quality.', buttons: [{ icon: 'arrow_back', clickAction: 'back' }, { icon: 'arrow_forward', clickAction: 'next' }] },
    { imageUrl: '/static/abstract_4.jpg', title: 'Security', desc: 'Postify is free and secure. You can use Postify without paying anything or worrying about your privacy.', buttons: [{ icon: 'arrow_back', clickAction: 'back' }, { icon: 'arrow_forward', clickAction: 'next' }] },
    { imageUrl: '/static/abstract_5.jpg', title: "That's all about Postify!", desc: 'Feel free to expore and create.', buttons: [{ icon: 'arrow_back', clickAction: 'back' }, { icon: 'feed', clickAction: 'finish' }] }
]

const GetStarted = () => {
    const [currentTab, setCurrentTab] = useState(0)
    const router = useRouter()

    const nextTabHandler = () => {
        setCurrentTab(currentTab + 1)
    }

    const prevTabHandler = () => {
        setCurrentTab(currentTab - 1)
    }

    const viewPosts = () => {
        router.push('/posts')
    }

  return (
    <div className='h-screen w-screen px-4 py-20 flex flex-col items-center justify-center'>
        <Head>
            <title>Postify - Get started</title>
        </Head>
        <span className="absolute top-20 ris">
            <Logo />
        </span>
        { tabs.map((tab, i) => <AboutTab prevTab={prevTabHandler} nextTab={nextTabHandler} finish={viewPosts} tab={tab} key={i} current={currentTab} thisTab={i} />) }
    </div>
  )
}

export default GetStarted