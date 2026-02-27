import { e2e as test } from '../../testpup.js'
test('main heading exists', async t => {
  await t.goto('https://example.com')
  t.ok(await t.exists('h1'))
  t.is(await t.getText('h1'), 'Example Domain')
})
