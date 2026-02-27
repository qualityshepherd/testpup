import { e2e as test } from '../../testpup.js'
test('e2e: check if an element has a css class', async t => {
  await t.goto('https://example.com')
  t.falsy(await t.hasClass('h1', 'does-not-exist'))
})
