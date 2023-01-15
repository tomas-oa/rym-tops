import * as cheerio from 'cheerio'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'

const DB_PATH = path.join(process.cwd(), './db')

export async function addToDB (name, data) {
  return writeFile(`${DB_PATH}/{name}.json`, JSON.stringify(data, null, 2), 'utf8')
}

export async function scrape (url) {
  const res = await fetch(url)
  const html = await res.text()
  const $ = cheerio.load(html)

  return $
}

export function clean (str) {
  return str.replace(/\t|\n|\s:/g, '').trim()
}
