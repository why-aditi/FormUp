"use client"

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

export default function VisitBtn({shareUrl}:{shareUrl: string}) {
    const [mounted, setMounted] = useState(false)
    useEffect(()=>{
        setMounted(true)
    },[])
    if(!mounted) return null
    const shareLink = `${window.location.origin}/submit/${shareUrl}`
    console.log(shareLink)
  return (
    <Button 
        className='w-[200px]'
        onClick={() =>{
            window.open(shareLink)
        }}
    >
        Visit    
    </Button>
  )
}
