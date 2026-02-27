import { e2e as test } from '../../testpup.js'
test('link goes to iana.org', async t => {
  await t.goto('https://example.com')
  const nav = t.waitForNav()
  await t.waitAndClick('a')
  await nav
  t.contains(await t.url(), 'iana.org')
})
