import React from 'react'

export default function divider({ text }: { text: string }) {
  return (
    <div>
      <h3 className="flex w-full items-center">
        <span className="h-1 flex-grow rounded bg-white"></span>
       <p className='px-2 md:text-3xl text-2xl font-bold'>
        {text}
       </p>
        <span className="h-1 flex-grow rounded bg-white"></span>
      </h3>
    </div>
  )
}
