import { e2e as test } from '../../testpup.js'
test('e2e: count', async t => {
  await t.goto('https://example.com')
  t.is(await t.count('p'), 2)
})
