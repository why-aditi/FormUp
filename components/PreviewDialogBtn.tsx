import React from 'react'
import { Button } from './ui/button'
import {MdPreview} from 'react-icons/md'

export default function PreviewDialogBtn() {
  return (
    <Button variant={'outline'} className='gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400'>
        <MdPreview className='h-4 w-4'/>
        Publish
    </Button>
  )
}
