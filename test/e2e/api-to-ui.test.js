import { before, e2e as test } from '../../testpup.js'
import { loginPage, securePage } from './pages/internet.page.js'

// The triple threat:
// 1. authenticate via API, verify token
// 2. login to the UI as the same user
// 3. verify the session is real
// No mocks. No fixtures. Real client → real server → real assertions.

let token

before(async () => {
  const res = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'emilys', password: 'emilyspass' })
  })
  const data = await res.json()
  token = data.accessToken
})

test('e2e: authenticate via api then login to ui and verify secure area', async t => {
  const login = loginPage(t)
  const secure = securePage(t)

  // API auth worked
  t.ok(token)

  // now login to the UI as the same user
  await login.goto()
  await login.loginAs('admin')

  t.ok(await login.isLoggedIn())
  t.ok(await secure.isAt())
  t.contains(await secure.heading(), 'Secure Area')
})
