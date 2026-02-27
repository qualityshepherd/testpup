import { e2e as test } from '../../testpup.js'
import { loginPage } from './pages/internet.page.js'

test('e2e: login with invalid credentials shows error message', async t => {
  await loginPage(t).goto()
  await loginPage(t).login('tomsmith', 'wrongpassword')
  t.ok(await t.exists('#flash.error'))
})
