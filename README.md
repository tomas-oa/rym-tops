# RYM New releases
**This project was created with didactic purposes only** by scraping [rate your music](https://rateyourmusic.com/) 2023 and 2022 top releases tab and new releases


## API
https://rym-tops.tomas-oa.workers.dev

Fed by the new releases tab of RYM and updated every Tuesday all the other endpoints are not updated since I don't think it's necessary

## Endpoints
GET: ```/new_releases``` Returns top 40 albums rated by rym

GET: ```/2022``` Returns top 40 albums rated by rym community 

GET: ```/2023``` Returns top 40 albums rated by rym

## Stack used
- [Node](https://nodejs.org/en/) as runtime enviroment for JavaScript
- [Hono](https://honojs.dev/) as framework for cloudflare workers
- [Cheerio](https://cheerio.js.org/) for web scraping
- [vitest](https://vitest.dev/) for unit testing
- [pnpm](https://pnpm.io/) as node package manager
