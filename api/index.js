import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import top2022 from '../db/top2022.json'
import top2023 from '../db/top2023.json'

const app = new Hono()

app.get('/', (c) => {
  return c.json([
    {
      endpoint: '/2022',
      description: 'RYM Top 40 Albums from 2022'
    },
    {
      endpoint: '/2023',
      description: 'RYM Top 40 Albums from 2023'
    }
  ])
})

app.get('/2022', (c) => {
  return c.json(top2022)
})

app.get('/2023', (c) => {
  return c.json(top2023)
})

app.get('/static/*', serveStatic({ root: './' }))

export default app
