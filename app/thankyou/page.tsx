'use client'

// pages/thank-you.js
import { motion } from 'motion/react'
import buildings from '@/public/footerImage.svg'
import Image from 'next/image'

export default function ThankYouPage() {
  const VARIANTS_CONTAINER = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const VARIANTS_SECTION = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  }

  const TRANSITION_SECTION = {
    duration: 0.3,
  }
  return (
    <div>
      <motion.main
        className="space-y-6"
        variants={VARIANTS_CONTAINER}
        initial="hidden"
        animate="visible"
      >
        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
          className="pb-8"
        >
          <h1 className="text-2xl font-bold">Thank You!</h1>
          <p className='mb-30'>
            Your message has been sent successfully. We'll get back to you soon.
          </p>
        </motion.section>
      </motion.main>
      <Image
        src={buildings}
        alt="building"
        className="mt-[-100px] md:mt-[-150px] dark:invert"
      />
    </div>
  )
}
