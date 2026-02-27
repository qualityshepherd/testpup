import { e2e as test } from '../../testpup.js'

test('e2e: login with invalid credentials shows error message', async t => {
  await t.goto('https://the-internet.herokuapp.com/login')
  await t.type('#username', 'tomsmith')
  await t.type('#password', 'wrongpassword')
  await t.waitAndClick('button[type=submit]')
  await t.waitFor('#flash.error')
  t.ok(await t.exists('#flash.error'))
})
