import { e2e as test } from '../../testpup.js'
test('e2e: getText', async t => {
  await t.goto('https://example.com')
  t.is(await t.getText('h1'), 'Example Domain')
})
