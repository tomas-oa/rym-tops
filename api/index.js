import { Hono } from 'hono'
import top from '../db/top2022.json'

const app = new Hono()

app.get('/', (c) => {
  return c.json([
    {
      endpoint: '/2022',
      description: 'RYM Top 40 Albums from 2022'
    }
  ])
})

app.get('/2022', (c) => {
  return c.json(top)
})
