import React from 'react'
import { Button } from './ui/button'
import {MdOutlinePublish} from 'react-icons/md'

export default function PublishFormBtn() {
  return (
    <Button variant={'outline'} className='gap-2'>
        <MdOutlinePublish className='h-6 w-6'/>
        Preview
    </Button>
  )
}
