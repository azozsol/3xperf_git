'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import logo from '@/public/logo.svg'
import arrow from '@/public/arrow.png'
import Image from 'next/image'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import whatsappIcon from '@/public/images/whatsapp.svg'
import { useEffect, useState } from 'react'

export function Header() {
  const [whatsAppMessage, setWhatsAppMessage] = useState('')

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const utm_source = urlParams.get('utm_source') || 'unknown'
    const utm_medium = urlParams.get('utm_medium') || 'unknown'
    const utm_campaign = urlParams.get('utm_campaign') || 'unknown'

    const message = `utm_source=${utm_source}&utm_medium=${utm_medium}&utm_campaign=${utm_campaign}`
    const encodedMessage = encodeURIComponent(message)

    setWhatsAppMessage(encodedMessage)
  }, [])

  const handleClick = () => {
    const whatsappUrl = `https://wa.me/971585837372?text=${whatsAppMessage}`
    window.open(whatsappUrl, '_blank')
  }
  return (
    <header className="mb-8 flex items-center justify-between">
      {/* <div>
        <Link href="/" className="font-medium text-black dark:text-white">
          Julien Nim
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          Design Engineer
        </TextEffect>
      </div> */}
      {/* Logo on the left */}
      <Link href="/" passHref>
        <div>
          <Image
            src={logo}
            alt="Logo"
            width={90}
            height={90}
            className="dark:invert"
          />
        </div>
      </Link>
      {/* Button on the right */}
      <div>
        <button
          onClick={handleClick}
          className="group w-full rounded-3xl border-2 border-zinc-900 bg-white px-4 py-2 transition hover:bg-green-600 hover:text-white dark:text-black dark:hover:bg-green-600"
        >
          <div className="flex items-center justify-between gap-1">
            <Image
              src={whatsappIcon}
              alt="Logo"
              width={30}
              height={30}
              className="transition group-hover:brightness-0 group-hover:invert"
            />
            <p className="transition group-hover:text-white">WhatsApp agent</p>
          </div>
        </button>
      </div>
    </header>
  )
}
