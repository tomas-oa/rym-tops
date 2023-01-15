import { scrape, clean, addToDB } from './utils.js'

const URL = 'https://rateyourmusic.com/new-music/'

async function getNew () {
  const $ = await scrape(URL)
  const rows = $(
    'div#newreleases_items_container_new_releases_all .newreleases_itembox'
  )

  const NEW_REL_SELECTOR = {
    title: { selector: 'a.album.newreleases_item_title', type: 'text' },
    artist: { selector: 'span.newreleases_item_artist', type: 'text' },
    releaseDate: { selector: '.newreleases_item_releasedate', type: 'date' },
    genre: { selector: 'span.newreleases_item_genres', type: 'text' }
  }

  const data = []

  rows.each((i, el) => {
    const entries = Object.entries(NEW_REL_SELECTOR).map(([key, { selector, type }]) => {
      const rawValue = $(el).find(selector).eq(0).text()
      const cleanValue = clean(rawValue)
      const value = type === 'number' ? Number(cleanValue) : cleanValue ? type === 'date' ? new Date(cleanValue).toLocaleDateString() : cleanValue : null

      return [key, value]
    })

    data.push(Object.fromEntries(entries))
  })

  return data
}

const releases = await getNew()
await addToDB('new_releases', releases)
