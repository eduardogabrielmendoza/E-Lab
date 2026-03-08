'use client'

import { SlideUp, StaggerContainer, StaggerItem } from '@/components/animations'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function HowItWorks({ data }: { data: any }) {
  const howItWorks = data

  return (
    <section className="py-20 sm:py-28 bg-brand-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SlideUp className="text-center mb-14 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {howItWorks.title}
          </h2>
        </SlideUp>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6"
          staggerDelay={0.12}
        >
          {howItWorks.steps.map((step: any, index: number) => (
            <StaggerItem key={step.number}>
              <div className="relative text-center sm:text-left">
                {/* Number */}
                <div className="text-6xl sm:text-7xl font-black text-brand-700/50 leading-none mb-4">
                  {step.number}
                </div>

                {/* Connector line (desktop) */}
                {index < howItWorks.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-brand-700 -translate-x-1/2" />
                )}

                <h3 className="text-base font-bold text-white tracking-wide mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-brand-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
