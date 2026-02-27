import { before, e2e as test } from '../../testpup.js'
import { loginPage, securePage } from './pages/internet.page.js'

// The triple threat:
// 1. fetch user data from API
// 2. login to the UI
// 3. verify the session is real
// No mocks. No fixtures. Real client → real server → real assertions.

let user

before(async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users/1')
  user = await res.json()
})

test('e2e: get user from api then login and verify secure area loads', async t => {
  t.ok(user.name)

  await loginPage(t).goto()
  await loginPage(t).login('tomsmith', 'SuperSecretPassword!')

  t.ok(await loginPage(t).isLoggedIn())
  t.ok(await securePage(t).isAt())
  t.contains(await securePage(t).heading(), 'Secure Area')
})
