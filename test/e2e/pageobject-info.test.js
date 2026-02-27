import { e2e as test } from '../../testpup.js'
import { loginPage } from './pages/internet.page.js'

test('e2e: login with valid credentials redirects to secure area', async t => {
  const login = loginPage(t)
  await login.goto()
  await login.loginAs('admin')
  t.ok(await login.isLoggedIn())
})
