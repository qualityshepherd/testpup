import { before, after, unit, launchBrowser } from '../../testpup.js'

let t

before(async () => {
  t = await launchBrowser()
  // shared setup — login, seed data, whatever
  await t.goto('https://example.com')
})

unit('page title is correct', async () => {
  t.is(await t.eval(() => document.title), 'Example Domain')
})

unit('main heading exists', async () => {
  t.ok(await t.exists('h1'))
  t.is(await t.getText('h1'), 'Example Domain')
})

unit('link goes to iana.org', async () => {
  const nav = t.waitForNav()
  await t.waitAndClick('a')
  await nav
  t.contains(await t.url(), 'iana.org')
})

after(() => t.browser.close())
