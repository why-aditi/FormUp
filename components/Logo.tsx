import Link from 'next/link'
import React from 'react'

export default function Logo() {
  return (
    <Link href={'/'} className='font-bold text-4xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer'>
      FormUp
    </Link>
  )
}
