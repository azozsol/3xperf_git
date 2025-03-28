import React from 'react'
import { X } from 'lucide-react'
import { useState, useEffect } from 'react'
import avatarIcon from '@/public/avatar.png' // Replace with your actual avatar path
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'
import { motion } from 'motion/react'

function chatHeadline() {
  const [chatStarted, setChatStarted] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<
    { text: string; sender: 'user' | 'ai' }[]
  >([])
  const [sessionId, setSessionId] = useState('')
  useEffect(() => {
    // Generate a session ID only once per session
    let storedSessionId = localStorage.getItem('sessionId')
    if (!storedSessionId) {
      storedSessionId = uuidv4()
      localStorage.setItem('sessionId', storedSessionId)
    }
    setSessionId(storedSessionId)
  }, [])

  const sendMessage = async () => {
    if (!message.trim()) return

    // Add user's message to chat
    setMessages([...messages, { text: message, sender: 'user' }])
    setMessage('')

    if (!chatStarted) {
      setChatStarted(true) // Now it hides only AFTER submitting
    }

    const res = await fetch('/api/ai/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: message, sessionId }),
    })

    const data = await res.json()
    console.log('data: ', data.output)
    const aiResponse = data?.output || 'No response'
    setMessages((prev) => [...prev, { text: aiResponse, sender: 'ai' }])
  }
  if (!isOpen) return null

  return (
    <>
      <div className="relative h-80 w-[80%] rounded-3xl border-2 border-black dark:border-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-black dark:border-white px-4 py-3">
          <h2 className="text-xl font-bold text-blue-600">Chat with 3xperf</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer text-black transition-transform duration-200 hover:scale-125"
          >
            <X size={20} className='dark:text-white' />
          </button>
        </div>

        {/* Content */}

        {/* {!chatStarted && (
          
        
        )} */}
        <div>
          <motion.div
            className="p-1 absolute"
            initial={{ opacity: 1, y: 0 }}
            animate={
              chatStarted ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }
            }
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            onAnimationComplete={() => {
              if (chatStarted) {
                // After animation completes, hide the element
                // This prevents layout shift while animation is in progress
                const element = document.getElementById('chatHeadlineText')
                if (element) element.style.display = 'none'
              }
            }}
          >
            <div id="chatHeadlineText">
              <h3 className="text-xl font-extrabold">
                Turn Clicks into Clients with <br /> AI-Powered Lead Filtering
              </h3>
              <p className="mt-2 font-semibold text-gray-600">
                We don’t just generate Real Estate leads, <br />
                we qualify them, engage them, and help you close the deal.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="absolute w-full h-[calc(100%-64px)] overflow-y-auto p-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-1 w-fit max-w-[75%] rounded-lg px-4 py-2 break-words ${
                msg.sender === 'user'
                  ? 'ml-auto bg-blue-300 text-right text-white' // User messages aligned right
                  : 'mr-auto bg-gray-200 text-left text-black' // AI messages aligned left
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        {/* Avatar Image */}
        <Image
          src={avatarIcon}
          alt="Avatar"
          // width={90}
          // height={90}
          className="absolute -right-20 -bottom-1 md:-right-30 md:w-[20%] w-[30%] "
        />
      </div>
      <div className="w-full rounded-lg border bg-white  dark:bg-zinc-600 p-4 shadow-lg">
        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setChatStarted(true)} // Hide text when user starts typing
            className="flex-1 rounded-l-lg border p-2 border-r-0 "
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="rounded-r-lg bg-blue-900 p-2 px-8 hover:bg-blue-600 cursor-pointer text-white"
          >
            Send
          </button>
        </div>
      </div>
    </>
  )
}

export default chatHeadline
