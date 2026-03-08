'use client'

import { useState } from 'react'
import homeData from '@/content/home.json'
import { SlideUp, FadeIn } from '@/components/animations'

export default function DemoForm() {
  const { demoForm } = homeData
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="py-20 sm:py-28 bg-brand-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SlideUp className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {demoForm.title}
          </h2>
          <p className="mt-4 text-base text-brand-400">{demoForm.subtitle}</p>
        </SlideUp>

        <FadeIn>
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {demoForm.tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 text-xs font-bold tracking-wider transition-all border ${
                  activeTab === i
                    ? 'bg-white text-brand-black border-white'
                    : 'text-brand-400 border-brand-600 hover:border-brand-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4 max-w-md mx-auto"
          >
            <input
              type="text"
              placeholder={demoForm.fields.name}
              className="w-full bg-brand-800 border border-brand-700 text-white px-4 py-3 text-sm placeholder:text-brand-500 focus:outline-none focus:border-brand-400 transition-colors"
            />
            <input
              type="email"
              placeholder={demoForm.fields.email}
              className="w-full bg-brand-800 border border-brand-700 text-white px-4 py-3 text-sm placeholder:text-brand-500 focus:outline-none focus:border-brand-400 transition-colors"
            />
            <button
              type="submit"
              className="w-full bg-white text-brand-black py-3.5 text-sm font-bold tracking-wider hover:bg-brand-100 transition-colors"
            >
              {demoForm.submitLabel}
            </button>
          </form>
        </FadeIn>
      </div>
    </section>
  )
}
