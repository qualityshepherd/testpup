import { e2e as test } from '../../testpup.js'
test('e2e: hasClass', async t => {
  await t.goto('https://example.com')
  t.falsy(await t.hasClass('body', 'foo'))
})
