import React from 'react'

export default function MobileHeader({children}:{children:React.ReactNode}) {

  return (
    <div className='flex w-full p-1 text-xl sm:hidden '>
        {children}
    </div>
  )
}
