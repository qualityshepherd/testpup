import { e2e as test } from '../../testpup.js'
import { loginPage } from './pages/internet.page.js'

test('e2e: login with valid credentials redirects to secure area', async t => {
  await loginPage(t).goto()
  await loginPage(t).login('tomsmith', 'SuperSecretPassword!')
  t.ok(await loginPage(t).isLoggedIn())
})
