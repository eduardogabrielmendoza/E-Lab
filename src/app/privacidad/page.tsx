import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad | E-LAB',
}

export default function PrivacidadPage() {
  return (
    <section className="py-24 sm:py-32 bg-brand-black min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-8">
          POLÍTICA DE PRIVACIDAD
        </h1>
        <div className="prose prose-sm prose-invert max-w-none space-y-6">
          <p className="text-brand-400 leading-relaxed">
            En E-LAB, nos tomamos muy en serio la privacidad de nuestros usuarios. Esta política describe cómo recopilamos, usamos y protegemos tu información personal.
          </p>
          <h2 className="text-xl font-bold text-white mt-8">Información que Recopilamos</h2>
          <p className="text-brand-400 leading-relaxed">
            Recopilamos información que nos proporcionas directamente a través de nuestros formularios de contacto y orden, incluyendo tu nombre, dirección de email, país y detalles del proyecto.
          </p>
          <h2 className="text-xl font-bold text-white mt-8">Uso de la Información</h2>
          <p className="text-brand-400 leading-relaxed">
            Utilizamos la información recopilada únicamente para responder a tus consultas, procesar tus pedidos y mejorar nuestros servicios. No vendemos ni compartimos tu información personal con terceros.
          </p>
          <h2 className="text-xl font-bold text-white mt-8">Contacto</h2>
          <p className="text-brand-400 leading-relaxed">
            Si tienes preguntas sobre esta política, contáctanos a través de nuestro formulario de contacto.
          </p>
        </div>
      </div>
    </section>
  )
}
