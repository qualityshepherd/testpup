import { e2e as test } from '../../testpup.js'
test('e2e: count matching elements on a page', async t => {
  await t.goto('https://example.com')
  const count = await t.count('p')
  t.ok(count > 0)
})
