import { e2e as test } from '../../testpup.js'
test('e2e: exists', async t => {
  await t.goto('https://example.com')
  t.ok(await t.exists('h1'))
})
