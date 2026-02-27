import { e2e as test } from '../../testpup.js'
test('e2e: main heading exists', async t => {
  await t.goto('https://example.com')
  t.ok(await t.exists('h1'))
  t.is(await t.getText('h1'), 'Example Domain')
})
