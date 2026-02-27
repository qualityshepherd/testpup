import { before, after, unit, launchBrowser } from '../../testpup.js'
import { loginPage, securePage } from './pages/internet.page.js'

let t

before(async () => {
  t = await launchBrowser()
  await loginPage(t).goto()
  await loginPage(t).login('tomsmith', 'SuperSecretPassword!')
  await t.waitFor('h2')
})

after(() => t.browser.close())

unit('e2e: secure area url is correct after login', async () => {
  t.contains(await t.url(), '/secure')
})

unit('e2e: secure area heading is correct after login', async () => {
  t.contains(await securePage(t).heading(), 'Secure Area')
})
