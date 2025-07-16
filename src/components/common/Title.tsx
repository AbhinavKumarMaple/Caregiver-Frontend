import React from 'react'

export default function Title({children, func}:{children:React.ReactNode, func?:() => void}) {

  return (
    <div
    onClick={func && func}
    className={`mt-2 w-full text-2xl font-semibold p-1 hidden md:flex items-center gap-2 ${func && "cursor-pointer"}`}>
        {children}
    </div>
  )
}
