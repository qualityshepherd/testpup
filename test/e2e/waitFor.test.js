import { e2e as test } from '../../testpup.js'
test('e2e: wait for an element to appear on the page', async t => {
  await t.goto('https://example.com')
  await t.waitFor('h1')
  t.pass()
})
