import { before, after, test, launchBrowser } from '../../testpup.js'
import { loginPage, securePage } from './pages/internet.page.js'

let t

before(async () => {
  t = await launchBrowser()
  const login = loginPage(t)
  await login.goto()
  await login.loginAs('admin')
  await t.waitFor('h2')
})

after(() => t.browser.close())

test('e2e: secure area displays correct heading after login', async () => {
  t.ok(await t.exists('h2'))
  t.contains(await securePage(t).heading(), 'Secure Area')
})
