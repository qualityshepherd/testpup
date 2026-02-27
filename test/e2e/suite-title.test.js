import { before, after, unit, launchBrowser } from '../../testpup.js'
import { loginPage } from './pages/internet.page.js'

let t

before(async () => {
  t = await launchBrowser()
  await loginPage(t).goto()
  await loginPage(t).login('tomsmith', 'SuperSecretPassword!')
  await t.waitFor('h2')
})

after(() => t.browser.close())

unit('e2e: secure area displays correct page title after login', async () => {
  t.is(await t.eval(() => document.title), 'The Internet')
})
