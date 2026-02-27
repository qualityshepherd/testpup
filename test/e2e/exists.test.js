import { e2e as test } from '../../testpup.js'
test('e2e: check if an element exists on the page', async t => {
  await t.goto('https://example.com')
  t.ok(await t.exists('h1'))
  t.falsy(await t.exists('#does-not-exist'))
})
