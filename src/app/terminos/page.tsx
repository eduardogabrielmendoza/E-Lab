import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | E-LAB',
}

export default function TerminosPage() {
  return (
    <section className="py-24 sm:py-32 bg-brand-black min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-8">
          TÉRMINOS Y CONDICIONES
        </h1>
        <div className="prose prose-sm prose-invert max-w-none space-y-6">
          <p className="text-brand-400 leading-relaxed">
            Al utilizar los servicios de E-LAB, aceptas los siguientes términos y condiciones.
          </p>
          <h2 className="text-xl font-bold text-white mt-8">Servicios</h2>
          <p className="text-brand-400 leading-relaxed">
            E-LAB ofrece servicios de diseño de logotipos y diseño gráfico. Todos los diseños son creados de forma original y personalizada para cada cliente.
          </p>
          <h2 className="text-xl font-bold text-white mt-8">Revisiones</h2>
          <p className="text-brand-400 leading-relaxed">
            El número de revisiones depende del paquete seleccionado. Las revisiones adicionales pueden tener un costo extra.
          </p>
          <h2 className="text-xl font-bold text-white mt-8">Propiedad Intelectual</h2>
          <p className="text-brand-400 leading-relaxed">
            Una vez completado el pago, los derechos del diseño final son transferidos al cliente según los términos de la licencia incluida en su paquete.
          </p>
          <h2 className="text-xl font-bold text-white mt-8">Reembolsos</h2>
          <p className="text-brand-400 leading-relaxed">
            Los reembolsos se manejan caso por caso. Contáctanos si tienes alguna inquietud sobre tu proyecto.
          </p>
        </div>
      </div>
    </section>
  )
}
