import { e2e as test } from '../../testpup.js'
test('e2e: eval', async t => {
  await t.goto('https://example.com')
  t.is(await t.eval(() => document.title), 'Example Domain')
})
