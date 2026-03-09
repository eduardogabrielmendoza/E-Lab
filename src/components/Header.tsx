'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Header({ data }: { data: any }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { announcement, nav } = data

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  return (
    <>
      {/* Announcement Bar */}
      {announcement.visible && (
        <div className="bg-white text-brand-black text-center py-2 px-4 text-xs sm:text-sm font-semibold tracking-wider">
          <Link href={announcement.link} className="hover:underline">
            {announcement.text}
          </Link>
        </div>
      )}

      {/* Main Header */}
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-brand-black/90 backdrop-blur-md border-b border-brand-700'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              {nav.logo.image ? (
                <img
                  src={nav.logo.image}
                  alt={nav.logo.text || 'Logo'}
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              ) : (
                <span className="text-2xl sm:text-3xl font-black tracking-tighter text-white">
                  {nav.logo.text}
                </span>
              )}
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {nav.links.map((link: any) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-brand-300 hover:text-white transition-colors tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={nav.cta.href}
                className="bg-white text-brand-black px-6 py-2.5 text-sm font-bold tracking-wide hover:bg-brand-100 transition-colors"
              >
                {nav.cta.label}
              </Link>
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isMobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-white"
              />
              <motion.span
                animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-0.5 bg-white"
              />
              <motion.span
                animate={isMobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-white"
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              className="lg:hidden bg-brand-black border-t border-brand-700 overflow-hidden"
            >
              <nav className="flex flex-col px-6 py-6 gap-4">
                {nav.links.map((link: any, i: number) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="text-lg font-medium text-brand-300 hover:text-white transition-colors tracking-wide"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <Link
                  href={nav.cta.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="bg-white text-brand-black px-6 py-3 text-sm font-bold tracking-wide text-center hover:bg-brand-100 transition-colors mt-2"
                >
                  {nav.cta.label}
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
