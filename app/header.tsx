'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import logo from '@/public/logo.svg'
import arrow from '@/public/arrow.png'
import Image from 'next/image'
import { ArrowRightIcon } from '@heroicons/react/24/solid'

export function Header() {
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
        <button className="w-full rounded-3xl border-4 border-zinc-900 bg-white px-4 py-2 text-zinc-600 hover:bg-zinc-400 hover:text-white dark:text-zinc-500 dark:hover:bg-zinc-700">
          <div className="flex items-center justify-between gap-1">
            <p>GET STARTED</p>
            <Image
              src={arrow}
              alt="Logo"
              width={100}
              height={100}
              className="w-auto"
            />
          </div>
        </button>
      </div>
    </header>
  )
}
