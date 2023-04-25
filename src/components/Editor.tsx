import { type Editor as EditorType, EditorContent, useEditor } from '@tiptap/react'
import React, { type KeyboardEvent, type ClipboardEvent, useState } from 'react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react'
import FloatingMenuExt from '@tiptap/extension-floating-menu'
import BubbleMenuExt from '@tiptap/extension-bubble-menu'
import PlaceholderExt from '@tiptap/extension-placeholder'
import BlockQuoteExt from  '@tiptap/extension-blockquote'
import BulletListExt from  '@tiptap/extension-bullet-list'
import CodeBlockExt from  '@tiptap/extension-code-block'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import ListItem from '@tiptap/extension-list-item'
import Paragraph from '@tiptap/extension-paragraph'
import HardBreakExt from '@tiptap/extension-hard-break'
import HeadingExt from '@tiptap/extension-heading'
import HorizontalRuleExt from '@tiptap/extension-horizontal-rule'
import OrderedListExt from '@tiptap/extension-ordered-list'
import BoldExt from '@tiptap/extension-bold'
import ImageExt from '@tiptap/extension-image'
import TaskListExt from '@tiptap/extension-task-list'
import TaskListItemExt from '@tiptap/extension-task-item'
import YouTubeExt from '@tiptap/extension-youtube'
import * as Tooltip from '@radix-ui/react-tooltip'
import * as Dialog from '@radix-ui/react-dialog'
import { paragraphVariants } from '@/ui/Paragraph'
import Input from '@/ui/Input'
import { isValidUrl } from '@/utils/isValidUrl'

const floatingMenuItems = [
    { icon: 'image', click: (editor: EditorType, openImageDialog?: (() => void) | undefined) => {
        openImageDialog ? openImageDialog() : null
    }, tooltip: 'Image' },
    { icon: 'code', click: (editor: EditorType) => {}, tooltip: 'Code' },
    { icon: 'data_object', click: (editor: EditorType) => {}, tooltip: 'Code block' },
    { icon: 'segment', click: (editor: EditorType) => {}, tooltip: 'Segment' },
    { icon: 'horizontal_rule', click: (editor: EditorType) => {}, tooltip: 'Horizontal rule' },
    { icon: 'smart_display', click: (editor: EditorType, openVideoPicker?: (() => void) | undefined) => {
        openVideoPicker ? openVideoPicker() : null
    }, tooltip: 'YouTube video' },
]

const bubbleMenuItems = [
    { icon: 'format_h1', click: (editor: EditorType) => editor.chain().toggleHeading({ level: 2 }).run(), tooltip: 'Large heading' },
    { icon: 'format_h2', click: (editor: EditorType) => editor.chain().toggleHeading({ level: 3 }).run(), tooltip: 'Small heading' },
    { icon: 'format_bold', click: (editor: EditorType) => editor.chain().toggleBold().run(), tooltip: 'Bold' },
    { icon: 'format_quote', click: (editor: EditorType) => editor.chain().toggleBlockquote().run(), tooltip: 'Blockquote' },
    { icon: 'format_list_bulleted', click: (editor: EditorType) => editor.chain().toggleBulletList().run(), tooltip: 'Bullet list' },
    { icon: 'format_list_numbered', click: (editor: EditorType) => editor.chain().toggleOrderedList().run(), tooltip: 'Ordered list' },
    { icon: 'checklist', click: (editor: EditorType) => editor.chain().toggleTaskList().run(), tooltip: 'Task list' },
]

const Editor = () => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogTab, setDialogTab] = useState(0)

    const openImageDialog = () => {
        setDialogTab(0)
        setDialogOpen(true)
    }

    const openVideoPicker = () => {
        setDialogTab(1)
        setDialogOpen(true)
    }

    const editor = useEditor({
        extensions: [
            Document,
            Text,
            ListItem,
            Paragraph,
            FloatingMenuExt,
            BubbleMenuExt,
            PlaceholderExt.configure({
                placeholder: 'Write your post...',
            }),
            BlockQuoteExt,
            BulletListExt,
            CodeBlockExt,
            HardBreakExt,
            HeadingExt.configure({
                levels: [2, 3]
            }),
            HorizontalRuleExt,
            ImageExt.configure({
                inline: true
            }),
            BoldExt,
            OrderedListExt,
            TaskListExt.configure({
                HTMLAttributes: {
                    class: 'taskList'
                }
            }),
            TaskListItemExt.configure({
                HTMLAttributes: {
                    class: 'taskItem'
                }
            }),
            YouTubeExt.configure({
                modestBranding: true
            })
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'prose focus:outline-none max-w-[1000px] w-full cursor-text'
            }
        }
    })

    const selectMethod = (item: string): (() => void) | undefined => {
        switch (item) {
            case 'Image':
                return openImageDialog
            case 'YouTube video':
                return openVideoPicker
            default:
                return undefined
        }
    }

    // const handleDragOver = (e: DragEvent<HTMLButtonElement>) => {
    //     e.preventDefault()
    //     e.stopPropagation()
    //     e.dataTransfer.dropEffect = 'copy'
    // }

    // const handleDrop = (e: DragEvent<HTMLButtonElement>) => {
    //     e.preventDefault()
    //     e.stopPropagation()
    //     onDrop(e.dataTransfer.files[0])
    // }

    // const onDrop = (file: File) => {
    //     if(!allowedImageTypes.includes(file.type)) {
    //         console.log('type not allowed');
    //         return;
    //     }
    //     editor?.chain().focus().setImage({ src: file.name }).run()
    //     setDialogOpen(false)
    // }

    const handleImageInputChange = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter' && e.currentTarget.value.trim().length > 0 && isValidUrl(e.currentTarget.value.trim())) {
            editor?.chain().focus().setImage({ src: e.currentTarget.value.trim() }).run()
            setDialogOpen(false)
        }
    }

    const handleVideoInputChange = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter' && e.currentTarget.value.trim().length > 0 && isValidUrl(e.currentTarget.value.trim())) {
            editor?.chain().focus().setYoutubeVideo({ src: e.currentTarget.value.trim() }).run()
            setDialogOpen(false)
        }
    }
    
    return <>
        { editor && <>
            <Dialog.Root open={dialogOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className='backdrop-blur fixed inset-0 z-[1010] grid place-content-center' />
                    <Dialog.Content className='fixed top-1/2 left-1/2 max-h-[85vh] w-full max-w-[450px] -translate-x-1/2 -translate-y-1/2 z-[1011] rounded-lg bg-slate-50 border border-slate-200 p-6'>
                        { dialogTab === 0 && <>
                            <Dialog.Title className='font-semibold text-xl'>
                                Pick an image
                            </Dialog.Title>
                            <Dialog.Description className={paragraphVariants({ type: 'tertiary', className: 'mb-6 max-w-xs' })}>
                                Enter URL and press Enter
                            </Dialog.Description>
                            <Dialog.Close onClick={() => setDialogOpen(false)} className='absolute top-6 right-6 p-2 rounded-lg hover:bg-black/10 h-10 w-10 text-slate-500 transition-colors'>
                                <span className='material-symbols-outlined'>close</span>
                            </Dialog.Close>
                            {/* <button onDragOver={handleDragOver} onDrop={handleDrop} className='w-full h-52 bg-neutral-500/10 flex items-center justify-center rounded-lg'>
                                <span className='material-symbols-outlined scale-[2] text-slate-500 mr-6'>image</span>
                                <p className='text-sm max-w-[200px] font-semibold text-slate-500 text-left'>Click to open file picker or drag and drop your image</p>
                            </button> */}
                            <Input placeholder='Paste URL here' type='outline' className='w-full' onKeyDown={handleImageInputChange} />
                        </> }
                        { dialogTab === 1 && <>
                            <Dialog.Title className='font-semibold text-xl'>
                                Embed YouTube video
                            </Dialog.Title>
                            <Dialog.Description className={paragraphVariants({ type: 'tertiary', className: 'mb-6 max-w-xs' })}>
                                Enter YouTube video URL and press enter
                            </Dialog.Description>
                            <Dialog.Close onClick={() => setDialogOpen(false)} className='absolute top-6 right-6 p-2 rounded-lg hover:bg-black/10 h-10 w-10 text-slate-500 transition-colors'>
                                <span className='material-symbols-outlined'>close</span>
                            </Dialog.Close>
                            <Input placeholder='Paste URL here' type='outline' className='w-full' onKeyDown={handleVideoInputChange} />
                        </> }
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
            <FloatingMenu editor={editor} className='px-2 rounded-lg bg-white/20 border backdrop-blur-sm border-slate-200 flex items-center gap-2'>
                { floatingMenuItems.map(item => <Tooltip.Root key={item.icon}>
                        <Tooltip.Trigger key={item.icon} onClick={() => item.click(editor, selectMethod(item.tooltip))} className='p-1 hover:bg-black/10 rounded-md h-8 my-2 group transition-colors'>
                            <span className='material-symbols-outlined opacity-50 group-hover:opacity-70 transition-opacity'>{ item.icon }</span>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                            <Tooltip.Content className='z-[1001] px-2 py-1.5 text-xs font-semibold text-slate-800 rounded-lg border border-slate-200 bg-white backdrop-blur-sm -translate-y-2.5'>
                                { item.tooltip }
                            </Tooltip.Content>
                        </Tooltip.Portal>
                    </Tooltip.Root>) }
            </FloatingMenu>
            <BubbleMenu editor={editor} className='px-2 rounded-lg bg-white/20 border backdrop-blur-sm border-slate-200 flex items-center gap-2'>
                { bubbleMenuItems.map(item => <Tooltip.Root key={item.icon}>
                        <Tooltip.Trigger key={item.icon} onClick={() => item.click(editor)} className='p-1 hover:bg-black/10 rounded-md h-8 my-2 group transition-colors'>
                            <span className='material-symbols-outlined opacity-50 group-hover:opacity-70 transition-opacity'>{ item.icon }</span>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                            <Tooltip.Content className='z-[1001] px-2 py-1.5 text-xs font-semibold text-slate-800 rounded-lg border border-slate-200 bg-white backdrop-blur-sm -translate-y-2.5'>
                                { item.tooltip }
                            </Tooltip.Content>
                        </Tooltip.Portal>
                    </Tooltip.Root>) }
            </BubbleMenu>
        </> }
        <EditorContent editor={editor} className='w-full' />
    </>
}

export default Editor