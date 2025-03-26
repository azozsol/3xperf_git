import React, { useState } from 'react'
import submissonIcon from '@/public/submission-3.svg'
import profileIcon from '@/public/profile-13.svg'
import emailIcon from '@/public/email-107.svg'
import phoneIcon from '@/public/phone-70.svg'
import penIcon from '@/public/pen-37.svg'
import infoIcon from '@/public/info-61.svg'
import buildings from '@/public/footerImage.svg'
import Image from 'next/image'

function contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    // Validation checks
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required'
    }

    // Update error state
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted successfully:', formData)
      try {
        const response = await fetch('/api/contact/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

        const result = await response.json()
        console.log('API response:', result)

        if (response.ok) {
          console.log('Email sent successfully!')
        } else {
          console.error('Error sending email from contact')
        }
      } catch (error) {
        console.error('Error submitting form:', error)
      }
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    // setFormData((prev) => ({
    //   ...prev,
    //   [id]: value,
    // }))
    setFormData({ ...formData, [id]: value })
    if (value.trim() !== '') {
      setErrors({ ...errors, [id]: '' })
    }
  }
  return (
    <div>
      <div className="mt-10 flex flex-col items-center justify-between gap-6 md:flex-row md:gap-12">
        <div className="block text-center md:hidden md:text-left">
          <p className="text-3xl font-bold text-zinc-800 md:text-4xl dark:text-zinc-400">
            Book a free converation with us
          </p>
        </div>

        {/* Form Section */}
        <div className="relative z-10 w-full px-4 md:w-[60%]">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-between gap-4 py-3 md:flex-row">
              {/* Name Input */}
              <div className="relative w-full">
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="peer text-md block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className="absolute top-3 -z-10 flex origin-[0] -translate-y-6 scale-75 transform items-center gap-2 text-xl text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 dark:text-gray-400"
                >
                  <Image
                    src={profileIcon}
                    alt="profileIcon"
                    width={20}
                    height={20}
                    className="invert"
                  />
                  Name
                </label>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email Input */}
              <div className="relative w-full">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="peer text-md block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute top-3 -z-10 flex origin-[0] -translate-y-6 scale-75 transform items-center gap-2 text-xl text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 dark:text-gray-400"
                >
                  <Image
                    src={emailIcon}
                    alt="emailIcon"
                    width={20}
                    height={20}
                    className="opacity-25 dark:invert"
                  />
                  Email Address
                </label>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Phone & Subject */}
            <div className="flex flex-col items-center justify-between gap-4 py-3 md:flex-row">
              <div className="relative w-full">
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="peer text-md block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                />
                <label
                  htmlFor="phone"
                  className="absolute top-3 -z-10 flex origin-[0] -translate-y-6 scale-75 transform items-center gap-2 text-xl text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 dark:text-gray-400"
                >
                  <Image
                    src={phoneIcon}
                    alt="phoneIcon"
                    width={20}
                    height={20}
                    className="opacity-25 dark:invert"
                  />
                  Phone
                </label>
                {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
              </div>

              <div className="relative w-full">
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="peer text-md block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                />
                <label
                  htmlFor="subject"
                  className="absolute top-3 -z-10 flex origin-[0] -translate-y-6 scale-75 transform items-center gap-2 text-xl text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 dark:text-gray-400"
                >
                  <Image
                    src={infoIcon}
                    alt="infoIcon"
                    width={20}
                    height={20}
                    className="opacity-25 dark:invert"
                  />
                  Subject
                </label>
              </div>
            </div>

            {/* Message Input */}
            <div className="relative mt-2 mb-2 py-3">
              <input
                type="text"
                id="message"
                value={formData.message}
                onChange={handleChange}
                className="peer text-md block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
              />
              <label
                htmlFor="message"
                className="absolute top-3 z-10 flex origin-[0] -translate-y-6 scale-75 transform items-center gap-2 text-xl text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 dark:text-gray-400"
              >
                <Image
                  src={penIcon}
                  alt="penIcon"
                  width={20}
                  height={20}
                  className="opacity-50 dark:invert"
                />
                How can we help you?
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full cursor-pointer rounded-3xl bg-blue-900 px-6 py-3 font-bold text-white transition-colors duration-200 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none md:w-auto"
            >
              <div className="flex items-center justify-center gap-2">
                <Image
                  src={submissonIcon}
                  alt="submissionIcon" // Fixed typo in alt text
                  width={20}
                  height={20}
                  className="invert"
                />
                <p>Get in touch</p>
              </div>
            </button>

            {/* Checkbox */}
            <div className="mt-2 text-sm text-gray-500">
              <input id="c1" type="checkbox" className="align-middle" />
              <label htmlFor="c1" className="ml-2">
                I agree that my data is{' '}
                <span className="underline">collected</span>.
              </label>
            </div>
          </form>
        </div>

        {/* Right Side Text */}
        <div className="hidden text-center md:block md:text-left">
          <p className="text-3xl font-bold text-zinc-800 md:text-4xl dark:text-zinc-400">
            Book a free
          </p>
          <p className="text-3xl font-bold text-zinc-800 md:text-4xl dark:text-zinc-400">
            conversation
          </p>
          <p className="text-3xl font-bold text-zinc-800 md:text-4xl dark:text-zinc-400">
            with us!
          </p>
        </div>
      </div>

      <Image
        src={buildings}
        alt="building"
        className="mt-[-100px] md:mt-[-150px] dark:invert"
      />
    </div>
  )
}

export default contact

{
  /* <form
          // action="/thank-you"
          onSubmit={handleSubmit}
          className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
        >
          <div className="relative mb-4">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-zinc-600 dark:text-zinc-400"
            >
              Your name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              aria-describedby="helper-text-explanation"
              className="focus:border-googleBl dark:focus:border-googleBl-100 w-full flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:ring-4 focus:ring-teal-500/10 focus:outline-none sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:ring-teal-400/10"
              placeholder="your name"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-zinc-600 dark:text-zinc-400"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              aria-describedby="helper-text-explanation"
              className="focus:border-googleBl dark:focus:border-googleBl-100 w-full flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:ring-4 focus:ring-teal-500/10 focus:outline-none sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:ring-teal-400/10"
              placeholder="name@flowbite.com"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-zinc-600 dark:text-zinc-400"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="focus:border-googleBl dark:focus:border-googleBl-100 block w-full flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:ring-4 focus:ring-teal-500/10 focus:outline-none sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:ring-teal-400/10"
              placeholder="Leave a comment..."
            ></textarea>
          </div>

          <button type="submit" className="flex-none">
            Button
          </button>
        </form> */
}
