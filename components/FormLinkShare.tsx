"use client"

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { toast } from './hooks/use-toast'
import { ImShare } from 'react-icons/im'

export default function FormLinkShare({shareUrl}:{shareUrl: string}) {
    const [mounted, setMounted] = useState(false)
    useEffect(()=>{
        setMounted(true)
    },[])
    if(!mounted) return null
    const shareLink = `${window.location.origin}/submit/${shareUrl}`
  return (
    <div className="flex flex-grow gap-4 items-center">
        <Input value={shareLink} readOnly/>
        <Button className='max-w-[250px]'
            onClick={() => {
                navigator.clipboard.writeText(shareLink)
                toast({
                    title: "Copied",
                    description: "Link copied to clipboard"
                })
            }}
        >
            <ImShare className='mr-2 h-4 w-4'/>
            Share Link
        </Button>
    </div>
  )
}
