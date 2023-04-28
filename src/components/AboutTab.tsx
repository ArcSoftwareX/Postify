import { ClickAction, TabData } from '@/types'
import Image from 'next/image'
import React from 'react'
import Icon from './ui/Icon'
import Button from './ui/Button'

const AboutTab = ({ tab, current, thisTab, nextTab, prevTab, finish }: { tab: TabData, current: number, thisTab: number, nextTab: () => void, prevTab: () => void, finish: () => void }) => {

    const processClickAction = (action: ClickAction) => {
        switch (action) {
            case "next":
                nextTab()
                break
            case "back":
                prevTab()
                break
            case "finish":
                finish()
                break
        }
    }

    if (current === thisTab)
  return (
    <div className='px-4 max-w-4xl w-full'>
        <div className='flex items-center mb-6'>
            <Image src={tab.imageUrl} alt='An abstract image' height={70} width={70} className='rounded-full mr-4'/>
            <div>
                <h2 className='font-semibold'>{ tab.title }</h2>
                <p className='text-sm font-semibold text-slate-500'>{ tab.desc }</p>
            </div>
        </div>
        <div className='w-full h-96 rounded-lg bg-slate-200 flex flex-col items-center justify-center gap-6 text-slate-700 mb-6'>
            <Icon className='scale-150 mt-6'>hourglass_top</Icon>
            <p className='font-semibold text-sm text-center'>Postify is still in developement.<br />Preview unavailable</p>
        </div>
        <div className='flex items-center justify-center gap-2'>
            { tab.buttons.map((b, i) => <Button type='accent' onClick={() => processClickAction(b.clickAction)} key={i}>
                { b.icon !== undefined ? <Icon>{ b.icon }</Icon> : b.text ? b.text : '' }
            </Button>) }
        </div>
    </div>
  )

  else return <></>
}

export default AboutTab