import { addToDB, scrape, clean } from './utils.js'

const URLS = {
  2023: 'https://rateyourmusic.com/charts/top/album/2023/'
  // 2022: 'https://rateyourmusic.com/charts/top/album/2022/',
  // 2021: 'https://rateyourmusic.com/charts/top/album/2021/',
  // 2020: 'https://rateyourmusic.com/charts/top/album/2020s/',
  // 2010: 'https://rateyourmusic.com/charts/top/album/2010s/',
  // 2000: 'https://rateyourmusic.com/charts/top/album/2000s/',
  // 1990: 'https://rateyourmusic.com/charts/top/album/1990s/',
  // 1980: 'https://rateyourmusic.com/charts/top/album/1980s/'
}

async function getTop (url) {
  const $ = await scrape(url)
  const rows = $(
    'section#page_charts_section_charts .page_section_charts_item_wrapper'
  )

  const TOP_SELECTOR = {
    rank: { selector: '.page_charts_section_charts_item_number', type: 'number' },
    title: { selector: '.page_charts_section_charts_item_title', type: 'text' },
    artist: { selector: '.page_charts_section_charts_item_credited_links_primary', type: 'text' },
    releaseDate: { selector: '.page_charts_section_charts_item_date span', type: 'date' },
    rating: { selector: 'span.page_charts_section_charts_item_details_average_num', type: 'number' },
    genre: { selector: '.page_charts_section_charts_item_genres_primary a', type: 'text' },
    link: { selector: 'a.page_charts_section_charts_item_link.release', type: 'link' }
  }

  const data = []

  rows.each((i, el) => {
    const entries = Object.entries(TOP_SELECTOR).map(([key, { selector, type }]) => {
      if (key === 'rank') {
        return [key, i + 1]
      }

      if (key === 'link') {
        const link = `https://rateyourmusic.com${$(el).find(selector).eq(0).attr('href')}`
        return [key, link]
      }

      const rawValue = $(el).find(selector).eq(0).text()
      const cleanValue = clean(rawValue)
      const value = type === 'number' ? Number(cleanValue) : cleanValue ? type === 'date' ? new Date(cleanValue).toLocaleDateString() : cleanValue : null

      return [key, value]
    })

    data.push(Object.fromEntries(entries))
  })

  return data
}

for (const [year, url] of Object.entries(URLS)) {
  getTop(url).then(data => addToDB(year, data))
}
