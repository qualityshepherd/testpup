import { before, after, test, launchBrowser } from '../../testpup.js'
import { loginPage } from './pages/internet.page.js'

let t

before(async () => {
  t = await launchBrowser()
  const login = loginPage(t)
  await login.goto()
  await login.loginAs('admin')
  await t.waitFor('h2')
})

after(() => t.browser.close())

test('e2e: secure area displays correct page title after login', async () => {
  t.is(await t.eval(() => document.title), 'The Internet')
})
