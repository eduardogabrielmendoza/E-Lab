import { readFileSync, existsSync, mkdirSync, copyFileSync } from 'fs'
import { join } from 'path'

const DEFAULT_CONTENT_DIR = join(process.cwd(), 'src', 'content')
const PERSISTENT_DIR = join(process.cwd(), 'data', 'content')

function ensurePersistentDir() {
  if (!existsSync(PERSISTENT_DIR)) {
    mkdirSync(PERSISTENT_DIR, { recursive: true })
  }
}

function ensureFile(file: string) {
  const persistentPath = join(PERSISTENT_DIR, file)
  if (!existsSync(persistentPath)) {
    const defaultPath = join(DEFAULT_CONTENT_DIR, file)
    if (existsSync(defaultPath)) {
      copyFileSync(defaultPath, persistentPath)
    }
  }
}

function readJson(file: string) {
  ensurePersistentDir()
  ensureFile(file)
  const filePath = join(PERSISTENT_DIR, file)
  const raw = readFileSync(filePath, 'utf-8')
  return JSON.parse(raw)
}

export function getContentDir() { return PERSISTENT_DIR }

export function getLayoutContent() { return readJson('layout.json') }
export function getHomeContent() { return readJson('home.json') }
export function getCategoriesContent() { return readJson('categories.json') }
export function getContactContent() { return readJson('contact.json') }
export function getOrderContent() { return readJson('order.json') }
export function getPortfolioContent() { return readJson('portfolio.json') }
