import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | E-LAB',
  description: 'Lee nuestros artículos y encuentra recursos sobre diseño gráfico.',
}

export default function BlogPage() {
  return (
    <section className="py-24 sm:py-32 bg-brand-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-brand-300 tracking-widest mb-4">BLOG</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            ARTÍCULOS Y RECURSOS
          </h1>
          <p className="mt-4 text-brand-400 max-w-2xl mx-auto">
            Próximamente publicaremos artículos sobre diseño gráfico, branding y creatividad.
          </p>
        </div>

        {/* Empty state */}
        <div className="max-w-md mx-auto text-center py-20 border border-dashed border-brand-700">
          <svg className="w-16 h-16 text-brand-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p className="text-brand-400 text-sm">Aún no hay publicaciones.</p>
          <p className="text-brand-500 text-xs mt-1">Vuelve pronto para contenido nuevo.</p>
        </div>
      </div>
    </section>
  )
}
