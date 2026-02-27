import { e2e as test } from '../../testpup.js'
test('e2e: wait for an element then click it and navigate', async t => {
  await t.goto('https://example.com')
  const nav = t.waitForNav()
  await t.waitAndClick('a')
  await nav
  t.contains(await t.url(), 'iana.org')
})
