'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

type ViewMode = 'desktop' | 'mobile'
type ActiveSection = 'dashboard' | 'header' | 'footer' | 'home' | 'categories' | 'contact' | 'order' | 'portfolio'

export default function AdminPage() {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false)
  const [checking, setChecking] = useState(true)
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard')
  const [viewMode, setViewMode] = useState<ViewMode>('desktop')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [previewKey, setPreviewKey] = useState(0)

  // Content states
  const [layoutData, setLayoutData] = useState<Record<string, unknown> | null>(null)
  const [homeData, setHomeData] = useState<Record<string, unknown> | null>(null)
  const [categoriesData, setCategoriesData] = useState<Record<string, unknown> | null>(null)
  const [contactData, setContactData] = useState<Record<string, unknown> | null>(null)
  const [orderData, setOrderData] = useState<Record<string, unknown> | null>(null)
  const [portfolioData, setPortfolioData] = useState<Record<string, unknown> | null>(null)

  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  useEffect(() => {
    fetch('/api/auth/session')
      .then((r) => {
        if (!r.ok) throw new Error()
        return r.json()
      })
      .then(() => setAuthenticated(true))
      .catch(() => router.push('/admin/login'))
      .finally(() => setChecking(false))
  }, [router])

  const loadContent = useCallback(async () => {
    const files = ['layout', 'home', 'categories', 'contact', 'order', 'portfolio']
    const setters = [setLayoutData, setHomeData, setCategoriesData, setContactData, setOrderData, setPortfolioData]

    await Promise.all(
      files.map(async (file, i) => {
        const res = await fetch(`/api/content?file=${file}.json`)
        if (res.ok) {
          const data = await res.json()
          setters[i](data)
        }
      })
    )
  }, [])

  useEffect(() => {
    if (authenticated) loadContent()
  }, [authenticated, loadContent])

  async function saveFile(file: string, data: unknown) {
    setSaving(true)
    setSaveMessage('')
    try {
      const res = await fetch(`/api/content?file=${file}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSaveMessage('Guardado exitosamente')
        setPreviewKey((k) => k + 1)
        setTimeout(() => setSaveMessage(''), 3000)
      } else {
        setSaveMessage('Error al guardar')
      }
    } catch {
      setSaveMessage('Error de conexión')
    }
    setSaving(false)
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  async function handleImageUpload(onUrl: (url: string) => void) {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const formData = new FormData()
      formData.append('file', file)
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData })
        if (res.ok) {
          const data = await res.json()
          onUrl(data.url)
        } else {
          const errData = await res.json().catch(() => ({}))
          alert(errData.error || 'Error al subir imagen (HTTP ' + res.status + ')')
        }
      } catch (err) {
        alert('Error al subir imagen: ' + (err instanceof Error ? err.message : String(err)))
      }
    }
    input.click()
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-brand-400 text-sm">Verificando sesión...</div>
      </div>
    )
  }

  if (!authenticated) return null

  const sections: { key: ActiveSection; label: string }[] = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'header', label: 'Header' },
    { key: 'footer', label: 'Footer' },
    { key: 'home', label: 'Home' },
    { key: 'categories', label: 'Categorías' },
    { key: 'contact', label: 'Contacto' },
    { key: 'order', label: 'Ordenar' },
    { key: 'portfolio', label: 'Portafolio' },
  ]

  const previewUrls: Record<ActiveSection, string> = {
    dashboard: '/',
    header: '/',
    footer: '/',
    home: '/',
    categories: '/logos-corporativos',
    contact: '/contacto',
    order: '/ordenar',
    portfolio: '/portafolio',
  }

  return (
    <div className="min-h-screen bg-brand-900 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-brand-black border-r border-brand-700 transform transition-transform lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-brand-700">
          <h1 className="text-xl font-black text-white tracking-tighter">E-LAB CMS</h1>
        </div>
        <nav className="p-4 space-y-1">
          {sections.map((s) => (
            <button
              key={s.key}
              onClick={() => { setActiveSection(s.key); setSidebarOpen(false) }}
              className={`w-full text-left px-4 py-2.5 text-sm rounded transition-colors ${
                activeSection === s.key
                  ? 'bg-brand-800 text-white font-medium'
                  : 'text-brand-400 hover:text-white hover:bg-brand-800/50'
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-brand-700">
          <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors">
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-brand-black border-b border-brand-700 px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-white font-medium text-sm capitalize">{activeSection}</span>
          </div>

          <div className="flex items-center gap-3">
            {saveMessage && (
              <span className={`text-xs ${saveMessage.includes('Error') ? 'text-red-400' : 'text-green-400'}`}>
                {saveMessage}
              </span>
            )}
            <button
              onClick={() => setPreviewKey((k) => k + 1)}
              className="text-xs text-brand-400 hover:text-white border border-brand-700 px-3 py-1.5 rounded"
              title="Refrescar vista previa"
            >
              ↻ Refrescar
            </button>
            <div className="flex border border-brand-700 rounded overflow-hidden">
              <button
                onClick={() => setViewMode('desktop')}
                className={`px-3 py-1.5 text-xs ${viewMode === 'desktop' ? 'bg-brand-700 text-white' : 'text-brand-400'}`}
              >
                Desktop
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`px-3 py-1.5 text-xs ${viewMode === 'mobile' ? 'bg-brand-700 text-white' : 'text-brand-400'}`}
              >
                Mobile
              </button>
            </div>
            <a href="/" target="_blank" className="text-xs text-brand-400 hover:text-white border border-brand-700 px-3 py-1.5 rounded">
              Ver sitio
            </a>
          </div>
        </header>

        {/* Content area with preview */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Editor */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:max-w-2xl">
            {activeSection === 'dashboard' && <DashboardView />}
            {activeSection === 'header' && layoutData && (
              <HeaderEditor data={layoutData} onSave={(d) => { setLayoutData(d); saveFile('layout', d) }} onUpload={handleImageUpload} saving={saving} />
            )}
            {activeSection === 'footer' && layoutData && (
              <FooterEditor data={layoutData} onSave={(d) => { setLayoutData(d); saveFile('layout', d) }} saving={saving} />
            )}
            {activeSection === 'home' && homeData && (
              <HomeEditor data={homeData} onSave={(d) => { setHomeData(d); saveFile('home', d) }} onUpload={handleImageUpload} saving={saving} />
            )}
            {activeSection === 'categories' && categoriesData && (
              <CategoriesEditor data={categoriesData} onSave={(d) => { setCategoriesData(d); saveFile('categories', d) }} onUpload={handleImageUpload} saving={saving} />
            )}
            {activeSection === 'contact' && contactData && (
              <ContactEditor data={contactData} onSave={(d) => { setContactData(d); saveFile('contact', d) }} saving={saving} />
            )}
            {activeSection === 'order' && orderData && (
              <OrderEditor data={orderData} onSave={(d) => { setOrderData(d); saveFile('order', d) }} saving={saving} />
            )}
            {activeSection === 'portfolio' && portfolioData && (
              <PortfolioEditor data={portfolioData} onSave={(d) => { setPortfolioData(d); saveFile('portfolio', d) }} onUpload={handleImageUpload} saving={saving} />
            )}
          </div>

          {/* Live Preview */}
          <div className="hidden lg:block flex-1 border-l border-brand-700 bg-brand-800 p-4 overflow-hidden">
            <div className="h-full flex items-start justify-center">
              <div
                className={`bg-white rounded-lg overflow-hidden shadow-2xl transition-all duration-300 h-full ${
                  viewMode === 'mobile' ? 'w-[375px]' : 'w-full'
                }`}
                style={viewMode === 'mobile' ? { border: '8px solid #262626', borderRadius: '24px' } : {}}
              >
                <iframe
                  src={previewUrls[activeSection]}
                  className="w-full h-full border-0"
                  key={`${viewMode}-${previewKey}`}
                  title="Vista previa"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ====================== SHARED COMPONENTS ====================== */

function DashboardView() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Bienvenido al Panel CMS</h2>
      <p className="text-brand-400 text-sm">Selecciona una sección del menú lateral para editar el contenido de tu sitio web.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: 'Header', desc: 'Logo, navegación y barra de anuncio' },
          { label: 'Footer', desc: 'Links, contacto y redes sociales' },
          { label: 'Home', desc: 'Hero, categorías, paquetes, FAQ y toggles' },
          { label: 'Categorías', desc: 'Páginas de servicios' },
          { label: 'Contacto', desc: 'Textos y WhatsApp' },
          { label: 'Ordenar', desc: 'Página de orden' },
          { label: 'Portafolio', desc: 'Logofolio con tags y hover text' },
        ].map((item) => (
          <div key={item.label} className="bg-brand-800 border border-brand-700 p-4">
            <h3 className="text-sm font-bold text-white">{item.label}</h3>
            <p className="text-xs text-brand-400 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

interface EditorProps {
  data: Record<string, unknown>
  onSave: (data: Record<string, unknown>) => void
  saving: boolean
  onUpload?: (cb: (url: string) => void) => void
}

function SaveButton({ onClick, saving }: { onClick: () => void; saving: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="bg-white text-brand-black px-6 py-2 text-sm font-bold tracking-wider hover:bg-brand-100 transition-colors disabled:opacity-50"
    >
      {saving ? 'GUARDANDO...' : 'GUARDAR CAMBIOS'}
    </button>
  )
}

function FieldInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-medium text-brand-400 mb-1.5">{label}</label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-brand-800 border border-brand-700 text-white px-3 py-2 text-sm focus:outline-none focus:border-brand-400 transition-colors"
      />
    </div>
  )
}

function FieldTextarea({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className="block text-xs font-medium text-brand-400 mb-1.5">{label}</label>
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full bg-brand-800 border border-brand-700 text-white px-3 py-2 text-sm focus:outline-none focus:border-brand-400 transition-colors resize-none"
      />
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-bold text-white border-b border-brand-700 pb-2 mb-4">{children}</h3>
}

function ToggleSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-3 py-2 cursor-pointer">
      <span className="text-sm text-brand-300">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-green-500' : 'bg-brand-600'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </label>
  )
}

/* ---- Image Components ---- */

function ImageField({ label, value, onUpload, onRemove }: { label: string; value: string; onUpload: () => void; onRemove: () => void }) {
  return (
    <div>
      <label className="block text-xs font-medium text-brand-400 mb-1.5">{label}</label>
      <div className="flex items-center gap-3">
        {value ? (
          <div className="relative w-20 h-20 bg-brand-800 border border-brand-700 overflow-hidden rounded">
            <img src={value} alt="" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-20 h-20 bg-brand-800 border border-dashed border-brand-600 flex items-center justify-center rounded">
            <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="flex flex-col gap-1.5">
          <button onClick={onUpload} className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors">
            Subir imagen
          </button>
          {value && (
            <button onClick={onRemove} className="text-xs font-medium text-red-400 hover:text-red-300 transition-colors">
              Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function ImageArrayField({ label, images, onUpload, onRemove }: { label: string; images: string[]; onUpload: () => void; onRemove: (i: number) => void }) {
  return (
    <div>
      <label className="block text-xs font-medium text-brand-400 mb-1.5">{label} ({images.length})</label>
      <div className="flex flex-wrap gap-2">
        {images.map((img, i) => (
          <div key={i} className="relative w-20 h-20 bg-brand-800 border border-brand-700 overflow-hidden rounded group">
            <img src={img} alt="" className="w-full h-full object-cover" />
            <button
              onClick={() => onRemove(i)}
              className="absolute top-0 right-0 bg-red-600 text-white w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        ))}
        <button
          onClick={onUpload}
          className="w-20 h-20 bg-brand-800 border border-dashed border-brand-600 flex items-center justify-center text-brand-500 hover:text-white hover:border-brand-400 transition-colors rounded"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  )
}

/* ---- Array Utility Components ---- */

function moveItem<T>(arr: T[], from: number, to: number): void {
  if (to < 0 || to >= arr.length) return
  const [item] = arr.splice(from, 1)
  arr.splice(to, 0, item)
}

function ArrayControls({ index, total, onMove, onRemove }: { index: number; total: number; onMove: (from: number, to: number) => void; onRemove: (i: number) => void }) {
  return (
    <div className="flex items-center gap-0.5">
      <button
        onClick={() => onMove(index, index - 1)}
        disabled={index === 0}
        className="w-7 h-7 flex items-center justify-center text-brand-400 hover:text-white disabled:opacity-30 transition-colors rounded hover:bg-brand-700"
        title="Mover arriba"
      >↑</button>
      <button
        onClick={() => onMove(index, index + 1)}
        disabled={index === total - 1}
        className="w-7 h-7 flex items-center justify-center text-brand-400 hover:text-white disabled:opacity-30 transition-colors rounded hover:bg-brand-700"
        title="Mover abajo"
      >↓</button>
      <button
        onClick={() => onRemove(index)}
        className="w-7 h-7 flex items-center justify-center text-red-400 hover:text-red-300 transition-colors rounded hover:bg-red-900/30"
        title="Eliminar"
      >×</button>
    </div>
  )
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2.5 border border-dashed border-brand-600 text-brand-500 hover:text-white hover:border-brand-400 text-xs font-medium transition-colors flex items-center justify-center gap-2 rounded"
    >
      <span>+</span> {label}
    </button>
  )
}

const PORTFOLIO_TAGS = ['CORPORATIVO', 'BANDAS', 'MINIMALISTA', 'MERCH', 'BRANDING']

interface PortfolioImage {
  url: string
  tag: string
  text: string
  colorUrl?: string
}

function PortfolioImageField({ images, onUpload, onColorUpload, onRemove, onUpdate }: {
  images: PortfolioImage[]
  onUpload: () => void
  onColorUpload: (index: number) => void
  onRemove: (i: number) => void
  onUpdate: (i: number, field: 'tag' | 'text' | 'colorUrl', value: string) => void
}) {
  function onMove(from: number, to: number) {
    moveItem(images, from, to)
    // Trigger re-render by calling onUpdate with no change
    if (images[to]) onUpdate(to, 'text', images[to].text)
  }

  return (
    <div>
      <label className="block text-xs font-medium text-brand-400 mb-2">Imágenes del Logofolio ({images.length})</label>
      <div className="space-y-3">
        {images.map((img, i) => (
          <div key={i} className="flex gap-3 bg-brand-800/50 p-3 border border-brand-700 rounded">
            <div className="shrink-0 space-y-2">
              {/* Reorder + remove controls */}
              <div className="flex items-center justify-center gap-0.5 mb-1">
                <button
                  onClick={() => onMove(i, i - 1)}
                  disabled={i === 0}
                  className="w-6 h-6 flex items-center justify-center text-brand-400 hover:text-white disabled:opacity-30 transition-colors rounded text-xs hover:bg-brand-700"
                  title="Mover arriba"
                >↑</button>
                <button
                  onClick={() => onMove(i, i + 1)}
                  disabled={i === images.length - 1}
                  className="w-6 h-6 flex items-center justify-center text-brand-400 hover:text-white disabled:opacity-30 transition-colors rounded text-xs hover:bg-brand-700"
                  title="Mover abajo"
                >↓</button>
                <button
                  onClick={() => onRemove(i)}
                  className="w-6 h-6 flex items-center justify-center text-red-400 hover:text-red-300 transition-colors rounded text-xs hover:bg-red-900/30"
                  title="Eliminar"
                >×</button>
              </div>
              {/* Main image */}
              <div className="relative w-28 h-10 bg-brand-800 border border-brand-700 overflow-hidden rounded group">
                <img src={img.url} alt="" className="w-full h-full object-contain" />
              </div>
              {/* Color version preview */}
              {img.colorUrl ? (
                <div className="relative w-28 h-10 bg-brand-800 border border-amber-600/50 overflow-hidden rounded group">
                  <img src={img.colorUrl} alt="Color" className="w-full h-full object-contain" />
                  <button
                    onClick={() => onUpdate(i, 'colorUrl', '')}
                    className="absolute top-0 right-0 bg-red-600 text-white w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                  <span className="absolute bottom-0 left-0 bg-amber-600/80 text-white text-[8px] px-1">COLOR</span>
                </div>
              ) : (
                <button
                  onClick={() => onColorUpload(i)}
                  className="w-28 h-10 bg-brand-900 border border-dashed border-amber-600/40 rounded flex items-center justify-center gap-1 text-amber-500/60 hover:text-amber-400 hover:border-amber-500/60 transition-colors"
                  title="Subir versión a color"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  <span className="text-[9px]">Color</span>
                </button>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <label className="block text-xs text-brand-500 mb-1">Tag</label>
                <select
                  value={img.tag || ''}
                  onChange={(e) => onUpdate(i, 'tag', e.target.value)}
                  className="w-full bg-brand-800 border border-brand-700 text-white px-2 py-1.5 text-xs focus:outline-none focus:border-brand-400"
                >
                  <option value="">Sin tag</option>
                  {PORTFOLIO_TAGS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-brand-500 mb-1">Texto hover</label>
                <input
                  type="text"
                  value={img.text || ''}
                  onChange={(e) => onUpdate(i, 'text', e.target.value)}
                  placeholder="Texto que aparece al hacer hover"
                  className="w-full bg-brand-800 border border-brand-700 text-white px-2 py-1.5 text-xs focus:outline-none focus:border-brand-400 placeholder:text-brand-600"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={onUpload}
        className="mt-3 w-full py-3 bg-brand-800 border border-dashed border-brand-600 flex items-center justify-center gap-2 text-brand-500 hover:text-white hover:border-brand-400 transition-colors rounded text-xs"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Agregar imagen al logofolio
      </button>
    </div>
  )
}

/* ====================== EDITOR COMPONENTS ====================== */

/* ---- Header Editor ---- */
function HeaderEditor({ data, onSave, onUpload, saving }: EditorProps) {
  const [local, setLocal] = useState(JSON.parse(JSON.stringify(data)))
  const ann = local.announcement as Record<string, unknown>
  const nav = local.nav as Record<string, unknown>
  const logo = nav.logo as Record<string, unknown>
  const links = nav.links as Array<Record<string, string>>
  const cta = nav.cta as Record<string, string>

  function update() { setLocal(JSON.parse(JSON.stringify(local))) }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Editar Header</h2>
        <SaveButton onClick={() => onSave(local)} saving={saving} />
      </div>

      <SectionTitle>Barra de Anuncio</SectionTitle>
      <ToggleSwitch label="Mostrar barra de anuncio" checked={ann.visible as boolean} onChange={(v) => { ann.visible = v; update() }} />
      <FieldInput label="Texto" value={ann.text as string} onChange={(v) => { ann.text = v; update() }} />
      <FieldInput label="Link" value={ann.link as string} onChange={(v) => { ann.link = v; update() }} />

      <SectionTitle>Logo</SectionTitle>
      <FieldInput label="Texto del Logo" value={logo.text as string} onChange={(v) => { logo.text = v; update() }} />
      {onUpload && (
        <ImageField
          label="Imagen del Logo"
          value={(logo.image as string) || ''}
          onUpload={() => onUpload((url) => { logo.image = url; update() })}
          onRemove={() => { logo.image = ''; update() }}
        />
      )}

      <SectionTitle>Links de Navegación</SectionTitle>
      {links.map((link, i) => (
        <div key={i} className="bg-brand-800/50 p-3 border border-brand-700 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-brand-400">Link {i + 1}</span>
            <ArrayControls index={i} total={links.length} onMove={(from, to) => { moveItem(links, from, to); update() }} onRemove={(idx) => { links.splice(idx, 1); update() }} />
          </div>
          <div className="flex gap-2">
            <FieldInput label="Label" value={link.label} onChange={(v) => { link.label = v; update() }} />
            <FieldInput label="Href" value={link.href} onChange={(v) => { link.href = v; update() }} />
          </div>
        </div>
      ))}
      <AddButton label="Agregar link de navegación" onClick={() => { links.push({ label: 'Nuevo', href: '/' }); update() }} />

      <SectionTitle>Botón CTA</SectionTitle>
      <FieldInput label="Label" value={cta.label} onChange={(v) => { cta.label = v; update() }} />
      <FieldInput label="Href" value={cta.href} onChange={(v) => { cta.href = v; update() }} />

      <SaveButton onClick={() => onSave(local)} saving={saving} />
    </div>
  )
}

/* ---- Footer Editor ---- */
function FooterEditor({ data, onSave, saving }: EditorProps) {
  const [local, setLocal] = useState(JSON.parse(JSON.stringify(data)))
  const footer = local.footer as Record<string, unknown>
  const fLogo = footer.logo as Record<string, string>
  const categories = footer.categories as { title: string; links: Array<Record<string, string>> }
  const menu = footer.menu as { title: string; links: Array<Record<string, string>> }
  const contact = footer.contact as Record<string, unknown>
  const socials = (contact.socials || []) as Array<Record<string, string>>

  function update() { setLocal(JSON.parse(JSON.stringify(local))) }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Editar Footer</h2>
        <SaveButton onClick={() => onSave(local)} saving={saving} />
      </div>

      <SectionTitle>Logo y Descripción</SectionTitle>
      <FieldInput label="Texto del Logo" value={fLogo.text} onChange={(v) => { fLogo.text = v; update() }} />
      <FieldTextarea label="Descripción" value={footer.description as string} onChange={(v) => { footer.description = v; update() }} />

      <SectionTitle>Categorías</SectionTitle>
      <FieldInput label="Título de sección" value={categories.title} onChange={(v) => { categories.title = v; update() }} />
      {categories.links.map((link, i) => (
        <div key={i} className="bg-brand-800/50 p-3 border border-brand-700 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-brand-400">Link {i + 1}</span>
            <ArrayControls index={i} total={categories.links.length} onMove={(from, to) => { moveItem(categories.links, from, to); update() }} onRemove={(idx) => { categories.links.splice(idx, 1); update() }} />
          </div>
          <div className="flex gap-2">
            <FieldInput label="Label" value={link.label} onChange={(v) => { link.label = v; update() }} />
            <FieldInput label="Href" value={link.href} onChange={(v) => { link.href = v; update() }} />
          </div>
        </div>
      ))}
      <AddButton label="Agregar link de categoría" onClick={() => { categories.links.push({ label: 'Nuevo', href: '/' }); update() }} />

      <SectionTitle>Menú</SectionTitle>
      <FieldInput label="Título de sección" value={menu.title || ''} onChange={(v) => { menu.title = v; update() }} />
      {menu.links.map((link, i) => (
        <div key={i} className="bg-brand-800/50 p-3 border border-brand-700 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-brand-400">Link {i + 1}</span>
            <ArrayControls index={i} total={menu.links.length} onMove={(from, to) => { moveItem(menu.links, from, to); update() }} onRemove={(idx) => { menu.links.splice(idx, 1); update() }} />
          </div>
          <div className="flex gap-2">
            <FieldInput label="Label" value={link.label} onChange={(v) => { link.label = v; update() }} />
            <FieldInput label="Href" value={link.href} onChange={(v) => { link.href = v; update() }} />
          </div>
        </div>
      ))}
      <AddButton label="Agregar link de menú" onClick={() => { menu.links.push({ label: 'Nuevo', href: '/' }); update() }} />

      <SectionTitle>Redes Sociales</SectionTitle>
      {socials.map((social, i) => (
        <div key={i} className="bg-brand-800/50 p-3 border border-brand-700 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-brand-400">Red {i + 1}</span>
            <ArrayControls index={i} total={socials.length} onMove={(from, to) => { moveItem(socials, from, to); update() }} onRemove={(idx) => { socials.splice(idx, 1); contact.socials = socials; update() }} />
          </div>
          <div className="flex gap-2">
            <FieldInput label="Plataforma" value={social.platform || social.label || ''} onChange={(v) => { social.platform = v; social.label = v; update() }} />
            <FieldInput label="URL" value={social.url || social.href || ''} onChange={(v) => { social.url = v; social.href = v; update() }} />
          </div>
        </div>
      ))}
      <AddButton label="Agregar red social" onClick={() => { socials.push({ platform: 'Instagram', label: 'Instagram', url: 'https://instagram.com/', href: 'https://instagram.com/' }); contact.socials = socials; update() }} />

      <SectionTitle>Contacto</SectionTitle>
      <FieldInput label="Ubicación" value={contact.location as string} onChange={(v) => { contact.location = v; update() }} />
      <FieldInput label="Email" value={contact.email as string} onChange={(v) => { contact.email = v; update() }} />
      <FieldInput label="Copyright" value={footer.copyright as string} onChange={(v) => { footer.copyright = v; update() }} />

      <SaveButton onClick={() => onSave(local)} saving={saving} />
    </div>
  )
}

/* ---- Home Editor ---- */
function HomeEditor({ data, onSave, onUpload, saving }: EditorProps) {
  const [local, setLocal] = useState(JSON.parse(JSON.stringify(data)))
  const hero = local.hero as Record<string, unknown>
  const marquee = local.marquee as Record<string, unknown> || { visible: true }
  const cats = local.categories as { visible?: boolean; title: string; items: Array<Record<string, unknown>> }
  const howItWorks = local.howItWorks as { visible?: boolean; title: string; steps: Array<Record<string, string>> }
  const packages = local.packages as { visible?: boolean; title: string; items: Array<Record<string, unknown>> }
  const gallery = local.gallery as { visible?: boolean; title: string; images: string[] }
  const cta = local.cta as Record<string, unknown>
  const demoForm = local.demoForm as Record<string, unknown>
  const faq = local.faq as { visible?: boolean; title: string; items: Array<Record<string, string>> }

  function update() { setLocal(JSON.parse(JSON.stringify(local))) }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Editar Home</h2>
        <SaveButton onClick={() => onSave(local)} saving={saving} />
      </div>

      {/* Visibility Toggles */}
      <SectionTitle>Visibilidad de Secciones</SectionTitle>
      <div className="bg-brand-800/50 p-4 border border-brand-700 space-y-1">
        <ToggleSwitch label="Hero" checked={hero.visible !== false} onChange={(v) => { hero.visible = v; update() }} />
        <ToggleSwitch label="Marquee (cinta animada)" checked={marquee.visible !== false} onChange={(v) => { if (!local.marquee) local.marquee = {}; (local.marquee as Record<string, unknown>).visible = v; update() }} />
        <ToggleSwitch label="Categorías" checked={cats.visible !== false} onChange={(v) => { cats.visible = v; update() }} />
        <ToggleSwitch label="¿Cómo funciona?" checked={howItWorks.visible !== false} onChange={(v) => { howItWorks.visible = v; update() }} />
        <ToggleSwitch label="Paquetes / Precios" checked={packages.visible !== false} onChange={(v) => { packages.visible = v; update() }} />
        <ToggleSwitch label="Galería Trabajos Recientes" checked={gallery.visible !== false} onChange={(v) => { gallery.visible = v; update() }} />
        <ToggleSwitch label="CTA - Ordena tu logotipo" checked={(cta.visible as boolean) !== false} onChange={(v) => { cta.visible = v; update() }} />
        <ToggleSwitch label="Demo / WhatsApp" checked={(demoForm.visible as boolean) !== false} onChange={(v) => { demoForm.visible = v; update() }} />
        <ToggleSwitch label="FAQ" checked={faq.visible !== false} onChange={(v) => { faq.visible = v; update() }} />
      </div>

      <SectionTitle>Placeholders de Imágenes</SectionTitle>
      <p className="text-xs text-brand-500 -mt-3 mb-2">Muestra u oculta los recuadros grises cuando no hay imágenes subidas.</p>
      <div className="bg-brand-800/50 p-4 border border-brand-700 space-y-1">
        <ToggleSwitch label="Placeholders del Hero (3 imágenes)" checked={(hero.showPlaceholders as boolean) !== false} onChange={(v) => { hero.showPlaceholders = v; update() }} />
        <ToggleSwitch label="Placeholders de Categorías" checked={(cats as Record<string, unknown>).showPlaceholders !== false} onChange={(v) => { (cats as Record<string, unknown>).showPlaceholders = v; update() }} />
        <ToggleSwitch label="Placeholders de Galería" checked={(gallery as Record<string, unknown>).showPlaceholders !== false} onChange={(v) => { (gallery as Record<string, unknown>).showPlaceholders = v; update() }} />
      </div>

      {/* Hero */}
      <SectionTitle>Hero</SectionTitle>
      <FieldInput label="Título" value={hero.title as string} onChange={(v) => { hero.title = v; update() }} />
      <FieldTextarea label="Subtítulo" value={hero.subtitle as string} onChange={(v) => { hero.subtitle = v; update() }} />
      <FieldInput label="Badge" value={hero.badge as string} onChange={(v) => { hero.badge = v; update() }} />
      <FieldInput label="CTA 1 Label" value={(hero.cta1 as Record<string, string>).label} onChange={(v) => { (hero.cta1 as Record<string, string>).label = v; update() }} />
      <FieldInput label="CTA 1 Href" value={(hero.cta1 as Record<string, string>).href} onChange={(v) => { (hero.cta1 as Record<string, string>).href = v; update() }} />
      <FieldInput label="CTA 2 Label" value={(hero.cta2 as Record<string, string>).label} onChange={(v) => { (hero.cta2 as Record<string, string>).label = v; update() }} />
      <FieldInput label="CTA 2 Href" value={(hero.cta2 as Record<string, string>).href} onChange={(v) => { (hero.cta2 as Record<string, string>).href = v; update() }} />
      {onUpload && (
        <ImageArrayField
          label="Imágenes del Hero (3 imágenes)"
          images={(hero.images as string[]) || []}
          onUpload={() => onUpload((url) => { if (!hero.images) hero.images = []; (hero.images as string[]).push(url); update() })}
          onRemove={(i) => { (hero.images as string[]).splice(i, 1); update() }}
        />
      )}

      {/* Categories */}
      <SectionTitle>Categorías</SectionTitle>
      <FieldInput label="Título de sección" value={cats.title} onChange={(v) => { cats.title = v; update() }} />
      {cats.items.map((item, i) => (
        <div key={i} className="bg-brand-800/50 p-3 space-y-2 border border-brand-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-brand-400">Categoría {i + 1}</span>
            <ArrayControls index={i} total={cats.items.length} onMove={(from, to) => { moveItem(cats.items, from, to); update() }} onRemove={(idx) => { cats.items.splice(idx, 1); update() }} />
          </div>
          <FieldInput label="Título" value={item.title as string} onChange={(v) => { item.title = v; update() }} />
          <FieldInput label="Slug" value={item.slug as string} onChange={(v) => { item.slug = v; update() }} />
          <FieldTextarea label="Descripción" value={item.description as string} onChange={(v) => { item.description = v; update() }} rows={2} />
          {onUpload && (
            <ImageField
              label="Imagen de categoría"
              value={(item.image as string) || ''}
              onUpload={() => onUpload((url) => { item.image = url; update() })}
              onRemove={() => { item.image = ''; update() }}
            />
          )}
        </div>
      ))}
      <AddButton label="Agregar categoría" onClick={() => { cats.items.push({ title: 'Nueva Categoría', slug: 'nueva-categoria', description: '', image: '' }); update() }} />

      {/* How it works */}
      <SectionTitle>Cómo Funciona</SectionTitle>
      <FieldInput label="Título de sección" value={howItWorks.title} onChange={(v) => { howItWorks.title = v; update() }} />
      {howItWorks.steps.map((step, i) => (
        <div key={i} className="bg-brand-800/50 p-3 space-y-2 border border-brand-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-brand-400">Paso {i + 1}</span>
            <ArrayControls index={i} total={howItWorks.steps.length} onMove={(from, to) => { moveItem(howItWorks.steps, from, to); update() }} onRemove={(idx) => { howItWorks.steps.splice(idx, 1); update() }} />
          </div>
          <FieldInput label="Número" value={step.number} onChange={(v) => { step.number = v; update() }} />
          <FieldInput label="Título" value={step.title} onChange={(v) => { step.title = v; update() }} />
          <FieldTextarea label="Descripción" value={step.description} onChange={(v) => { step.description = v; update() }} rows={2} />
        </div>
      ))}
      <AddButton label="Agregar paso" onClick={() => { howItWorks.steps.push({ number: String(howItWorks.steps.length + 1), title: 'Nuevo paso', description: '' }); update() }} />

      {/* Packages */}
      <SectionTitle>Paquetes</SectionTitle>
      <FieldInput label="Título de sección" value={packages.title} onChange={(v) => { packages.title = v; update() }} />
      {packages.items.map((pkg, i) => (
        <div key={i} className="bg-brand-800/50 p-3 space-y-2 border border-brand-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-brand-400">Paquete {i + 1}</span>
            <ArrayControls index={i} total={packages.items.length} onMove={(from, to) => { moveItem(packages.items, from, to); update() }} onRemove={(idx) => { packages.items.splice(idx, 1); update() }} />
          </div>
          <FieldInput label="Nombre" value={pkg.name as string} onChange={(v) => { pkg.name = v; update() }} />
          <FieldInput label="Precio" value={pkg.price as string} onChange={(v) => { pkg.price = v; update() }} />
          <FieldInput label="Descripción" value={pkg.description as string} onChange={(v) => { pkg.description = v; update() }} />
          <FieldTextarea label="Features (una por línea)" value={(pkg.features as string[]).join('\n')} onChange={(v) => { pkg.features = v.split('\n'); update() }} rows={4} />
          <FieldInput label="Botón Label" value={(pkg.cta as Record<string, string>).label} onChange={(v) => { (pkg.cta as Record<string, string>).label = v; update() }} />
          <FieldInput label="Botón Link (URL WhatsApp o ruta)" value={(pkg.cta as Record<string, string>).href} onChange={(v) => { (pkg.cta as Record<string, string>).href = v; update() }} />
          <label className="flex items-center gap-2 text-sm text-brand-300">
            <input type="checkbox" checked={pkg.popular as boolean} onChange={(e) => { pkg.popular = e.target.checked; update() }} className="accent-white" />
            Popular (destacado)
          </label>
        </div>
      ))}
      <AddButton label="Agregar paquete" onClick={() => { packages.items.push({ name: 'Nuevo Paquete', price: '$0', description: '', features: ['Feature 1'], cta: { label: 'Ordenar', href: '/ordenar' }, popular: false }); update() }} />

      {/* Gallery */}
      <SectionTitle>Galería - Trabajos Recientes</SectionTitle>
      <FieldInput label="Título" value={gallery.title} onChange={(v) => { gallery.title = v; update() }} />
      {onUpload && (
        <ImageArrayField
          label="Imágenes de galería"
          images={gallery.images || []}
          onUpload={() => onUpload((url) => { if (!gallery.images) gallery.images = []; gallery.images.push(url); update() })}
          onRemove={(i) => { gallery.images.splice(i, 1); update() }}
        />
      )}

      {/* CTA */}
      <SectionTitle>CTA</SectionTitle>
      <FieldInput label="Título" value={cta.title as string} onChange={(v) => { cta.title = v; update() }} />
      <FieldTextarea label="Descripción" value={cta.description as string} onChange={(v) => { cta.description = v; update() }} />
      <FieldInput label="Botón Label" value={(cta.button as Record<string, string>).label} onChange={(v) => { (cta.button as Record<string, string>).label = v; update() }} />
      <FieldInput label="Botón Link (URL WhatsApp o ruta)" value={(cta.button as Record<string, string>).href} onChange={(v) => { (cta.button as Record<string, string>).href = v; update() }} />

      {/* Demo Form / WhatsApp */}
      <SectionTitle>Demo / WhatsApp</SectionTitle>
      <FieldInput label="Título" value={demoForm.title as string} onChange={(v) => { demoForm.title = v; update() }} />
      <FieldTextarea label="Subtítulo" value={demoForm.subtitle as string} onChange={(v) => { demoForm.subtitle = v; update() }} />
      <FieldInput label="Mensaje de WhatsApp" value={demoForm.whatsappMessage as string || ''} onChange={(v) => { demoForm.whatsappMessage = v; update() }} />

      {/* FAQ */}
      <SectionTitle>FAQ</SectionTitle>
      <FieldInput label="Título de sección" value={faq.title} onChange={(v) => { faq.title = v; update() }} />
      {faq.items.map((item, i) => (
        <div key={i} className="bg-brand-800/50 p-3 space-y-2 border border-brand-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-brand-400">Pregunta {i + 1}</span>
            <ArrayControls index={i} total={faq.items.length} onMove={(from, to) => { moveItem(faq.items, from, to); update() }} onRemove={(idx) => { faq.items.splice(idx, 1); update() }} />
          </div>
          <FieldInput label="Pregunta" value={item.question} onChange={(v) => { item.question = v; update() }} />
          <FieldTextarea label="Respuesta" value={item.answer} onChange={(v) => { item.answer = v; update() }} rows={3} />
        </div>
      ))}
      <AddButton label="Agregar pregunta" onClick={() => { faq.items.push({ question: 'Nueva pregunta', answer: 'Respuesta...' }); update() }} />

      <SaveButton onClick={() => onSave(local)} saving={saving} />
    </div>
  )
}

/* ---- Categories Editor ---- */
function CategoriesEditor({ data, onSave, onUpload, saving }: EditorProps) {
  const [local, setLocal] = useState(JSON.parse(JSON.stringify(data)))
  const pages = local.pages as Record<string, Record<string, unknown>>

  function update() { setLocal(JSON.parse(JSON.stringify(local))) }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Editar Categorías</h2>
        <SaveButton onClick={() => onSave(local)} saving={saving} />
      </div>

      <SectionTitle>Placeholders de Imágenes</SectionTitle>
      <p className="text-xs text-brand-500 -mt-3 mb-2">Controla los recuadros grises en todas las páginas de categorías cuando no hay imágenes.</p>
      <div className="bg-brand-800/50 p-4 border border-brand-700 space-y-1">
        <ToggleSwitch label="Mostrar placeholders en categorías" checked={local.showPlaceholders !== false} onChange={(v) => { local.showPlaceholders = v; update() }} />
      </div>

      {Object.entries(pages).map(([slug, page]) => (
        <div key={slug} className="border border-brand-700 p-4 space-y-3">
          <SectionTitle>{page.title as string}</SectionTitle>
          <FieldInput label="Título" value={page.title as string} onChange={(v) => { page.title = v; update() }} />
          <FieldTextarea label="Subtítulo" value={page.subtitle as string} onChange={(v) => { page.subtitle = v; update() }} />
          <FieldTextarea label="Overview" value={page.overview as string} onChange={(v) => { page.overview = v; update() }} rows={3} />
          <FieldTextarea
            label="Qué obtendrás (uno por línea)"
            value={(page.whatYouGet as string[]).join('\n')}
            onChange={(v) => { page.whatYouGet = v.split('\n'); update() }}
            rows={5}
          />
          {onUpload && (
            <>
              <ImageArrayField
                label="Imágenes hero de categoría"
                images={(page.heroImages as string[]) || []}
                onUpload={() => onUpload((url) => { if (!page.heroImages) page.heroImages = []; (page.heroImages as string[]).push(url); update() })}
                onRemove={(i) => { (page.heroImages as string[]).splice(i, 1); update() }}
              />
              <ImageArrayField
                label="Galería de categoría"
                images={(page.gallery as string[]) || []}
                onUpload={() => onUpload((url) => { if (!page.gallery) page.gallery = []; (page.gallery as string[]).push(url); update() })}
                onRemove={(i) => { (page.gallery as string[]).splice(i, 1); update() }}
              />
            </>
          )}
        </div>
      ))}

      <SaveButton onClick={() => onSave(local)} saving={saving} />
    </div>
  )
}

/* ---- Contact Editor ---- */
function ContactEditor({ data, onSave, saving }: EditorProps) {
  const [local, setLocal] = useState(JSON.parse(JSON.stringify(data)))
  const hero = local.hero as Record<string, string>
  const form = local.form as Record<string, unknown>
  const cta = local.cta as Record<string, unknown>

  function update() { setLocal(JSON.parse(JSON.stringify(local))) }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Editar Contacto</h2>
        <SaveButton onClick={() => onSave(local)} saving={saving} />
      </div>

      <SectionTitle>Visibilidad</SectionTitle>
      <div className="bg-brand-800/50 p-4 border border-brand-700 space-y-1">
        <ToggleSwitch label="Sección formulario / WhatsApp" checked={(form.visible as boolean) !== false} onChange={(v) => { form.visible = v; update() }} />
        <ToggleSwitch label="Sección CTA" checked={(cta.visible as boolean) !== false} onChange={(v) => { cta.visible = v; update() }} />
      </div>

      <SectionTitle>Hero</SectionTitle>
      <FieldInput label="Título" value={hero.title} onChange={(v) => { hero.title = v; update() }} />
      <FieldInput label="Subtítulo" value={hero.subtitle} onChange={(v) => { hero.subtitle = v; update() }} />

      <SectionTitle>WhatsApp</SectionTitle>
      <FieldInput label="Título" value={form.title as string} onChange={(v) => { form.title = v; update() }} />
      <FieldTextarea label="Descripción" value={form.description as string} onChange={(v) => { form.description = v; update() }} />
      <FieldInput label="Mensaje de WhatsApp" value={form.whatsappMessage as string || ''} onChange={(v) => { form.whatsappMessage = v; update() }} />

      <SectionTitle>CTA</SectionTitle>
      <FieldInput label="Título" value={cta.title as string} onChange={(v) => { cta.title = v; update() }} />
      <FieldTextarea label="Descripción" value={cta.description as string} onChange={(v) => { cta.description = v; update() }} />
      <FieldInput label="Botón Label" value={(cta.button as Record<string, string>).label} onChange={(v) => { (cta.button as Record<string, string>).label = v; update() }} />
      <FieldInput label="Botón Href" value={(cta.button as Record<string, string>).href} onChange={(v) => { (cta.button as Record<string, string>).href = v; update() }} />

      <SaveButton onClick={() => onSave(local)} saving={saving} />
    </div>
  )
}

/* ---- Order Editor ---- */
function OrderEditor({ data, onSave, saving }: EditorProps) {
  const [local, setLocal] = useState(JSON.parse(JSON.stringify(data)))
  const hero = local.hero as Record<string, string>
  const form = local.form as Record<string, unknown>
  const cta = local.cta as Record<string, unknown>

  function update() { setLocal(JSON.parse(JSON.stringify(local))) }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Editar Orden</h2>
        <SaveButton onClick={() => onSave(local)} saving={saving} />
      </div>

      <SectionTitle>Visibilidad</SectionTitle>
      <div className="bg-brand-800/50 p-4 border border-brand-700 space-y-1">
        <ToggleSwitch label="Sección CTA" checked={(cta.visible as boolean) !== false} onChange={(v) => { cta.visible = v; update() }} />
      </div>

      <SectionTitle>Hero</SectionTitle>
      <FieldInput label="Título" value={hero.title} onChange={(v) => { hero.title = v; update() }} />
      <FieldTextarea label="Descripción" value={hero.description} onChange={(v) => { hero.description = v; update() }} />

      <SectionTitle>WhatsApp</SectionTitle>
      <FieldInput label="Badge" value={form.badge as string} onChange={(v) => { form.badge = v; update() }} />
      <FieldInput label="Mensaje de WhatsApp" value={form.whatsappMessage as string || ''} onChange={(v) => { form.whatsappMessage = v; update() }} />

      <SectionTitle>CTA</SectionTitle>
      <FieldInput label="Título" value={cta.title as string} onChange={(v) => { cta.title = v; update() }} />
      <FieldTextarea label="Descripción" value={cta.description as string} onChange={(v) => { cta.description = v; update() }} />
      <FieldInput label="Botón Label" value={(cta.button as Record<string, string>).label} onChange={(v) => { (cta.button as Record<string, string>).label = v; update() }} />
      <FieldInput label="Botón Link (URL WhatsApp o ruta)" value={(cta.button as Record<string, string>).href} onChange={(v) => { (cta.button as Record<string, string>).href = v; update() }} />

      <SaveButton onClick={() => onSave(local)} saving={saving} />
    </div>
  )
}

/* ---- Portfolio Editor ---- */
function PortfolioEditor({ data, onSave, onUpload, saving }: EditorProps) {
  const [local, setLocal] = useState(JSON.parse(JSON.stringify(data)))
  const hero = local.hero as Record<string, string>
  const showcase = local.showcase as Record<string, unknown>
  const gallery = local.gallery as { tabs: string[]; images: PortfolioImage[] }

  function update() { setLocal(JSON.parse(JSON.stringify(local))) }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Editar Portafolio</h2>
        <SaveButton onClick={() => onSave(local)} saving={saving} />
      </div>

      <SectionTitle>Visibilidad</SectionTitle>
      <div className="bg-brand-800/50 p-4 border border-brand-700 space-y-1">
        <ToggleSwitch label="Sección Showcase/Descripción" checked={(showcase.visible as boolean) !== false} onChange={(v) => { showcase.visible = v; update() }} />
        <ToggleSwitch label="Placeholders del Logofolio" checked={(gallery as Record<string, unknown>).showPlaceholders !== false} onChange={(v) => { (gallery as Record<string, unknown>).showPlaceholders = v; update() }} />
      </div>

      <SectionTitle>Hero</SectionTitle>
      <FieldInput label="Título" value={hero.title} onChange={(v) => { hero.title = v; update() }} />
      <FieldTextarea label="Subtítulo" value={hero.subtitle} onChange={(v) => { hero.subtitle = v; update() }} />

      <SectionTitle>Showcase</SectionTitle>
      <FieldInput label="Título" value={showcase.title as string} onChange={(v) => { showcase.title = v; update() }} />
      <FieldTextarea label="Descripción" value={showcase.description as string} onChange={(v) => { showcase.description = v; update() }} rows={4} />
      <FieldTextarea
        label="Secciones (una por línea)"
        value={(showcase.sections as string[]).join('\n')}
        onChange={(v) => { showcase.sections = v.split('\n'); update() }}
        rows={6}
      />

      <SectionTitle>Galería del Logofolio</SectionTitle>
      <p className="text-xs text-brand-500 mb-2">
        Tags disponibles: {PORTFOLIO_TAGS.join(', ')}. Cada imagen necesita un tag para ser filtrada correctamente.
      </p>
      {onUpload && (
        <PortfolioImageField
          images={gallery.images || []}
          onUpload={() => onUpload((url) => {
            if (!gallery.images) gallery.images = []
            const defaultTag = PORTFOLIO_TAGS[0] || ''
            gallery.images.push({ url, tag: defaultTag, text: '' })
            update()
          })}
          onColorUpload={(index) => onUpload((url) => {
            if (gallery.images && gallery.images[index]) {
              gallery.images[index].colorUrl = url
              update()
            }
          })}
          onRemove={(i) => { gallery.images.splice(i, 1); update() }}
          onUpdate={(i, field, value) => { (gallery.images[i] as unknown as Record<string, string>)[field] = value; update() }}
        />
      )}

      <SaveButton onClick={() => onSave(local)} saving={saving} />
    </div>
  )
}
