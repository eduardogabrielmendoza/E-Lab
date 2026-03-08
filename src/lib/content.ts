import { readFileSync } from 'fs'
import { join } from 'path'

const CONTENT_DIR = join(process.cwd(), 'src', 'content')

function readJson(file: string) {
  const filePath = join(CONTENT_DIR, file)
  const raw = readFileSync(filePath, 'utf-8')
  return JSON.parse(raw)
}

export function getLayoutContent() { return readJson('layout.json') }
export function getHomeContent() { return readJson('home.json') }
export function getCategoriesContent() { return readJson('categories.json') }
export function getContactContent() { return readJson('contact.json') }
export function getOrderContent() { return readJson('order.json') }
export function getPortfolioContent() { return readJson('portfolio.json') }
